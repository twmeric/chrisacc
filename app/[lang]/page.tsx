import { Locale } from "@/lib/i18n-config";
import HomePage from "@/components/pages/HomePage";

interface HomePageRouteProps {
  params: Promise<{ lang: Locale }>;
}

export default async function LocalizedHomePage({ params }: HomePageRouteProps) {
  const { lang } = await params;
  return <HomePage lang={lang} />;
}
