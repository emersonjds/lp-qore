import { BRAZIL_MAP } from "@/config/brazil-map";
import { coverageContent } from "@/config/home-content";
import { staggerStyle } from "@/lib/stagger-style";

const SAO_PAULO_CODE = "35";
const AVAILABLE_FILL = "#047857";
const UPCOMING_FILL = "#e2e8f0";

const stateEntries = Object.entries(BRAZIL_MAP.states);
const otherStates = stateEntries.filter(([code]) => code !== SAO_PAULO_CODE);
const saoPauloPath = BRAZIL_MAP.states[SAO_PAULO_CODE];

const toMapPoint = (longitude: number, latitude: number) => ({
  x: (longitude - BRAZIL_MAP.origin.longitude) * BRAZIL_MAP.unitsPerDegree,
  y: (BRAZIL_MAP.origin.latitude - latitude) * BRAZIL_MAP.unitsPerDegree,
});

export const BrazilMap = () => (
  <figure data-reveal data-coverage-map className="rounded-lg bg-surface-low p-6">
    <svg viewBox={BRAZIL_MAP.viewBox} role="img" aria-labelledby="brazil-map-title" className="h-auto w-full">
      <title id="brazil-map-title">
        Mapa do Brasil com o estado de São Paulo em destaque e os polos São Paulo, Campinas, Santos, Ribeirão Preto e
        São José dos Campos
      </title>
      <defs>
        <filter id="sao-paulo-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      {otherStates.map(([code, path], index) => (
        <path
          key={code}
          data-uf={code}
          d={path}
          fill={UPCOMING_FILL}
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={staggerStyle(index)}
        />
      ))}
      <path data-sp-glow d={saoPauloPath} fill="#34d399" opacity="0.55" filter="url(#sao-paulo-glow)" />
      <path
        data-uf={SAO_PAULO_CODE}
        d={saoPauloPath}
        fill={AVAILABLE_FILL}
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={staggerStyle(otherStates.length)}
      />
      {coverageContent.hubs.map((hub) => {
        const { x, y } = toMapPoint(hub.longitude, hub.latitude);
        return (
          <g key={hub.name}>
            <circle data-hub-ring cx={x} cy={y} r="4" fill="none" stroke="#047857" strokeWidth="2" />
            <circle
            className="coverage-hub"
            cx={x}
            cy={y}
            r="4"
            fill="#ffffff"
            stroke="#022c22"
            strokeWidth="1.5"
          />
          </g>
        );
      })}
    </svg>
    <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-label-md text-foreground">
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="size-3 rounded-sm bg-primary" />
        Disponível
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="size-3 rounded-sm bg-slate-200" />
        Em breve
      </li>
    </ul>
    <figcaption className="mt-2 text-center text-caption text-muted-foreground">Fonte da malha: IBGE.</figcaption>
  </figure>
);
