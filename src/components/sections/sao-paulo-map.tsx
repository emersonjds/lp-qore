import { coverageContent } from "@/config/home-content";

const STATE_OUTLINE = "M 60,110 L 110,60 L 190,50 L 260,80 L 320,110 L 350,150 L 300,210 L 250,230 L 190,200 L 130,220 L 70,180 Z";

export const SaoPauloMap = () => (
  <figure className="rounded-lg bg-surface-low p-6">
    <svg viewBox="0 0 400 300" role="img" aria-labelledby="sao-paulo-map-title" className="h-auto w-full">
      <title id="sao-paulo-map-title">
        Mapa estilizado do estado de São Paulo com São Paulo, Campinas, Santos, Ribeirão Preto e São José dos Campos
      </title>
      <path d={STATE_OUTLINE} fill="#d1fae5" stroke="#047857" strokeWidth="1.5" strokeLinejoin="round" />
      {coverageContent.hubs.map((hub) => (
        <g key={hub.name}>
          <circle className="coverage-hub" cx={hub.centerX} cy={hub.centerY} r={hub.radius} fill="#047857" />
          <text x={hub.labelX} y={hub.labelY} textAnchor={hub.labelAnchor} fontSize="11" fill="#0f172a">
            {hub.name}
          </text>
        </g>
      ))}
    </svg>
    <figcaption className="mt-2 text-center text-caption text-muted-foreground">
      Representação ilustrativa, fora de escala.
    </figcaption>
  </figure>
);
