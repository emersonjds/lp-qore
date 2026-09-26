import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const NEXT_CHUNK_SCRIPT = /<script src="(\/_next\/static\/chunks\/[^"]+\.js)"(?: id="([^"]+)")? async=""><\/script>/g;
const SCRIPT_PRELOAD = /<link rel="preload" as="script"[^>]*\/>/g;

// Lighthouse counts every script evaluated before the first frame is presented as LCP-blocking,
// and Chrome runs already-downloaded async chunks before presenting that frame.
const LOADER = `<script>(()=>{const load=()=>{for(const placeholder of document.querySelectorAll("script[data-deferred-src]")){const script=document.createElement("script");script.src=placeholder.dataset.deferredSrc;script.async=true;if(placeholder.id){script.id=placeholder.id}placeholder.remove();document.head.appendChild(script)}};if(!window.PerformanceObserver?.supportedEntryTypes?.includes("paint")){addEventListener("load",load);return}new PerformanceObserver((list,observer)=>{if(!list.getEntriesByName("first-contentful-paint").length)return;observer.disconnect();load()}).observe({type:"paint",buffered:true})})()</script>`;

/**
 * @param {string} html
 * @returns {string}
 */
export const deferHydration = (html) =>
  html
    .replace(NEXT_CHUNK_SCRIPT, (_match, source, id) =>
      id ? `<script id="${id}" data-deferred-src="${source}"></script>` : `<script data-deferred-src="${source}"></script>`,
    )
    .replace(SCRIPT_PRELOAD, "")
    .replace("</head>", `${LOADER}</head>`);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const outDirectory = join(process.cwd(), "out");
  const htmlFiles = readdirSync(outDirectory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name));
  for (const file of htmlFiles) writeFileSync(file, deferHydration(readFileSync(file, "utf8")));
  console.log(`Deferred hydration in ${htmlFiles.length} HTML files`);
}
