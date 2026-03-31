"use client";

import { motion } from "framer-motion";
import { Shield, FileText, AlertTriangle, Search, Briefcase, GitMerge, ArrowRight } from "lucide-react";
import { useCMS } from "@/context/CMSContext";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  FileText,
  AlertTriangle,
  Search,
  Briefcase,
  GitMerge,
};

export default function Services() {
  const { cmsData, language } = useCMS();
  const { services } = cmsData;

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[#d4a853] font-semibold text-sm uppercase tracking-wider">
            {services[`subtitle${language}`] || services.subtitle}
          </span>
          <h2 className="section-title mt-2">
            {services[`title${language}`] || services.title}
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            {services[`description${language}`] || services.description}
          </p>
          <div className="section-divider mt-8" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.items.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Shield;
            const features = service[`features${language}`] || service.features;
            
            return (
              <motion.div
                key={service.id}
                id={`service-${service.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-professional p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#d4a853] transition-colors duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                    {service[`title${language}`] || service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    {service[`description${language}`] || service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {features.slice(0, 3).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#d4a853] rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-[#1e3a5f] font-medium text-sm group-hover:text-[#d4a853] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
