import TimelineItem from "@/components/ui/TimelineItem";

interface TimelineSectionProps {
  lang: string;
}

const content: Record<string, { title: string; subtitle: string; events: { year: string; title: string; desc: string }[] }> = {
  "zh-hant": {
    title: "發展歷程",
    subtitle: "見證我們的成長與蛻變",
    events: [
      { year: "2005", title: "公司成立", desc: "櫪韜會計師事務所有限公司在香港正式成立，開始為本地中小企業提供專業會計服務。" },
      { year: "2010", title: "擴展審計業務", desc: "成功獲得多項法定審計委任，團隊規模擴充至20人，服務範圍進一步拓展。" },
      { year: "2015", title: "國際認證", desc: "獲得國際會計師聯會認證，開始為跨國企業提供審計及稅務服務。" },
      { year: "2020", title: "數碼轉型", desc: "全面推動數碼化服務，引入雲端會計及數據分析，提升服務效率與質素。" },
      { year: "2025", title: "持續創新", desc: "致力運用人工智能及先進科技，為客戶提供更智能、更高效的財務解決方案。" },
    ],
  },
  "zh-hans": {
    title: "发展历程",
    subtitle: "见证我们的成长与蜕变",
    events: [
      { year: "2005", title: "公司成立", desc: "櫪韬会计师事务所有限公司在香港正式成立，开始为本地中小企业提供专业会计服务。" },
      { year: "2010", title: "扩展审计业务", desc: "成功获得多项法定审计委任，团队规模扩充至20人，服务范围进一步拓展。" },
      { year: "2015", title: "国际认证", desc: "获得国际会计师联会认证，开始为跨国企业提供审计及税务服务。" },
      { year: "2020", title: "数码转型", desc: "全面推动数码化服务，引入云端会计及数据分析，提升服务效率与质素。" },
      { year: "2025", title: "持续创新", desc: "致力运用人工智能及先进科技，为客户提供更智能、更高效的财务解决方案。" },
    ],
  },
  en: {
    title: "Our Journey",
    subtitle: "Witness our growth and transformation",
    events: [
      { year: "2005", title: "Company Founded", desc: "LT CPA Limited was officially established in Hong Kong, beginning to provide professional accounting services to local SMEs." },
      { year: "2010", title: "Audit Expansion", desc: "Successfully secured multiple statutory audit appointments, expanding the team to 20 professionals and broadening service scope." },
      { year: "2015", title: "International Accreditation", desc: "Received accreditation from international accounting federations, beginning to serve multinational corporations." },
      { year: "2020", title: "Digital Transformation", desc: "Fully embraced digitalization, introducing cloud accounting and data analytics to enhance service efficiency and quality." },
      { year: "2025", title: "Continuous Innovation", desc: "Committed to leveraging AI and advanced technology to provide smarter and more efficient financial solutions for clients." },
    ],
  },
};

export default function TimelineSection({ lang }: TimelineSectionProps) {
  const t = content[lang] || content["zh-hant"];
  return (
    <section className="bg-brand-cream px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="relative inline-block text-3xl font-bold text-brand-navy md:text-[40px]">
            {t.title}
            <span className="absolute -bottom-3 left-1/2 h-[3px] w-16 -translate-x-1/2 bg-brand-gold" />
          </h2>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-text-light">{t.subtitle}</p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-[3px] -translate-x-1/2 bg-brand-gold md:block" />
          {t.events.map((event, idx) => (
            <TimelineItem
              key={idx}
              year={event.year}
              title={event.title}
              description={event.desc}
              side={idx % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
