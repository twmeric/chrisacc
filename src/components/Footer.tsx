"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { useCMS } from "@/context/CMSContext";

export default function Footer() {
  const { cmsData, language } = useCMS();
  const { footer, site, services, nav, aboutSubmenu, servicesSubmenu } = cmsData;

  const serviceLinks = services.items.map((item) => ({
    name: item[`title${language}`] || item.title,
    href: `#service-${item.id}`,
  }));

  const aboutLinks = [
    { name: aboutSubmenu[`mission${language}`] || aboutSubmenu.mission, href: "#about-mission" },
    { name: aboutSubmenu[`vision${language}`] || aboutSubmenu.vision, href: "#about-vision" },
    { name: aboutSubmenu[`commitment${language}`] || aboutSubmenu.commitment, href: "#about-commitment" },
  ];

  const quickLinks = [
    { name: nav[`home${language}`] || nav.home, href: "#hero" },
    { name: nav[`about${language}`] || nav.about, href: "#about" },
    { name: nav[`services${language}`] || nav.services, href: "#services" },
    { name: nav[`contact${language}`] || nav.contact, href: "#contact" },
  ];

  return (
    <footer id="contact" className="bg-[#0f172a] text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <a href="#hero" className="flex items-center mb-6">
              <div className="h-12 bg-white rounded-xl px-4 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt={site.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            </a>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {footer[`tagline${language}`] || footer.tagline}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{site.phone}</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{site.email}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{site.address}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold mb-4">
              {language === "Zh" ? "快速連結" : language === "Cn" ? "快速链接" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* About Us Submenu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">
              {nav[`about${language}`] || nav.about}
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services - All Options Moved Here */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-4">
              {nav[`services${language}`] || nav.services}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-10 border-t border-gray-800"
        >
          <div className="bg-[#1e3a5f] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {language === "Zh" ? "準備好開始了嗎？" : language === "Cn" ? "准备好开始了吗？" : "Ready to get started?"}
              </h3>
              <p className="text-gray-300">
                {language === "Zh" 
                  ? "聯繫我們，了解我們如何幫助您的業務" 
                  : language === "Cn" 
                    ? "联系我们，了解我们如何帮助您的业务" 
                    : "Contact us to learn how we can help your business"}
              </p>
            </div>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 bg-white text-[#1e3a5f] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              <Phone className="w-5 h-5" />
              <span>{site.phone}</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>{footer[`copyright${language}`] || footer.copyright}</p>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
