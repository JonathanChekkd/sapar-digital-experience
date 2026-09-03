# Proposed Production Architecture

Status: implementation-ready target design; **not shipped**
Current prototype evidence: [CURRENT_STATE_AND_PROVENANCE.md](./CURRENT_STATE_AND_PROVENANCE.md)

## 1. Decision boundary

This document proposes a production architecture for the product concepts demonstrated by the SAPAR frontend. The working tree includes two read-only `GET /api/prototype/*` route handlers that serve typed synthetic fixtures for local UI/API-contract testing. Those local handlers are not the production API proposed below and do not claim that a production service, identity system, database, worker, rating engine, media pipeline, or analytics platform exists.

The current repository is an interactive synthetic-data prototype with session-scoped reducer interactions, same-browser preference storage, and no production database, authentication, payment, external service, or real booking. Production implementation should begin only after product ownership, data rights, safeguarding, rules authority, privacy, legal, and brand approvals are named.

### Working assumptions

These assumptions make the proposal concrete without pretending unknowns are settled:

- The first production release serves adults only, matching the current product scope.
- The primary clients are the existing TypeScript web app and a possible future mobile client.
- Gyms and event organizers are tenants; athletes can participate across tenants.
- Human officials remain authoritative for competition results.
- Gi and No-Gi ratings are separate lanes.
- Payments, autonomous judging, and biometric/health inference are out of the first production release.
- Initial scale, regions, recovery objectives, legal jurisdictions, and staffing are unconfirmed and must be measured before infrastructure is purchased.

## 2. Architecture decisions

### 2.1 Start with a modular monolith

**Proposed production.** Use one TypeScript API application with explicit domain modules, one transactional Postgres database, and a separate worker process that imports the same domain/application packages.

Why:

- the production domain is not yet validated;
- atomic result, rating, booking, and audit changes benefit from one transaction boundary;
- a small team can operate one deployable API more safely than premature microservices;
- module boundaries allow later extraction when measured scale or ownership demands it.

Revisit service extraction only when a module has independent scaling, failure-isolation, compliance, or team-ownership requirements that outweigh distributed-system cost.

### 2.2 REST plus OpenAPI for the first public contract

**Proposed production.** Expose `/api/v1` resource-oriented REST endpoints, publish OpenAPI, and generate the web client's transport types from the contract. Keep domain types separate from wire and database models.

Why:

- it supports web, future mobile, partners, caches, and standard tooling;
- versioned URLs make compatibility visible;
- resource semantics fit the current domain;
- GraphQL or tRPC can be added later if measured client-query complexity justifies it.

### 2.3 Postgres is the transactional source of truth

**Proposed production.** Use managed PostgreSQL for identity references, tenant membership, schedules, bookings, competitions, versioned results, rating events, milestones, consent records, idempotency, and audit metadata.

Why:

- the domain is relational and constraint-heavy;
- authoritative records require transactions and immutable history;
- tenant, event, athlete, bout, and rating relationships benefit from foreign keys;
- a managed service can provide backups, point-in-time recovery, encryption, and observability.

The exact provider and ORM are deliberately unselected. Choose them after deployment, region, connection, team, and compliance constraints are confirmed.

### 2.4 Object storage is the media source of truth

**Proposed production.** Store media bytes in private S3-compatible object storage. Postgres stores metadata, ownership, consent, checksum, processing state, and retention policy. Serve public derivatives through a CDN; serve private media through short-lived signed URLs after authorization.

### 2.5 Asynchronous work uses an outbox and bounded workers

**Proposed production.** Write a domain change and an `outbox_events` row in one Postgres transaction. A dispatcher publishes to a managed queue. Workers process notifications, media derivatives, analytics projection, search indexing, and rating recomputation with idempotent handlers and bounded retries.

Do not make a queue authoritative. Postgres remains the source of truth; the outbox supports replay and reconciliation.

## 3. Target system shape

```text
Browser / future mobile
        |
        v
CDN + WAF + rate limits
        |
        +--> static Next.js assets and public media derivatives
        |
        v
Next.js web application
        |
        v
TypeScript REST API (/api/v1) -----> managed identity provider
        |
        +-----> PostgreSQL (authoritative records + outbox + audit)
        +-----> Redis-compatible cache (derived, disposable)
        +-----> private object storage (media bytes)
        +-----> queue <---- outbox dispatcher
                            |
                            v
                     bounded workers
                     - media derivatives
                     - notifications
                     - rating projections
                     - search/analytics projections
```

### Trust boundaries

