import Link from "next/link";

const NAV = [
  { href: "/methodology", label: "Methodology" },
  { href: "/sample-report", label: "Sample report" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-line bg-ivory/85 backdrop-blur-sm sticky top-0 z-40">
      <div className="container-editorial flex items-center justify-between h-16">
        <Link href="/" className="flex items-baseline gap-3 group">
          <span className="font-serif text-[1.35rem] leading-none tracking-tight text-ink">
            Do The Numbers Work
          </span>
          <span
            aria-hidden
            className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-gold transition-transform group-hover:scale-125"
          />
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono uppercase text-[0.72rem] tracking-ultra-wide text-ink-500 hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-navy text-ivory px-4 py-2 font-mono uppercase text-[0.72rem] tracking-ultra-wide hover:bg-ink transition-colors"
          >
            Analyze a deal
          </Link>
        </nav>
        <Link
          href="/analyze"
          className="md:hidden inline-flex items-center bg-navy text-ivory px-3 py-1.5 font-mono uppercase text-[0.68rem] tracking-ultra-wide"
        >
          Analyze
        </Link>
      </div>
    </header>
  );
}
