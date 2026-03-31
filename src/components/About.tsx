"use client";

import { motion } from "framer-motion";
import { Award, Users, Clock, ThumbsUp, Target, Eye, Heart } from "lucide-react";
import Image from "next/image";
import { useCMS } from "@/context/CMSContext";

const iconMap: Record<string, React.ElementType> = {
  Target,
  Eye,
  Heart,
};

const statsIconMap: Record<string, React.ElementType> = {
  Award,
  Users,
  Clock,
  ThumbsUp,
};

export default function About() {
  const { cmsData, language } = useCMS();
  const { about } = cmsData;

  const sections = [
    {
      key: "mission",
      icon: Target,
      title: about.mission[`title${language}`] || about.mission.title,
      content: about.mission[`content${language}`] || about.mission.content,
    },
    {
      key: "vision",
      icon: Eye,
      title: about.vision[`title${language}`] || about.vision.title,
      content: about.vision[`content${language}`] || about.vision.content,
    },
    {
      key: "commitment",
      icon: Heart,
      title: about.commitment[`title${language}`] || about.commitment.title,
      content: about.commitment[`content${language}`] || about.commitment.content,
    },
  ];

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {about.stats.map((stat, index) => {
            const icons = [Award, Users, Clock, ThumbsUp];
            const Icon = icons[index] || Award;
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              >
                <Icon className="w-8 h-8 text-[#d4a853] mx-auto mb-3" />
                <p className="text-3xl font-bold text-[#1e3a5f]">{stat.number}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {stat[`label${language}`] || stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* About Content - Text Only */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#d4a853] font-semibold text-sm uppercase tracking-wider">
              {about[`subtitle${language}`] || about.subtitle}
            </span>
            <h2 className="section-title mt-2 mb-6">
              {about[`title${language}`] || about.title}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {about[`description${language}`] || about.description}
            </p>
          </motion.div>
        </div>

        {/* Mission/Vision/Commitment Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.key}
                id={`about-${section.key}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Team Image - Scaled to 85% */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-4xl mx-auto" style={{ transform: "scale(0.85)", transformOrigin: "center" }}>
            <div className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/team-hands.jpg"
                alt={about[`imageAlt${language}`] || about.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