- The browser never receives database credentials and never writes directly to authoritative tables.
- The API validates every input and re-authorizes every object access.
- Tenant role and resource relationship are evaluated together; a role name alone never grants global access.
- Workers use least-privilege service identities and cannot bypass consent or retention rules.
- Object storage is private by default.
- Cache and analytics stores contain no authority; they can be dropped and rebuilt.
- Rating explanations read versioned inputs and model/rules metadata rather than recomputing from mutable UI state.

## 4. Domain modules

| Module | Responsibilities | Must not own |
| --- | --- | --- |
| Identity | Account reference, login-session integration, account status, recovery hooks | Provider secrets in browser code |
| Organizations | Gyms/event organizations, memberships, scoped roles, invitations | Athlete-private data unrelated to the organization |
| Athletes | Public profile, private preferences, affiliations, consent references | Official-result authority |
| Gyms and sessions | Gym profile, schedule, capacity, booking policy, check-in | Competition-result confirmation |
| Competitions | Events, divisions, registrations, eligibility status, officials | Rating calculation internals |
| Bouts and results | Bout participants, event ledger, result submission, confirmation, dispute, correction, versions | Destructive overwrite of confirmed history |
| Ratings | Lane definition, eligibility rules, model version, input result versions, events, snapshots, explanation | Belt rank, XP, payment status, or social status |
| Journey | Deterministic XP events, levels, milestone definitions and awards | Competitive rating or belt inference |
| Community | Follows, posts, reactions, saves, moderation state | Official results or private media authorization |
| Media and consent | Upload sessions, objects, derivatives, access class, subject consent, retention | Competition authority or autonomous scoring |
| Notifications | Preferences, templates, delivery attempts, provider receipts | Product truth; notifications reflect committed state |
| Governance | Audit trail, moderation, feature flags, data export/deletion workflow | Mutable business records disguised as logs |

## 5. Roles and permission model

### Roles

| Role | Representative permissions |
| --- | --- |
| Anonymous | Read explicitly public gyms, public events, public profiles, and public confirmed results |
| Athlete | Manage own profile/preferences, request bookings/registrations, manage own media, view own private XP and account data |
| Coach or gym staff | Manage assigned gym sessions and scoped participant operations granted by gym policy |
| Gym admin | Manage gym profile, staff memberships, schedules, and gym-level reporting |
| Event official | Submit or confirm results only for assigned bouts and within event policy |
| Event admin | Manage event configuration, divisions, officials, registrations, and dispute workflow |
| Moderator/support | Review reported content and assist accounts through audited, purpose-limited tools |
| Platform admin | Restricted operational control; require strong authentication, just-in-time elevation, reason capture, and immutable audit |

### Authorization rules

- Use deny-by-default policy checks in the application layer and database row policies where the selected platform supports them.
- Scope tenant operations by `organization_id` plus active membership, role, and permission.
- Scope athlete-private operations by `account_id` or explicit delegated authority.
- Assign officials to events/bouts; an `event_official` role without an assignment cannot confirm a result.
- Require step-up authentication for role changes, exports, destructive operations, consent overrides, and confirmed-result corrections.
- Do not expose private XP, exact location, internal moderation state, email, consent evidence, or security metadata in public serializers.
- Use separate public, self, staff, and admin response schemas; never “hide” fields only in the client.

## 6. Authoritative workflows

### Result lifecycle

```text
draft -> submitted -> confirmed
                  \-> disputed -> corrected -> confirmed
                  \-> rejected
```

- Only assigned officials or event policy can move a submitted result to confirmed.
- A confirmed result is not overwritten. A correction appends a new `result_versions` row, points `results.current_version_id` at it, and retains the prior version.
- Every transition records actor, reason, request ID, timestamp, and source.
- Ratings consume only eligible confirmed result versions.
- A dispute blocks or reverses downstream eligibility through an explicit compensating rating event; it does not delete history.

### Rating lifecycle

1. A confirmed eligible result version emits `result.confirmed.v1` through the outbox.
2. The rating worker obtains a per-athlete/per-lane lock or serializable transaction.
3. It checks whether an event already exists for `(result_version_id, athlete_id, lane_id, model_version)`.
4. It appends the rating event with before/after values, input summary, model/rules version, and explanation payload.
5. It updates the current snapshot in the same transaction.
6. A public projection exposes only approved fields and labels provisional state explicitly.

The first production model must be separately specified, tested, calibrated, reviewed, and approved. This architecture does not endorse the prototype's numbers or formula.

### Booking and registration lifecycle

