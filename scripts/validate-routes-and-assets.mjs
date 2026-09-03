import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const appRoot = path.join(projectRoot, "app");
const componentsRoot = path.join(projectRoot, "components");
const publicRoot = path.join(projectRoot, "public");

const expectedPublicRoutes = new Set([
  "/",
  "/demo",
  "/fighters",
  "/gyms",
  "/vision",
]);

const expectedAppRoutes = new Set([
  "/app",
  "/app/arena",
  "/app/compete",
  "/app/competitions",
  "/app/create",
  "/app/discover",
  "/app/gyms",
  "/app/leaderboards",
  "/app/network",
  "/app/notifications",
  "/app/onboarding",
  "/app/profile",
  "/app/quests",
  "/app/ratings",
  "/app/replay",
  "/app/rewards",
  "/app/settings",
]);

const expectedPrototypeApiRoutes = new Set([
  "/api/prototype/catalog",
  "/api/prototype/health",
]);

const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const pageFilenames = new Set(["page.js", "page.jsx", "page.ts", "page.tsx"]);
const routeFilenames = new Set(["route.js", "route.jsx", "route.ts", "route.tsx"]);

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function pathExists(candidatePath) {
  try {
    await access(candidatePath);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkFiles(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function routeFromFile(filePath) {
  const relativeDirectory = path.relative(appRoot, path.dirname(filePath));
  const routeSegments = relativeDirectory
    .split(path.sep)
    .filter((segment) => segment && !segment.startsWith("(") && !segment.startsWith("@"));
  return routeSegments.length === 0 ? "/" : `/${routeSegments.join("/")}`;
}

function assertExactRoutes(actual, expected, label) {
  const missing = [...expected].filter((route) => !actual.has(route));
  const unexpected = [...actual].filter((route) => !expected.has(route));
  invariant(
    missing.length === 0 && unexpected.length === 0,
    `${label} mismatch. Missing: ${missing.join(", ") || "none"}. Unexpected: ${unexpected.join(", ") || "none"}.`,
  );
}

function lineNumberAt(source, offset) {
  return source.slice(0, offset).split("\n").length;
}

function extractStringLiterals(source, property, sourcePath) {
  const expression = new RegExp(
    `\\b${property}\\s*[:=]\\s*(?:\\{\\s*)?(["'\\x60])([^"'\\x60]*?)\\1(?:\\s*\\})?`,
    "g",
  );
  const matches = [];

  for (const match of source.matchAll(expression)) {
    const value = match[2];
    if (!value || value.includes("${")) {
      continue;
    }
    matches.push({
      file: path.relative(projectRoot, sourcePath),
      line: lineNumberAt(source, match.index ?? 0),
      value,
    });
  }

  return matches;
}

function isIgnoredHref(value) {
  return (
    value.startsWith("#") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:") ||
    value.startsWith("https://") ||
    value.startsWith("http://") ||
    value.startsWith("//")
  );
}

function normalizeInternalPath(value) {
  const parsed = new URL(value, "https://sapar.local");
  const normalized = parsed.pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "");
  return normalized || "/";
}

function resolvePublicPath(publicPath) {
  const relativePath = publicPath.replace(/^\/+/, "");
  const resolved = path.resolve(publicRoot, relativePath);
  const relative = path.relative(publicRoot, resolved);
  invariant(
    relative.length > 0 && !relative.startsWith("..") && !path.isAbsolute(relative),
    `Public asset path escapes the public directory: ${publicPath}`,
  );
  return resolved;
}

function formatReference(reference) {
  return `${reference.file}:${reference.line} (${reference.value})`;
}

const appFiles = await walkFiles(appRoot);
const componentFiles = await walkFiles(componentsRoot);

const pageFiles = appFiles.filter((filePath) => pageFilenames.has(path.basename(filePath)));
const pageRoutes = new Set(pageFiles.map(routeFromFile));
const publicRoutes = new Set([...pageRoutes].filter((route) => !route.startsWith("/app")));
const prototypeRoutes = new Set([...pageRoutes].filter((route) => route.startsWith("/app")));
const prototypeApiRoutes = new Set(
  appFiles
    .filter((filePath) => {
      const relativePath = path.relative(appRoot, filePath);
      return relativePath.startsWith(`api${path.sep}prototype${path.sep}`) && routeFilenames.has(path.basename(filePath));
    })
    .map(routeFromFile),
);

assertExactRoutes(publicRoutes, expectedPublicRoutes, "Public routes");
assertExactRoutes(prototypeRoutes, expectedAppRoutes, "App routes");
assertExactRoutes(prototypeApiRoutes, expectedPrototypeApiRoutes, "Prototype API routes");

const scanFiles = [
  ...componentFiles.filter((filePath) => sourceExtensions.has(path.extname(filePath))),
  ...pageFiles,
];
const hrefReferences = [];
const srcReferences = [];

for (const filePath of scanFiles) {
  const source = await readFile(filePath, "utf8");
  hrefReferences.push(...extractStringLiterals(source, "href", filePath));
  srcReferences.push(...extractStringLiterals(source, "src", filePath));
}

const internalHrefReferences = hrefReferences.filter(({ value }) => !isIgnoredHref(value));
const unresolvedRoutes = [];
const unresolvedLinkedAssets = [];
const linkedPublicAssets = new Set();
const linkedRoutes = new Set();

for (const reference of internalHrefReferences) {
  if (!reference.value.startsWith("/")) {
    unresolvedRoutes.push(reference);
    continue;
  }

  const pathname = normalizeInternalPath(reference.value);
  if (pageRoutes.has(pathname)) {
    linkedRoutes.add(pathname);
    continue;
  }

  const publicPath = resolvePublicPath(pathname);
  if (await pathExists(publicPath)) {
    linkedPublicAssets.add(pathname);
  } else if (path.posix.extname(pathname)) {
    unresolvedLinkedAssets.push(reference);
  } else {
    unresolvedRoutes.push(reference);
  }
}

const localSrcReferences = srcReferences.filter(({ value }) => value.startsWith("/") && !value.startsWith("//"));
const publicAssets = new Set();
const unresolvedAssets = [];

for (const reference of localSrcReferences) {
  const pathname = normalizeInternalPath(reference.value);
  const publicPath = resolvePublicPath(pathname);
  if (await pathExists(publicPath)) {
    publicAssets.add(pathname);
  } else {
    unresolvedAssets.push(reference);
  }
}

const failures = [];
if (unresolvedRoutes.length > 0) {
  failures.push(`Unresolved internal routes:\n  ${unresolvedRoutes.map(formatReference).join("\n  ")}`);
}
if (unresolvedLinkedAssets.length > 0) {
  failures.push(`Unresolved linked public files:\n  ${unresolvedLinkedAssets.map(formatReference).join("\n  ")}`);
}
if (unresolvedAssets.length > 0) {
  failures.push(`Unresolved public src assets:\n  ${unresolvedAssets.map(formatReference).join("\n  ")}`);
}

console.log(
  `Routes: ${publicRoutes.size} public, ${prototypeRoutes.size} app, ${prototypeApiRoutes.size} prototype API.`,
);
console.log(
  `Links: ${internalHrefReferences.length} static internal references, ${linkedRoutes.size} unique routes, ${linkedPublicAssets.size} public files.`,
);
console.log(
  `Assets: ${localSrcReferences.length} static public references, ${publicAssets.size} unique files.`,
);

if (failures.length > 0) {
  throw new Error(failures.join("\n"));
}
