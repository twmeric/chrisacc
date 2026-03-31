"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCMS } from "@/context/CMSContext";

export default function Navigation() {
  const { cmsData, language } = useCMS();
  const { nav, aboutSubmenu, servicesSubmenu, site } = cmsData;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { key: "home", href: "#hero", label: nav[`home${language}`] || nav.home },
    {
      key: "about",
      href: "#about",
      label: nav[`about${language}`] || nav.about,
      submenu: [
        { key: "mission", href: "#about-mission", label: aboutSubmenu[`mission${language}`] || aboutSubmenu.mission },
        { key: "vision", href: "#about-vision", label: aboutSubmenu[`vision${language}`] || aboutSubmenu.vision },
        { key: "commitment", href: "#about-commitment", label: aboutSubmenu[`commitment${language}`] || aboutSubmenu.commitment },
      ],
    },
    {
      key: "services",
      href: "#services",
      label: nav[`services${language}`] || nav.services,
      submenu: [
        { key: "audit", href: "#service-audit", label: servicesSubmenu[`audit${language}`] || servicesSubmenu.audit },
        { key: "tax", href: "#service-tax", label: servicesSubmenu[`tax${language}`] || servicesSubmenu.tax },
        { key: "risk", href: "#service-risk", label: servicesSubmenu[`risk${language}`] || servicesSubmenu.risk },
        { key: "forensic", href: "#service-forensic", label: servicesSubmenu[`forensic${language}`] || servicesSubmenu.forensic },
        { key: "consulting", href: "#service-consulting", label: servicesSubmenu[`consulting${language}`] || servicesSubmenu.consulting },
        { key: "ma", href: "#service-ma", label: servicesSubmenu[`ma${language}`] || servicesSubmenu.ma },
      ],
    },
    { key: "contact", href: "#contact", label: nav[`contact${language}`] || nav.contact },
  ];

  const handleMobileItemClick = (key: string) => {
    const item = navItems.find(i => i.key === key);
    if (item?.submenu) {
      setExpandedMobileItem(expandedMobileItem === key ? null : key);
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSubmenuClick = () => {
    setIsMobileMenuOpen(false);
    setExpandedMobileItem(null);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#hero"
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="h-12 w-auto relative">
                <Image
                  src="/logo.png"
                  alt={site.name}
                  width={160}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.key} className="relative group">
                  <motion.a
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1 ${
                      isScrolled
                        ? "text-gray-700 hover:text-[#1e3a5f] hover:bg-gray-100"
                        : "text-gray-800 hover:text-[#1e3a5f]"
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    {item.label}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </motion.a>
                  
                  {/* Desktop Dropdown */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                      {item.submenu.map((subItem) => (
                        <a
                          key={subItem.key}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#1e3a5f] hover:bg-gray-50 transition-colors"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA & Phone */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-[#1e3a5f] font-medium text-sm hover:text-[#d4a853] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{site.phone}</span>
              </a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#1e3a5f] text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-[#152a45] transition-colors"
              >
                {nav[`contact${language}`] || nav.contact}
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div className="h-10 w-auto relative">
                    <Image
                      src="/logo.png"
                      alt={site.name}
                      width={140}
                      height={40}
                      className="h-10 w-auto object-contain"
                      priority
                    />
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto py-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.submenu ? (
                        <div className="border-b border-gray-50 last:border-0">
                          <button
                            onClick={() => handleMobileItemClick(item.key)}
                            className="w-full flex items-center justify-between px-6 py-4 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-lg">{item.label}</span>
                            <motion.div
                              animate={{ rotate: expandedMobileItem === item.key ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </motion.div>
                          </button>
                          
                          {/* Mobile Submenu */}
                          <AnimatePresence>
                            {expandedMobileItem === item.key && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden bg-gray-50"
                              >
                                {item.submenu.map((subItem) => (
                                  <a
                                    key={subItem.key}
                                    href={subItem.href}
                                    onClick={handleSubmenuClick}
                                    className="block px-10 py-3 text-gray-600 hover:text-[#1e3a5f] transition-colors"
                                  >
                                    {subItem.label}
                                  </a>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <a
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-6 py-4 text-lg font-medium text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-50"
                        >
                          {item.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 space-y-4">
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="flex items-center justify-center gap-2 text-[#1e3a5f] font-medium py-3"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{site.phone}</span>
                  </a>
                  <motion.a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full bg-[#1e3a5f] text-white text-center py-3 rounded-lg font-medium hover:bg-[#152a45] transition-colors"
                  >
                    {nav[`contact${language}`] || nav.contact}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
