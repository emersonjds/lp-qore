import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const INLINE_SCRIPT = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
const DATA_BLOCK_TYPE = /\btype="application\/ld\+json"/;

const hashInlineScripts = (html) =>
  [...html.matchAll(INLINE_SCRIPT)]
    .filter(([, attributes]) => !DATA_BLOCK_TYPE.test(attributes))
    .map(([, , code]) => `'sha256-${createHash("sha256").update(code).digest("base64")}'`);

export const buildContentSecurityPolicy = (htmlDocuments) => {
  const scriptHashes = [...new Set(htmlDocuments.flatMap(hashInlineScripts))];
  return [
    "default-src 'self'",
    `script-src 'self' ${scriptHashes.join(" ")}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data:",
    "connect-src 'self' https://brasilapi.com.br https://pncp.gov.br",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
};

const writeHeadersFile = (outDirectory) => {
  const htmlDocuments = readdirSync(outDirectory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => readFileSync(join(entry.parentPath, entry.name), "utf8"));
  writeFileSync(join(outDirectory, "_headers"), `/*\n  Content-Security-Policy: ${buildContentSecurityPolicy(htmlDocuments)}\n`);
};

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) writeHeadersFile(join(process.cwd(), "out"));
