"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useState } from "react";
import { useCMS } from "@/context/CMSContext";

const languages = [
  { code: "", label: "English", flag: "🇺🇸" },
  { code: "Zh", label: "繁體中文", flag: "🇭🇰" },
  { code: "Cn", label: "简体中文", flag: "🇨🇳" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useCMS();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  const handleSelect = (code: string) => {
    setLanguage(code as "" | "Zh" | "Cn");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[160px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  language === lang.code ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium text-gray-700">{lang.label}</span>
                </div>
                {language === lang.code && (
                  <Check className="w-4 h-4 text-[#1e3a5f]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white shadow-lg border border-gray-200 rounded-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:shadow-xl transition-shadow"
      >
        <Globe className="w-4 h-4 text-[#1e3a5f]" />
        <span>{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.label}</span>
      </motion.button>
    </div>
  );
}
