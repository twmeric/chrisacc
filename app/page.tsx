import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import HomePage from "@/components/pages/HomePage";
import "./globals.css";

export const metadata = {
  title: "LTCPA | Professional Accounting Services",
  description: "LT CPA Limited provides audit, tax, risk, and business advisory services in Hong Kong.",
};

export default function RootHomePage() {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Noto+Sans+TC:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header lang="en" />
        <main className="flex-1">
          <HomePage lang="en" />
        </main>
        <Footer lang="en" />
      </body>
    </html>
  );
}
