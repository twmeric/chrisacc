import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import HomePage from "@/components/pages/HomePage";
import { getLocaleCMS } from "@/lib/cms-data";

export default function RootHomePage() {
  const cms = getLocaleCMS("en");
  return (
    <>
      <Header
        lang="en"
        navItems={cms.header.navItems}
        siteName={cms.site.name}
        siteTagline={cms.site.tagline}
        logoUrl={cms.site.logo}
      />
      <main className="flex-1">
        <HomePage lang="en" />
      </main>
      <Footer lang="en" />
    </>
  );
}
