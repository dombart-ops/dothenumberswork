export default function MethodologyCard({
  index,
  title,
  category,
  description,
}: {
  index: number;
  title: string;
  category: string;
  description: string;
}) {
  const num = String(index).padStart(2, "0");
  return (
    <article className="group flex flex-col h-full border border-line bg-ivory-50 p-6 hover:border-ink-200 transition-colors">
      <div className="flex items-baseline justify-between">
        <span className="num text-[0.78rem] tracking-wider text-ink-400">{num}</span>
        <span className="eyebrow text-ink-400">{category}</span>
      </div>
      <h3 className="mt-4 font-serif text-[1.4rem] leading-snug text-ink">{title}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">{description}</p>
    </article>
  );
}
