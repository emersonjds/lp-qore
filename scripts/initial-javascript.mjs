import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

/**
 * @param {string} html
 * @returns {string[]}
 */
export const listInitialScripts = (html) =>
  [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)]
    .map((match) => (match[1] ?? "").split("?")[0] ?? "")
    .filter((source) => source.startsWith("/_next/"));

/**
 * @param {string} outDirectory
 * @param {string} [htmlFile]
 * @returns {{ files: string[], gzipBytes: number }}
 */
export const measureInitialJavaScript = (outDirectory, htmlFile = "index.html") => {
  const html = readFileSync(join(outDirectory, htmlFile), "utf8");
  const files = listInitialScripts(html);
  const gzipBytes = files.reduce(
    (total, source) => total + gzipSync(readFileSync(join(outDirectory, source))).length,
    0,
  );
  return { files, gzipBytes };
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { files, gzipBytes } = measureInitialJavaScript(join(process.cwd(), "out"));
  console.log(JSON.stringify({ scriptCount: files.length, gzipBytes }, null, 2));
}
