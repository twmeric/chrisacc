"use client";

interface ServiceNavItem {
  slug: string;
  title: string;
}

interface ServiceCategoryNavProps {
  items: ServiceNavItem[];
}

export default function ServiceCategoryNav({ items }: ServiceCategoryNavProps) {
  const handleClick = (slug: string) => {
    const el = document.getElementById(slug);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white pb-12 md:pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item) => (
            <button
              key={item.slug}
              onClick={() => handleClick(item.slug)}
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-text-dark transition-all duration-200 hover:border-brand-gold hover:bg-brand-gold hover:text-white hover:shadow-md md:px-6 md:text-base"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
