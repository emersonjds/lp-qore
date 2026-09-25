interface AiReadingPosterProps {
  className?: string;
}

const DOCUMENT_LINES = [
  { x: 55, y: 60, width: 110 },
  { x: 55, y: 80, width: 110 },
  { x: 55, y: 100, width: 110 },
  { x: 55, y: 120, width: 110 },
  { x: 55, y: 140, width: 110 },
  { x: 55, y: 160, width: 110 },
  { x: 55, y: 180, width: 70 },
];

export const AiReadingPoster = ({ className }: AiReadingPosterProps) => (
  <svg
    viewBox="0 0 320 240"
    role="img"
    aria-label="Ilustração: o edital, um trecho destacado e o resumo com a página citada"
    className={className}
  >
    <rect x="40" y="30" width="140" height="180" rx="8" fill="#ffffff" stroke="#bdc9c1" strokeWidth="2" />
    {DOCUMENT_LINES.map((line) => (
      <rect key={line.y} x={line.x} y={line.y} width={line.width} height="8" rx="4" fill="#d3e4fe" />
    ))}
    <rect x="50" y="95" width="120" height="18" rx="4" fill="#7bd8b1" opacity="0.6" />
    <rect x="180" y="85" width="120" height="90" rx="10" fill="#ecfdf5" stroke="#047857" strokeWidth="2" />
    <rect x="195" y="105" width="70" height="8" rx="4" fill="#047857" />
    <rect x="195" y="125" width="90" height="6" rx="3" fill="#7bd8b1" />
    <rect x="195" y="140" width="80" height="6" rx="3" fill="#7bd8b1" />
    <rect x="195" y="155" width="40" height="10" rx="5" fill="#047857" />
  </svg>
);