- Bookings: `requested -> confirmed | waitlisted | cancelled | attended | no_show`.
- Registrations: `draft -> submitted -> eligible | in_review | rejected -> withdrawn`.
- Capacity changes use a transaction and row/version check to prevent overbooking.
- Payment states remain absent until a separate payment architecture and authorization are approved.

## 7. Typed fixture-to-API boundary

The first refactor should separate the UI from inline fixtures before a live API is introduced.

### Proposed package shape

```text
src/
  contracts/
    common.ts
    athletes.ts
    gyms.ts
    competitions.ts
    ratings.ts
  services/
    athlete-service.ts
    gym-service.ts
    competition-service.ts
    rating-service.ts
  adapters/
    fixture/
    http/
  fixtures/
    synthetic/
```

### Rules

- TypeScript strict mode; no `any`.
- Define request/response schemas at system boundaries and derive types from runtime validation.
- UI components call service interfaces, never import fixture arrays or database models.
- `Fixture*Service` and `Http*Service` implement the same interface.
- Every fixture record carries `dataOrigin: "synthetic"` and a `demo_` identifier namespace.
- Production builds fail closed if fixture mode is enabled, unless an explicitly approved demo deployment retains the persistent synthetic-data banner.
- Loading, empty, unauthorized, not-found, validation, conflict, rate-limit, and server-error states are first-class UI states.
- Test contract parity: fixture adapters and HTTP adapters must pass the same service contract suite.
- Never seed synthetic identities into a production tenant or analytics stream.

Example boundary:

```ts
export interface AthleteService {
  getAthlete(id: AthleteId, signal?: AbortSignal): Promise<AthleteView>;
  followAthlete(id: AthleteId, input: FollowAthleteInput): Promise<FollowState>;
}

export type DataOrigin = "synthetic" | "production";

export interface AthleteView {
  readonly id: AthleteId;
  readonly dataOrigin: DataOrigin;
  readonly displayName: string;
  readonly publicAffiliations: readonly PublicAffiliation[];
}
```

## 8. API contract

### Conventions

- Base path: `/api/v1`.
- Content type: `application/json`; errors use `application/problem+json`.
- Resource identifiers: opaque UUIDs or ULIDs; clients do not infer meaning from IDs.
- Dates: RFC 3339 UTC strings.
- Money, if later introduced: integer minor units plus ISO currency; never floating point.
- Mutations require runtime validation and boundary normalization.
- OpenAPI is checked in and reviewed; generated clients are derived artifacts.

### Representative endpoints

| Method and path | Purpose | Access |
| --- | --- | --- |
| `GET /api/v1/athletes/{athleteId}` | Public athlete projection | Anonymous for public profiles |
| `GET /api/v1/athletes/{athleteId}/ratings?lane=no-gi` | Versioned public rating projection and explanation | Anonymous when profile/rating is public |
| `PUT /api/v1/athletes/me/profile` | Replace validated self-profile fields | Athlete self |
| `PUT /api/v1/athletes/{athleteId}/follow` | Idempotently follow | Authenticated athlete |
| `DELETE /api/v1/athletes/{athleteId}/follow` | Idempotently unfollow | Authenticated athlete |
| `GET /api/v1/gyms` | Search public gyms with cursor pagination | Anonymous |
| `GET /api/v1/gyms/{gymId}/sessions` | Read public session availability | Anonymous |
| `POST /api/v1/sessions/{sessionId}/bookings` | Request a booking | Athlete; idempotency key required |
| `DELETE /api/v1/bookings/{bookingId}` | Cancel under policy | Booking owner or scoped staff |
| `GET /api/v1/competitions` | Read public events | Anonymous |
| `POST /api/v1/divisions/{divisionId}/registrations` | Submit registration | Athlete; idempotency key required |
| `POST /api/v1/bouts/{boutId}/results` | Submit a draft result version | Assigned official |
| `POST /api/v1/results/{resultId}/confirmations` | Confirm submitted result | Assigned authority; idempotency key required |
| `POST /api/v1/results/{resultId}/disputes` | Open a governed dispute | Eligible participant/authority |
| `POST /api/v1/results/{resultId}/corrections` | Append corrected version | Authorized event role with step-up auth |
| `POST /api/v1/media/upload-sessions` | Create constrained direct-upload session | Authenticated owner with consent context |
| `GET /api/v1/me/notifications` | Read private notification projection | Account self |
| `GET /api/v1/me/data-export` | Read export job state | Account self with step-up auth |

### Success envelope

Single resources:

