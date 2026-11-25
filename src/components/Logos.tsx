import Image from "next/image";
import type { Project } from "@/data/projects";

/* Recreated vector marks for projects that have no standalone logo file. */

const marcellus = { fontFamily: "var(--font-marcellus), serif" };
const bebas = { fontFamily: "var(--font-bebas), sans-serif" };
const display = { fontFamily: "var(--font-bricolage), sans-serif" };
const body = { fontFamily: "var(--font-manrope), sans-serif" };

function NaturesBlend() {
  const gold = "#dcaa7c";
  return (
    <svg viewBox="0 0 400 360" role="img" aria-label="Nature's Blend logo" className="h-full w-full">
      <defs>
        <path id="nb-arc" d="M 78 190 A 128 128 0 0 1 322 190" />
      </defs>
      <text fill={gold} fontSize="27" letterSpacing="6" style={marcellus}>
        <textPath href="#nb-arc" startOffset="50%" textAnchor="middle">
          NATURE&apos;S BLEND
        </textPath>
      </text>
      <text x="72" y="232" fill={gold} fontSize="17" style={marcellus}>EST.</text>
      <text x="328" y="232" fill={gold} fontSize="17" textAnchor="end" style={marcellus}>2010</text>
      <g fill="none" stroke={gold} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* leaves */}
        <path d="M195 236 C172 214 168 168 181 118 C222 140 228 196 195 236 Z" />
        <path d="M188 222 C179 200 179 176 184 158" />
        <path d="M202 236 C214 198 234 176 260 168 C264 206 238 228 202 236 Z" />
        <path d="M209 228 C219 208 231 194 246 185" />
        {/* cup */}
        <path d="M146 240 L254 240" />
        <path d="M146 240 C148 290 178 312 200 312 C222 312 252 290 254 240" />
        {/* bean */}
        <path d="M176 306 C188 270 214 250 252 244" />
        <path d="M150 246 C170 262 186 270 198 290" />
        {/* cradle */}
        <path d="M108 250 C116 308 156 340 200 342 C244 340 284 308 292 250" />
        <path d="M108 250 C130 296 164 326 200 342 C236 326 270 296 292 250" />
        <path d="M152 316 C170 312 188 324 200 342 C212 324 230 312 248 316" />
        <path d="M168 330 C180 326 192 334 200 342" />
        <path d="M232 330 C220 326 208 334 200 342" />
      </g>
    </svg>
  );
}

function HiddenGems() {
  const ink = "#1d1d20";
  const red = "#e5473b";
  return (
    <svg viewBox="0 0 320 300" role="img" aria-label="Unraveling the Hidden Gems of Local History" className="h-full w-full">
      <rect x="18" y="10" width="140" height="44" fill="none" stroke="#f29e4c" strokeWidth="3" />
      <text x="88" y="41" textAnchor="middle" fill="#f29e4c" fontSize="24" fontWeight="600" style={display}>Portfolio</text>
      <g fontWeight="800" fontSize="44" style={display}>
        <text x="18" y="104" fill={ink}>Unraveling</text>
        <text x="18" y="150" fill={ink}>the <tspan fill={red}>Hidden</tspan></text>
        <text x="18" y="196"><tspan fill={red}>Gems</tspan><tspan fill={ink}> of</tspan></text>
        <text x="18" y="242" fill={ink}>Local</text>
        <text x="18" y="288" fill={ink}>History</text>
      </g>
      <rect x="250" y="262" width="52" height="10" fill="#f29e4c" />
    </svg>
  );
}

function Posters() {
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label="Poster series mark" className="h-full w-full">
      <g fill="none" stroke="#f2f0eb" strokeWidth="3">
        <path d="M40 40 H260 V118 A18 18 0 0 0 260 154 V260 H40 V154 A18 18 0 0 0 40 118 Z" />
        <line x1="62" x2="238" y1="136" y2="136" strokeDasharray="8 8" />
      </g>
      <text x="150" y="112" textAnchor="middle" fill="#f2f0eb" fontSize="78" letterSpacing="3" style={bebas}>POSTER</text>
      <text x="150" y="214" textAnchor="middle" fill="#efea5a" fontSize="64" letterSpacing="6" style={bebas}>SERIES</text>
      <text x="150" y="246" textAnchor="middle" fill="#f2f0eb" fontSize="16" letterSpacing="5" style={body} fontWeight="700">EVENTS · AUTO · FILM</text>
    </svg>
  );
}

function Streetwear() {
  return (
    <svg viewBox="0 0 300 300" role="img" aria-label="Streetwear graphics mark" className="h-full w-full">
      <path
        d="M98 40 L58 58 L22 104 L58 130 L76 112 V270 H224 V112 L242 130 L278 104 L242 58 L202 40 C196 62 176 74 150 74 C124 74 104 62 98 40 Z"
        fill="none"
        stroke="#f2f0eb"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <text x="150" y="160" textAnchor="middle" fill="#f2f0eb" fontSize="58" letterSpacing="2" style={bebas}>BACK</text>
      <text x="150" y="212" textAnchor="middle" fill="#f29e4c" fontSize="58" letterSpacing="2" style={bebas}>PRINT</text>
      <text x="150" y="244" textAnchor="middle" fill="#f2f0eb" fontSize="13" letterSpacing="5" fontWeight="700" style={body}>STREETWEAR</text>
    </svg>
  );
}

const vectors: Record<string, () => React.JSX.Element> = {
  "natures-blend": NaturesBlend,
  "print-designs": HiddenGems,
  "promotional-posters": Posters,
  "tshirt-designs": Streetwear,
};

export function ProjectLogo({ project, sizes = "40vw", className = "" }: { project: Project; sizes?: string; className?: string }) {
  const Vector = vectors[project.logo];
  return (
    <div className={`relative h-full w-full ${className}`}>
      {Vector ? (
        <Vector />
      ) : (
        <Image src={project.logo} alt={`${project.title} logo`} fill sizes={sizes} className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]" />
      )}
    </div>
  );
}
