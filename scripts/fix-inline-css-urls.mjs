import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// ponytail: Next's inlineCss keeps the stylesheet-relative url(../media/…) of next/font; rewrite only <style> blocks, since the RSC payload is length-prefixed.
const RELATIVE_MEDIA_URL = /url\(\.\.\/media\//g;
const STYLE_BLOCK = /<style\b[^>]*>[\s\S]*?<\/style>/g;
const OUT_DIRECTORY = join(process.cwd(), "out");

export const rewriteInlineCssUrls = (html) =>
  html.replace(STYLE_BLOCK, (block) => block.replace(RELATIVE_MEDIA_URL, "url(/_next/static/media/"));

const htmlFiles = readdirSync(OUT_DIRECTORY, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => join(entry.parentPath, entry.name));

htmlFiles.forEach((file) => {
  const html = readFileSync(file, "utf8");
  const rewritten = rewriteInlineCssUrls(html);
  if (rewritten !== html) writeFileSync(file, rewritten);
});
