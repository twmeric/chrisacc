import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Footer />
      <LanguageSwitcher />
    </main>
  );
}