```json
{
  "data": {
    "id": "01J...",
    "type": "athlete",
    "attributes": {}
  },
  "meta": {
    "requestId": "req_...",
    "apiVersion": "v1"
  }
}
```

Collections add a cursor:

```json
{
  "data": [],
  "meta": {
    "requestId": "req_...",
    "apiVersion": "v1",
    "page": {
      "nextCursor": null,
      "hasMore": false,
      "limit": 25
    }
  }
}
```

### Errors

Use a stable application code in an RFC-style problem document:

```json
{
  "type": "https://api.saparsport.com/problems/result-state-conflict",
  "title": "Result state conflict",
  "status": 409,
  "code": "RESULT_STATE_CONFLICT",
  "detail": "The result is already confirmed.",
  "instance": "/api/v1/results/01J.../confirmations",
  "requestId": "req_...",
  "fieldErrors": []
}
```

Required mappings:

- `400` malformed syntax;
- `401` missing or invalid authentication;
- `403` authenticated but not authorized;
- `404` absent or deliberately concealed resource;
- `409` state, uniqueness, idempotency, or version conflict;
- `412` failed `If-Match` or another explicit precondition;
- `422` field or domain validation failure;
- `429` rate limit;
- `500` unexpected server error with no internal detail.

### Idempotency

- Require `Idempotency-Key` for creation and authority-changing POST requests.
- Store `(subject_id, method, canonical_path, key)` with request hash, response status/body hash, resource ID, and expiry.
- Reusing a key with the same request replays the original response.
- Reusing a key with a different request returns `409 IDEMPOTENCY_KEY_REUSED`.
- Worker handlers use natural idempotency keys such as `(event_id, handler_version)` and record successful completion.
- Do not rely on client retries being rare; assume at-least-once delivery.

### Optimistic concurrency

- Mutable resources expose an ETag derived from a monotonic `version`.
- `PUT`, `PATCH`, correction, and policy-sensitive state transitions require `If-Match`.
- Stale `If-Match` writes return `412 RESOURCE_VERSION_CONFLICT` with the current version, subject to authorization.
- Confirmed result history remains append-only even when the current pointer changes.

### Pagination and filtering

- Use opaque cursor pagination for athletes, gyms, sessions, events, posts, audit entries, and notifications.
- Default limit 25; maximum 100.
- Stable sort uses domain time plus ID, for example `(starts_at, id)` or `(created_at, id)`.
- Cursors encode the filter/sort version and are signed to prevent tampering.
- Reject unknown filters rather than silently ignoring them.

### Versioning and deprecation

- Breaking HTTP changes create a new URI version.
- Additive fields remain optional until all supported clients adopt them.
- Include deprecation and sunset headers for retired operations.
- Event names include a schema version, for example `result.confirmed.v1`.
- Rating events record model and eligibility-rules versions independently from API version.

### Rate limits

- Apply stricter limits to login/recovery, search, uploads, messaging, exports, and authority-changing operations.
- Key limits by IP before authentication and by account/tenant after authentication.
- Return `429`, `Retry-After`, limit, remaining, and reset metadata.
- Use token bucket for ordinary APIs and sliding-window controls for sensitive auth and abuse surfaces.

## 9. Postgres-style schema proposal

This is a logical starting point, not an applied migration. Use `uuid` IDs, `timestamptz`, foreign keys, checks, and explicit uniqueness. Prefer normalized authority tables; use JSONB only for versioned explanation payloads or provider metadata that does not deserve first-class columns.

### Identity and tenancy

```sql
create table accounts (
  id uuid primary key,
  identity_provider_subject text not null unique,
  status text not null check (status in ('active','suspended','deletion_pending','deleted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table organizations (
  id uuid primary key,
  kind text not null check (kind in ('gym','event_organizer')),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table organization_memberships (
  organization_id uuid not null references organizations(id) on delete cascade,
  account_id uuid not null references accounts(id) on delete cascade,
  role text not null,
  status text not null check (status in ('invited','active','suspended','revoked')),
  permissions text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (organization_id, account_id)
);

create table athlete_profiles (
  id uuid primary key,
  account_id uuid not null unique references accounts(id) on delete restrict,
  display_name text not null,
  public_slug text not null unique,
  profile_visibility text not null check (profile_visibility in ('public','members','private')),
  region_code text,
  belt_label text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
```

### Gyms, sessions, and bookings

