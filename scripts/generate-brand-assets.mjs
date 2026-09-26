import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const iconPath = fileURLToPath(new URL("../src/app/icon.svg", import.meta.url));
const appleIconPath = fileURLToPath(new URL("../src/app/apple-icon.png", import.meta.url));
const ogImagePath = fileURLToPath(new URL("../public/og.png", import.meta.url));

const FONT_STACK = "Hanken Grotesk, Inter, Arial, sans-serif";

const iconSvg = await readFile(iconPath, "utf8");

await sharp(Buffer.from(iconSvg), { density: 384 }).resize(180, 180).png().toFile(appleIconPath);

const positionedIcon = iconSvg.replace("<svg ", '<svg x="96" y="88" width="96" height="96" ');

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f8f9ff"/>
  <rect y="598" width="1200" height="32" fill="#047857"/>
  ${positionedIcon}
  <text x="212" y="156" font-family="${FONT_STACK}" font-size="56" font-weight="700" fill="#0b1c30">Qore<tspan fill="#047857">.</tspan></text>
  <text x="96" y="340" font-family="${FONT_STACK}" font-size="80" font-weight="700" letter-spacing="-2" fill="#0b1c30">A IA lê o edital.</text>
  <text x="96" y="436" font-family="${FONT_STACK}" font-size="80" font-weight="700" letter-spacing="-2" fill="#047857">Você decide.</text>
  <text x="96" y="520" font-family="${FONT_STACK}" font-size="32" fill="#475569">Licitações de São Paulo pelo seu CNPJ</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(ogImagePath);

console.log("generated", appleIconPath, ogImagePath);
