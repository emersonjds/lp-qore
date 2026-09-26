import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer, type Server } from "node:http";
import { extname, join, normalize } from "node:path";

const CONTENT_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

const resolveFile = (root: string, urlPath: string): string | undefined => {
  const cleanPath = normalize(decodeURIComponent(urlPath.split("?")[0] ?? "/"));
  const candidates = [cleanPath, `${cleanPath}.html`, join(cleanPath, "index.html")].map((candidate) =>
    join(root, candidate),
  );
  return candidates.find((candidate) => candidate.startsWith(root) && existsSync(candidate) && statSync(candidate).isFile());
};

export const startStaticServer = (
  root: string,
  extraHeaders: Readonly<Record<string, string>> = {},
): Promise<{ url: string; server: Server }> =>
  new Promise((resolve) => {
    const server = createServer((request, response) => {
      const file = resolveFile(root, request.url ?? "/");
      if (!file) {
        response.writeHead(404, { ...extraHeaders, "Content-Type": "text/html; charset=utf-8" });
        response.end(readFileSync(join(root, "404.html")));
        return;
      }
      response.writeHead(200, { ...extraHeaders, "Content-Type": CONTENT_TYPES[extname(file)] ?? "application/octet-stream" });
      response.end(readFileSync(file));
    });
    server.listen(0, () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 0;
      resolve({ url: `http://127.0.0.1:${port}`, server });
    });
  });