```sql
create table gyms (
  id uuid primary key,
  organization_id uuid not null unique references organizations(id) on delete restrict,
  public_name text not null,
  timezone text not null,
  public_region text not null,
  status text not null check (status in ('draft','published','suspended','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table gym_sessions (
  id uuid primary key,
  gym_id uuid not null references gyms(id) on delete restrict,
  title text not null,
  discipline text not null check (discipline in ('gi','no-gi','mixed')),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  capacity integer check (capacity is null or capacity >= 0),
  booking_policy_version text not null,
  status text not null check (status in ('draft','published','cancelled','completed')),
  version bigint not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table bookings (
  id uuid primary key,
  session_id uuid not null references gym_sessions(id) on delete restrict,
  athlete_id uuid not null references athlete_profiles(id) on delete restrict,
  status text not null check (status in ('requested','confirmed','waitlisted','cancelled','attended','no_show')),
  version bigint not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, athlete_id)
);
```

### Competitions, bouts, and authoritative results

```sql
create table competitions (
  id uuid primary key,
  organization_id uuid not null references organizations(id) on delete restrict,
  name text not null,
  timezone text not null,
  starts_at timestamptz not null,
  status text not null check (status in ('draft','published','registration_open','in_progress','completed','cancelled')),
  ruleset_version text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table divisions (
  id uuid primary key,
  competition_id uuid not null references competitions(id) on delete cascade,
  name text not null,
  discipline text not null check (discipline in ('gi','no-gi')),
  eligibility_policy_version text not null,
  capacity integer check (capacity is null or capacity >= 0),
  created_at timestamptz not null default now()
);

create table registrations (
  id uuid primary key,
  division_id uuid not null references divisions(id) on delete restrict,
  athlete_id uuid not null references athlete_profiles(id) on delete restrict,
  status text not null check (status in ('draft','submitted','in_review','eligible','rejected','withdrawn')),
  eligibility_reason_code text,
  version bigint not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (division_id, athlete_id)
);

create table bouts (
  id uuid primary key,
  division_id uuid not null references divisions(id) on delete restrict,
  scheduled_at timestamptz,
  mat_label text,
  round_label text,
  status text not null check (status in ('scheduled','called','in_progress','awaiting_result','final','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table event_official_assignments (
  id uuid primary key,
  competition_id uuid not null references competitions(id) on delete restrict,
  bout_id uuid references bouts(id) on delete restrict,
  account_id uuid not null references accounts(id) on delete restrict,
  authority_role text not null check (authority_role in ('referee','result_reviewer','event_director')),
  status text not null check (status in ('active','revoked','expired')),
  starts_at timestamptz not null,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  unique (competition_id, bout_id, account_id, authority_role)
);

create table bout_participants (
  bout_id uuid not null references bouts(id) on delete cascade,
  athlete_id uuid not null references athlete_profiles(id) on delete restrict,
  corner text not null check (corner in ('a','b')),
  primary key (bout_id, athlete_id),
  unique (bout_id, corner)
);

create table results (
  id uuid primary key,
  bout_id uuid not null unique references bouts(id) on delete restrict,
  status text not null check (status in ('draft','submitted','confirmed','disputed','corrected','rejected')),
  current_version_id uuid,
  version bigint not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table result_versions (
  id uuid primary key,
  result_id uuid not null references results(id) on delete restrict,
  version_number integer not null,
  winner_athlete_id uuid references athlete_profiles(id) on delete restrict,
  method_code text not null,
  score_a integer,
  score_b integer,
  authority_account_id uuid not null references accounts(id) on delete restrict,
  authority_assignment_id uuid not null references event_official_assignments(id) on delete restrict,
  reason text not null,
  source text not null,
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (result_id, version_number)
);

alter table results
  add constraint results_current_version_fk
  foreign key (current_version_id) references result_versions(id) on delete restrict;
```

### Ratings and deterministic journey state

