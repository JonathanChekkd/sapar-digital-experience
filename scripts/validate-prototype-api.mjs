import assert from "node:assert/strict";

import {
  buildPrototypeApiErrorResponse,
  buildPrototypeCatalogResponse,
  buildPrototypeHealthResponse,
  PROTOTYPE_NO_STORE_HEADERS,
} from "../lib/sapar-prototype-api.ts";
import { saparPrototype } from "../lib/sapar-prototype.ts";

const fixedServerTime = new Date("2026-09-02T05:00:00.000Z");
const health = buildPrototypeHealthResponse(fixedServerTime);
const catalog = buildPrototypeCatalogResponse(saparPrototype);
const error = buildPrototypeApiErrorResponse();

assert.equal(health.status, "ok");
assert.equal(health.mode, "local-prototype");
assert.equal(health.dataSource, "typed-synthetic-fixtures");
assert.equal(health.database, "not-connected");
assert.equal(health.externalServices, "not-connected");
assert.equal(health.serverTime, fixedServerTime.toISOString());
assert.equal(health.capabilities.authentication, "not-connected");
assert.equal(health.capabilities.persistence, "not-connected");
assert.equal(health.capabilities.clientInteractions, "client-local-only");

assert.equal(catalog.fixture.fixtureId, saparPrototype.metadata.fixtureId);
assert.equal(catalog.fixture.isSynthetic, true);
assert.equal(catalog.counts.athletes, 1);
assert.equal(catalog.counts.ratingLanes, saparPrototype.ratingLanes.length);
assert.equal(
  catalog.counts.publicPosts,
  saparPrototype.posts.filter((post) => post.visibility === "public").length,
);
assert.deepEqual(catalog.identifiers.athletes, [saparPrototype.athlete.id]);
assert.deepEqual(
  catalog.identifiers.results,
  saparPrototype.results.map((result) => result.id),
);
assert.equal("notifications" in catalog.counts, false);
assert.equal("initialPreferences" in catalog, false);

assert.equal(error.status, "error");
assert.equal(error.error.code, "PROTOTYPE_RESPONSE_FAILED");
assert.equal(PROTOTYPE_NO_STORE_HEADERS["Cache-Control"], "no-store, max-age=0");
assert.equal(Object.isFrozen(health), true);
assert.equal(Object.isFrozen(catalog), true);
assert.equal(Object.isFrozen(catalog.identifiers.results), true);

assert.throws(
  () => buildPrototypeHealthResponse(new Date(Number.NaN)),
  /serverTime must be a valid Date/,
);

console.log("Prototype API response builders validated.");
