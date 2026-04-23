export default function OrganizationSchema() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://dothenumberswork.com/#organization",
        name: "Do The Numbers Work",
        url: "https://dothenumberswork.com",
        logo: "https://dothenumberswork.com/og-default.png",
        parentOrganization: {
          "@type": "Organization",
          name: "Rusty Roof Media",
          url: "https://rustyroofmedia.com",
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://dothenumberswork.com/#website",
        url: "https://dothenumberswork.com",
        name: "Do The Numbers Work",
        publisher: { "@id": "https://dothenumberswork.com/#organization" },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        name: "Do The Numbers Work — Real Estate Deal Analyzer",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://dothenumberswork.com",
        offers: {
          "@type": "Offer",
          price: "30",
          priceCurrency: "USD",
        },
        publisher: { "@id": "https://dothenumberswork.com/#organization" },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