```sql
create table rating_lanes (
  id uuid primary key,
  code text not null unique,
  discipline text not null check (discipline in ('gi','no-gi')),
  model_version text not null,
  eligibility_rules_version text not null,
  status text not null check (status in ('draft','pilot','active','retired')),
  created_at timestamptz not null default now()
);

create table rating_events (
  id uuid primary key,
  athlete_id uuid not null references athlete_profiles(id) on delete restrict,
  lane_id uuid not null references rating_lanes(id) on delete restrict,
  result_version_id uuid not null references result_versions(id) on delete restrict,
  model_version text not null,
  value_before integer not null,
  value_after integer not null,
  confidence_lower integer,
  confidence_upper integer,
  explanation jsonb not null,
  created_at timestamptz not null default now(),
  unique (athlete_id, lane_id, result_version_id, model_version)
);

create table rating_snapshots (
  athlete_id uuid not null references athlete_profiles(id) on delete restrict,
  lane_id uuid not null references rating_lanes(id) on delete restrict,
  current_value integer not null,
  eligible_result_count integer not null default 0,
  provisional boolean not null,
  latest_event_id uuid references rating_events(id) on delete restrict,
  updated_at timestamptz not null default now(),
  primary key (athlete_id, lane_id)
);

create table journey_events (
  id uuid primary key,
  athlete_id uuid not null references athlete_profiles(id) on delete restrict,
  event_type text not null,
  source_type text not null,
  source_id uuid not null,
  rule_version text not null,
  xp_delta integer not null,
  created_at timestamptz not null default now(),
  unique (athlete_id, event_type, source_type, source_id, rule_version)
);

create table milestone_awards (
  id uuid primary key,
  athlete_id uuid not null references athlete_profiles(id) on delete restrict,
  milestone_code text not null,
  rule_version text not null,
  evidence_type text not null,
  evidence_id uuid not null,
  awarded_at timestamptz not null default now(),
  unique (athlete_id, milestone_code, rule_version)
);
```

### Media, consent, reliability, and audit

```sql
create table media_objects (
  id uuid primary key,
  owner_account_id uuid not null references accounts(id) on delete restrict,
  storage_key text not null unique,
  checksum_sha256 text not null,
  content_type text not null,
  byte_size bigint not null check (byte_size >= 0),
  access_class text not null check (access_class in ('private','tenant','public')),
  processing_status text not null check (processing_status in ('pending','clean','rejected','failed')),
  retention_policy text not null,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table media_consents (
  id uuid primary key,
  media_id uuid not null references media_objects(id) on delete restrict,
  subject_account_id uuid not null references accounts(id) on delete restrict,
  purpose text not null,
  policy_version text not null,
  status text not null check (status in ('granted','withdrawn','expired')),
  granted_at timestamptz not null,
  withdrawn_at timestamptz,
  unique (media_id, subject_account_id, purpose, policy_version)
);

create table idempotency_keys (
  subject_id uuid not null,
  method text not null,
  canonical_path text not null,
  key text not null,
  request_hash text not null,
  response_status integer,
  response_body jsonb,
  resource_id uuid,
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  primary key (subject_id, method, canonical_path, key)
);

create table outbox_events (
  id uuid primary key,
  aggregate_type text not null,
  aggregate_id uuid not null,
  event_type text not null,
  event_version integer not null,
  payload jsonb not null,
  occurred_at timestamptz not null,
  published_at timestamptz,
  attempt_count integer not null default 0,
  next_attempt_at timestamptz not null default now()
);

create table audit_log (
  id uuid primary key,
  actor_account_id uuid references accounts(id) on delete restrict,
  actor_type text not null,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  organization_id uuid references organizations(id) on delete restrict,
  request_id text not null,
  reason text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);
```

### Initial indexes

- `organization_memberships (account_id, status)` and `(organization_id, role, status)`.
- `gym_sessions (gym_id, status, starts_at, id)`.
- `bookings (athlete_id, status, created_at desc, id)`.
- `competitions (status, starts_at, id)`.
- `registrations (athlete_id, status, created_at desc, id)`.
- `bouts (division_id, status, scheduled_at, id)`.
- `result_versions (result_id, version_number desc)`.
- `rating_events (athlete_id, lane_id, created_at desc, id)`.
- `journey_events (athlete_id, created_at desc, id)`.
- partial `outbox_events (next_attempt_at, id) where published_at is null`.
- `audit_log (organization_id, created_at desc, id)` and `(resource_type, resource_id, created_at desc)`.
- `media_objects (owner_account_id, created_at desc, id) where deleted_at is null`.

Add indexes from measured query plans, not speculation. Use `CREATE INDEX CONCURRENTLY` in production and test migrations against production-shaped copies.

## 10. Cache, queue, storage, and CDN

### Cache

- Cache public gym, event, and rating projections with short TTLs and versioned keys.
- Invalidate on committed projection changes; tolerate expiry as the correctness fallback.
- Do not cache authorization decisions across role/membership changes without a version key.
- Do not store tokens, private XP, exact location, consent evidence, or raw media in shared public caches.
- Use request coalescing and negative-cache only safe public misses.

### Queue and workers

- At-least-once delivery; every handler idempotent.
- Exponential backoff with jitter and bounded attempts.
- Dead-letter after the bound, alert, and expose replay tooling with reason capture.
- Per-job timeouts, payload size limits, schema versions, and trace context.
- Separate queues for latency-sensitive notifications and expensive media/rating projections only when measurements justify it.

