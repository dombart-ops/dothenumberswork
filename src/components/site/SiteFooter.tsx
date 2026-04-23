import Link from "next/link";

const COLS: Array<{ heading: string; links: Array<{ href: string; label: string }> }> = [
  {
    heading: "Product",
    links: [
      { href: "/sample-report", label: "Sample report" },
      { href: "/methodology", label: "All 23 methodologies" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#analyze", label: "Analyze a deal" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "https://rustyroofmedia.com", label: "Rusty Roof Media" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/terms", label: "Terms of use" },
      { href: "/privacy", label: "Privacy" },
      { href: "/disclosures", label: "Disclosures" },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-ivory">
      <div className="container-editorial py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="font-serif text-[1.4rem] tracking-tight text-ink">
              Do The Numbers Work
            </Link>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink-500">
              An institutional-grade real estate underwriting tool published by
              {" "}
              <Link href="https://rustyroofmedia.com" className="underline decoration-line decoration-1 underline-offset-4 hover:text-ink">
                Rusty Roof Media
              </Link>
              . Twenty-three methodologies. One defensible answer.
            </p>
          </div>
          {COLS.map((col) => (
            <div key={col.heading}>
              <h3 className="eyebrow">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[0.95rem] text-ink-500 hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-12" />

        <div className="grid gap-6 md:grid-cols-2 md:items-end">
          <p className="text-[0.8rem] leading-relaxed text-ink-400">
            <strong className="font-medium text-ink-500">Important.</strong>{" "}
            Do The Numbers Work is a software analytics tool. It is not investment, tax, accounting,
            or legal advice. Outputs are model estimates based on the inputs you provide. Real
            estate involves substantial risk including the possible loss of principal. Consult a
            licensed professional before transacting.
          </p>
          <p className="md:text-right text-[0.8rem] text-ink-400">
            &copy; {year} Rusty Roof Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
