const colors = ["text-emerald", "text-banana", "text-sandy", "text-lime", "text-ocean", "text-tuscan"];

export function Marquee({ items, reverse = false, className = "" }: { items: string[]; reverse?: boolean; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={`relative flex overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] ${className}`}>
      <div
        className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-3xl font-bold tracking-tight md:text-5xl">
            {t}
            <span className={`text-2xl ${colors[i % colors.length]}`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