### Object storage and CDN

- Upload with a short-lived, content-type/size/checksum-constrained signed request.
- Quarantine uploads until malware and content-policy checks complete.
- Strip unsafe metadata and create derivatives in workers.
- Use immutable, content-hashed public derivative keys.
- Keep originals private; authorize signed reads and record sensitive access where required.
- CDN caches only public, approved derivatives and static assets.

## 11. Observability and operations

### Required signals

- Structured logs with request ID, trace ID, service, route template, status, latency, tenant ID hash, and stable error code.
- Distributed traces across web, API, Postgres, queue publish, and worker handling.
- Metrics for request rate/error/latency, DB pool saturation, slow queries, queue age/depth, job retries/dead letters, cache hit rate, upload failures, notification delivery, and rating projection lag.
- Domain counters for result submissions/confirmations/disputes/corrections, booking conflicts, consent withdrawal backlog, and deletion/export SLA.

Never log tokens, passwords, raw authorization headers, private profile fields, precise location, media bytes, or full request bodies. Hash or omit identifiers in shared analytics.

### Service objectives to define before launch

- Availability and latency by public read, authenticated mutation, and authority-changing mutation.
- Maximum acceptable result-to-rating projection lag.
- Recovery point and recovery time objectives.
- Export/deletion completion targets.
- Alert ownership, escalation, and support runbooks.

### Health and reconciliation

- Liveness checks process health only.
- Readiness checks required dependencies with short timeouts.
- A separate authenticated diagnostic reports schema version, queue connectivity, and worker lag without exposing secrets.
- Scheduled reconciliation compares outbox, queue receipts, projections, object metadata, and database truth.

## 12. Security and privacy

### Baseline controls

- Managed identity with phishing-resistant MFA/passkeys where available.
- Secure, HTTP-only, same-site session cookies for the web client; rotate sessions after privilege changes.
- CSRF protection on cookie-authenticated mutations.
- Strict input schemas, output encoding, parameterized queries, safe file handling, and SSRF egress controls.
- Content Security Policy, HSTS, frame protections, secure referrer policy, and dependency scanning.
- Secrets in a managed secret store; no secrets in source, client bundles, logs, fixtures, or CI artifacts.
- WAF/rate limits plus application-level abuse controls.
- Least-privilege database roles and service identities.
- Encryption in transit and managed encryption at rest; field-level protection for especially sensitive approved fields.
- Independent authorization tests for every object and tenant boundary.

### Privacy by design

- Collect the minimum data needed for a named purpose.
- Separate public athlete fields from private account, XP, exact-location, consent, and moderation records.
- Use coarse public regions; do not publish precise training or home location by default.
- Keep minors, health inference, biometric identification, and autonomous scoring out of v1 unless separately designed and approved.
- Make media consent purpose-specific, versioned, revocable, and enforceable in read/derivative workflows.
- Support access, correction, export, restriction, and deletion workflows with audit and legal-hold exceptions.
- Analytics use pseudonymous identifiers and an allowlisted event schema; forbid free-form PII properties.

### Retention proposal

Final periods require legal and product approval. Start with policy classes rather than scattered TTLs:

| Data class | Proposed handling |
| --- | --- |
| Active account/profile | While active; begin deletion workflow on verified request, subject to legal obligations |
| Confirmed competition result history | Retain as governed sporting record under published policy; corrections append, not overwrite |
| Private media originals | Purpose-bound retention; delete or de-identify after consent withdrawal where obligations allow |
| Upload quarantine failures | Short TTL, for example 7 days, then hard delete |
| Session/security events | Bounded security window, for example 30–90 days, with access restricted |
| Operational logs/traces | Short hot retention, for example 14–30 days; redact and aggregate longer-term metrics |
| Audit log | Longer controlled retention, for example 1–7 years depending on authority and jurisdiction |
| Idempotency records | Endpoint-specific retry window, commonly 24 hours to 30 days |
| Analytics raw events | Short bounded retention; retain aggregated non-identifying metrics longer |
| Backups | Encrypted rolling retention with tested expiry and deletion propagation |

## 13. Feature flags and release safety

- Server-evaluated flags have owner, purpose, audience, creation date, expiry date, and rollback behavior.
- Default all unproven capabilities off.
- Separate release flags from permissions; a flag never grants authorization.
- Use tenant/account allowlists for pilots and record exposure in audit/telemetry.
- Never use a client-only flag to protect private data or authority-changing operations.
- Rating model versions and eligibility rules are governed configuration, not casual UI flags.

