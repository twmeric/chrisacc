"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Globe, ChevronDown } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

export default function Hero() {
  const { cmsData, language } = useCMS();
  const { hero, site } = cmsData;

  const highlights = [
    { icon: Award, label: language === "Zh" ? "專業認證" : language === "Cn" ? "专业认证" : "Professional Certified" },
    { icon: Users, label: language === "Zh" ? "經驗團隊" : language === "Cn" ? "经验团队" : "Experienced Team" },
    { icon: Globe, label: language === "Zh" ? "全球視野" : language === "Cn" ? "全球视野" : "Global Perspective" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#1e3a5f] to-slate-800 pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-[#d4a853] rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              {language === "Zh" ? "專業會計與諮詢服務" : language === "Cn" ? "专业会计与咨询服务" : "Professional Accounting & Advisory"}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            {hero[`title${language}`] || hero.title}
            <span className="block text-[#d4a853] mt-2">
              {hero[`subtitle${language}`] || hero.subtitle}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {hero[`description${language}`] || hero.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-[#d4a853] text-slate-900 px-8 py-4 rounded-xl font-bold text-base hover:bg-[#e8c87a] transition-colors"
            >
              {hero[`ctaPrimary${language}`] || hero.ctaPrimary}
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition-colors"
            >
              {hero[`ctaSecondary${language}`] || hero.ctaSecondary}
            </motion.a>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-white/10"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#d4a853]" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{item.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Phone Number */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-white/70 hover:text-[#d4a853] transition-colors"
            >
              <span className="text-sm">{language === "Zh" ? "致電我們" : language === "Cn" ? "致电我们" : "Call us"}</span>
              <span className="font-semibold">{site.phone}</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-xs uppercase tracking-widest">
              {language === "Zh" ? "向下滾動" : language === "Cn" ? "向下滚动" : "Scroll"}
            </span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