Recommended initial flags:

- `production_data_reads`;
- `booking_mutations`;
- `competition_registrations`;
- `official_result_workflow`;
- `rating_projection_public`;
- `community_writes`;
- `media_uploads`;
- `assistive_analysis_pilot`.

`autonomous_scoring` should not exist as an enabled production flag until a separately approved safety, fairness, accuracy, authority, and appeals program is complete.

## 14. Migration and rollback

### Database changes

- Expand/contract only: add nullable, deploy dual-read/write when needed, backfill in bounded batches, enforce constraints, then remove old fields in a later release.
- Add indexes concurrently.
- Test migrations against a sanitized production-shaped copy.
- Record forward and compensating plans; do not assume destructive DDL can be rolled back.
- Take and verify provider backup/PITR state before high-risk migration.

### Application releases

- Build immutable artifacts tied to a commit.
- Run contract, unit, integration, authorization, migration, accessibility, and end-to-end gates.
- Deploy to preview/staging with production-like identity and data classifications.
- Canary or progressively expose risky flags.
- Verify exact artifact, health, logs, traces, migrations, queue lag, and representative read/write paths.
- Roll back application code by artifact and disable flags first; use data compensation rather than destructive database rollback.

### Worker releases

- Version event schemas and handlers.
- Deploy backward-compatible consumers before producers.
- Pause or drain queues for incompatible maintenance only with a bounded runbook.
- Replays require scoped selection, dry-run counts, idempotency, rate caps, and audit.

## 15. Delivery sequence

### Phase 0: make the prototype honest and testable

- Move inline data behind typed fixture services.
- Mark every fixture with synthetic origin.
- Implement loading, empty, disabled, error, and success states.
- Add route/link, accessibility, responsive, and interaction tests.
- Complete per-asset rights and consent register.

### Phase 1: identity, tenancy, and read models

- Select identity and managed Postgres providers.
- Implement accounts, organizations, memberships, athlete public/private serializers, and audit.
- Deliver read-only public gyms, sessions, competitions, profiles, and confirmed-result projections.
- Prove tenant isolation and export/deletion foundations.

### Phase 2: low-risk participation writes

- Add bookings, follows, saves, and registrations with idempotency, concurrency, abuse limits, and notification outbox.
- Keep payments out until separately approved.

### Phase 3: governed result authority

- Implement official assignment, versioned results, confirmation, dispute, correction, and reconciliation.
- Exercise support and audit workflows before ratings consume results.

### Phase 4: transparent rating pilot

- Specify and validate model/rules outside the UI.
- Implement append-only rating events, snapshots, explanation contracts, rollback/compensation, monitoring, and pilot flags.
- Label provisional and pilot state in every surface.

### Phase 5: media and assistive research

- Introduce private storage, consent, quarantine, derivatives, retention, and subject-access controls.
- Treat assistive analysis as a bounded, opt-in pilot.
- Do not infer official results or belt rank from media.

## 16. Verification gates

Before calling any phase production-ready, require evidence for:

- strict typecheck, lint, dependency audit, unit, integration, contract, and end-to-end tests;
- object- and tenant-level authorization tests, including negative cases;
- idempotency and retry tests;
- concurrent booking/result/rating tests;
- migration forward/rollback rehearsal;
- backup restore and queue replay rehearsal;
- accessibility and reduced-motion checks;
- privacy data-flow and retention review;
- media consent and deletion propagation tests when media exists;
- bounded load test with documented assumptions;
- provider terminal state, exact artifact/commit, logs, health, and rollback evidence.

## 17. Open decisions

The following must be resolved by named owners before implementation locks in:

1. Initial regions, jurisdictions, residency, and legal basis for each data class.
2. Managed identity, Postgres, object-storage, queue, email, and observability providers.
3. Availability, latency, RPO, RTO, volume, and staffing targets.
4. Whether gym and event organizations share one tenant model or require stricter isolation.
5. Official authority, appeals, correction, and federation-integration policy.
6. Rating model, eligibility, calibration, publication, retirement, and governance.
7. Public/private profile defaults and precise-location rules.
8. Media purposes, consent wording, retention, and participant rights.
9. Asset ownership, testimonial consent, deck distribution, and brand approvals.
10. Whether payments, messaging, minors, or third-party integrations enter a later separately authorized scope.

Until those decisions are approved, this architecture is a concrete build plan—not a production claim or deployment authorization.
