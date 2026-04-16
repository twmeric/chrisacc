import { notFound } from "next/navigation";
import { Locale, i18n } from "@/lib/i18n-config";
import { getAllMarkdownFiles } from "@/lib/cms";
import ServiceHero from "@/components/sections/ServiceHero";
import ServiceOverview from "@/components/sections/ServiceOverview";
import ServiceScope from "@/components/sections/ServiceScope";
import ServiceProcess from "@/components/sections/ServiceProcess";
import WhyChooseService from "@/components/sections/WhyChooseService";
import RelatedServices from "@/components/sections/RelatedServices";
import CTASection from "@/components/sections/CTASection";

interface ServicePageProps {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = ["audit", "tax", "risk", "forensic", "consulting", "deals"];
  const params: { lang: string; slug: string }[] = [];
  for (const lang of i18n.locales) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

const serviceData: Record<string, { tagline: string; overviewTitle: string; overview: string[]; scopeTitle: string; scope: { title: string; desc: string; points: string[] }[]; processTitle: string; process: { number: string; title: string; desc: string }[]; whyTitle: string; ctaTitle: string; ctaDesc: string; ctaBtn: string; ctaBtn2: string }> = {
  audit: {
    tagline: "為資本市場注入信心。",
    overviewTitle: "專業審計，值得信賴",
    overview: [
      "在當今複雜的商業環境中，財務報表的準確性和可靠性對於維護投資者信心、滿足監管要求以及支持企業決策至關重要。櫪韜會計師事務所有限公司提供全方位的審計及鑑證服務，協助企業確保財務資訊的真實性和公允性。",
      "我們的審計團隊由經驗豐富的註冊會計師組成，深諳香港及國際審計準則，能夠為各行各業的客戶提供高質素的審計服務。無論是法定審計、內部審計，還是特殊目的審計，我們都能根據您的具體需求，制定最合適的審計方案。",
    ],
    scopeTitle: "服務範圍",
    scope: [
      { title: "法定及非法定審計", desc: "Statutory & Non-Statutory Audit", points: ["按照香港審計準則執行法定審計", "特別目的審計及盡職調查", "內部控制審閱及建議"] },
      { title: "資本市場交易", desc: "Capital Market Transactions", points: ["首次公開招股（IPO）審計", "併購盡職調查", "財務盡職調查報告"] },
      { title: "合規及風險", desc: "Compliance & Risk", points: ["監管合規審查", "風險評估及管理建議", "企業管治諮詢"] },
    ],
    processTitle: "審計流程",
    process: [
      { number: "1", title: "規劃與風險評估", desc: "深入了解您的業務、行業環境及內部控制，識別重大風險領域。" },
      { number: "2", title: "實質性測試", desc: "對財務報表各科目進行詳細測試，收集充分適當的審計證據。" },
      { number: "3", title: "分析與評價", desc: "綜合分析審計結果，評價財務報表是否在所有重大方面公允列報。" },
      { number: "4", title: "報告與跟進", desc: "出具審計報告，並就發現的問題提出改進建議，協助企業持續優化。" },
    ],
    whyTitle: "為何選擇 LT CPA 審計服務",
    ctaTitle: "需要專業審計服務？",
    ctaDesc: "讓我們的專家團隊為您提供高質量的審計解決方案",
    ctaBtn: "免費諮詢",
    ctaBtn2: "查看所有服務",
  },
  tax: {
    tagline: "合法節稅，合規經營。",
    overviewTitle: "專業稅務諮詢，助您合法節稅",
    overview: [
      "稅務規劃是企業財務管理的重要一環。合理的稅務安排不僅能夠有效降低企業稅負，更能確保企業在複雜多變的稅務法規環境中合法合規經營。櫪韜會計師事務所有限公司提供全面的稅務諮詢及規劃服務，協助客戶實現稅務效益最大化。",
      "我們的稅務團隊緊貼最新的稅務法規變化，擁有豐富的本地及跨境稅務經驗。無論是香港利得稅、薪俸稅、物業稅，還是國際稅務安排、轉讓定價等，我們都能為您提供專業意見和切實可行的解決方案。",
    ],
    scopeTitle: "服務範圍",
    scope: [
      { title: "企業稅務", desc: "Corporate Tax", points: ["利得稅報稅及規劃", "稅務盡職調查", "稅務爭議解決"] },
      { title: "個人稅務", desc: "Personal Tax", points: ["薪俸稅及物業稅申報", "個人稅務規劃", "離岸稅務諮詢"] },
      { title: "國際稅務", desc: "International Tax", points: ["跨境稅務安排", "轉讓定價文件準備", "雙重徵稅協定應用"] },
    ],
    processTitle: "稅務服務流程",
    process: [
      { number: "1", title: "稅務診斷", desc: "全面分析企業現行稅務狀況，識別潛在風險及節稅機會。" },
      { number: "2", title: "方案設計", desc: "根據企業實際情況，設計合法合規的稅務優化方案。" },
      { number: "3", title: "實施執行", desc: "協助企業落實稅務方案，處理相關申報及備案手續。" },
      { number: "4", title: "持續跟進", desc: "定期檢討稅務安排，確保符合最新法規要求。" },
    ],
    whyTitle: "為何選擇 LT CPA 稅務服務",
    ctaTitle: "需要專業稅務諮詢？",
    ctaDesc: "讓我們的稅務專家為您制定最佳的稅務策略",
    ctaBtn: "免費諮詢",
    ctaBtn2: "查看所有服務",
  },
  risk: {
    tagline: "識別風險，把握機遇。",
    overviewTitle: "風險管理與合規顧問",
    overview: [
      "在瞬息萬變的商業環境中，企業面臨的風險日益複雜多樣。有效的風險管理和合規體系不僅能夠保護企業資產和聲譽，更能為企業創造競爭優勢。櫪韜會計師事務所有限公司提供專業的風險及合規顧問服務，協助企業建立穩健的風險管理框架。",
      "我們的專業團隊具備豐富的企業風險評估、內部控制審閱及監管合規經驗。我們會因應客戶的行業特性和業務規模，度身設計合適的風險管理方案，協助企業在合規的基礎上穩健發展。",
    ],
    scopeTitle: "服務範圍",
    scope: [
      { title: "企業風險評估", desc: "Enterprise Risk Assessment", points: ["全面風險識別及評估", "風險管理策略制定", "風險監控及報告機制"] },
      { title: "內部控制審閱", desc: "Internal Control Review", points: ["內部控制系統評估", "營運流程優化建議", "舞弊風險評估"] },
      { title: "監管合規", desc: "Regulatory Compliance", points: ["法規遵循審查", "合規培訓及政策制定", "監管報告支援"] },
    ],
    processTitle: "風險管理流程",
    process: [
      { number: "1", title: "風險識別", desc: "全面了解企業營運環境，系統性識別各類潛在風險。" },
      { number: "2", title: "風險評估", desc: "分析風險發生的可能性及影響程度，釐定風險優先次序。" },
      { number: "3", title: "應對設計", desc: "制定針對性的風險應對策略及內部控制措施。" },
      { number: "4", title: "監察改進", desc: "持續監察風險狀況，定期檢討及優化風險管理體系。" },
    ],
    whyTitle: "為何選擇 LT CPA 風險服務",
    ctaTitle: "需要專業風險管理顧問？",
    ctaDesc: "讓我們協助您建立穩健的風險管理及合規體系",
    ctaBtn: "免費諮詢",
    ctaBtn2: "查看所有服務",
  },
  forensic: {
    tagline: "揭示真相，捍衛正義。",
    overviewTitle: "法證會計及調查服務",
    overview: [
      "當企業懷疑存在舞弊、財務欺詐或商業糾紛時，及時、專業的法證會計調查能夠揭示事實真相，為企業挽回損失並提供法律支援。櫪韜會計師事務所有限公司的法證會計團隊具備專業的調查技能和豐富的實戰經驗，能夠協助客戶處理各類複雜的財務糾紛和舞弊案件。",
      "我們運用先進的數據分析技術和嚴謹的調查方法，從海量財務資料中抽絲剝繭，找出關鍵證據。無論是內部舞弊調查、訴訟支援，還是資產追蹤，我們都能為客戶提供獨立、客觀的專業意見。",
    ],
    scopeTitle: "服務範圍",
    scope: [
      { title: "舞弊調查", desc: "Fraud Investigation", points: ["內部舞弊及貪污調查", "財務報表欺詐分析", "舉報熱線及調查服務"] },
      { title: "訴訟支援", desc: "Litigation Support", points: ["商業糾紛損失評估", "專家證人服務", "仲裁及調解支援"] },
      { title: "資產追蹤", desc: "Asset Tracing", points: ["隱藏資產調查", "資金流向分析", "破產及清盤調查"] },
    ],
    processTitle: "法證調查流程",
    process: [
      { number: "1", title: "初步評估", desc: "了解案件背景，評估調查範圍及所需資源。" },
      { number: "2", title: "資料蒐集", desc: "系統性蒐集及保存相關財務資料和電子證據。" },
      { number: "3", title: "深入分析", desc: "運用專業技術分析數據，識別異常交易及關鍵證據。" },
      { number: "4", title: "報告及建議", desc: "撰寫詳盡調查報告，並就後續行動提供專業建議。" },
    ],
    whyTitle: "為何選擇 LT CPA 法證服務",
    ctaTitle: "需要專業法證會計服務？",
    ctaDesc: "讓我們的專家團隊協助您揭示真相，捍衛權益",
    ctaBtn: "免費諮詢",
    ctaBtn2: "查看所有服務",
  },
  consulting: {
    tagline: "助力企業成長，共創商業價值。",
    overviewTitle: "商業諮詢顧問服務",
    overview: [
      "在競爭激烈的商業環境中，企業需要專業的顧問服務來把握機遇、應對挑戰。櫪韜會計師事務所有限公司提供全面的商業諮詢服務，從財務管理、營運優化到策略規劃，協助企業提升競爭力，實現可持續發展。",
      "我們的商業顧問團隊擁有豐富的跨行業經驗，能夠深入了解客戶的業務模式和發展目標，提供切實可行且具前瞻性的建議。無論是初創企業還是成熟公司，我們都能成為您值得信賴的商業夥伴。",
    ],
    scopeTitle: "服務範圍",
    scope: [
      { title: "財務管理顧問", desc: "Financial Advisory", points: ["財務分析及績效評估", "現金流管理及預算規劃", "融資策略及資本結構優化"] },
      { title: "營運改善", desc: "Operational Improvement", points: ["營運流程優化", "成本管理及控制", "供應鏈管理顧問"] },
      { title: "策略規劃", desc: "Strategic Planning", points: ["業務發展策略", "市場進入策略","企業重組及轉型顧問"] },
    ],
    processTitle: "諮詢服務流程",
    process: [
      { number: "1", title: "現況診斷", desc: "深入了解企業現況，識別問題根源及改善機會。" },
      { number: "2", title: "策略制定", desc: "根據企業目標及市場環境，制定切實可行的發展策略。" },
      { number: "3", title: "方案實施", desc: "協助企業落實改善方案，提供必要的培訓及支援。" },
      { number: "4", title: "成效評估", desc: "持續追蹤實施成效，確保達成預期目標。" },
    ],
    whyTitle: "為何選擇 LT CPA 商業諮詢",
    ctaTitle: "需要專業商業顧問？",
    ctaDesc: "讓我們成為您企業成長路上的專業夥伴",
    ctaBtn: "免費諮詢",
    ctaBtn2: "查看所有服務",
  },
  deals: {
    tagline: "專業盡職調查，降低交易風險。",
    overviewTitle: "併購及交易顧問服務",
    overview: [
      "併購交易涉及大量複雜的財務、法律及商業風險。專業的盡職調查和交易顧問服務能夠幫助投資者全面了解目標公司的真實狀況，識別潛在風險，從而做出明智的投資決策。櫪韜會計師事務所有限公司提供專業的併購顧問服務，為您的交易保駕護航。",
      "我們的併購團隊擁有豐富的本地及跨境交易經驗，能夠為買方和賣方提供獨立、客觀的專業意見。從財務盡職調查、估值分析到交易結構設計，我們都能為您提供全方位的支援。",
    ],
    scopeTitle: "服務範圍",
    scope: [
      { title: "財務盡職調查", desc: "Financial Due Diligence", points: ["目標公司財務狀況分析", "盈利質量評估", "資產負債及或然負債審閱"] },
      { title: "估值服務", desc: "Valuation Services", points: ["企業價值評估", "無形資產估值","購股權估值"] },
      { title: "交易支援", desc: "Transaction Support", points: ["交易架構設計建議", "買賣協議財務條款審閱","交割後整合支援"] },
    ],
    processTitle: "併購顧問流程",
    process: [
      { number: "1", title: "初步了解", desc: "與客戶溝通交易背景及關注事項，確定盡職調查範圍。" },
      { number: "2", title: "資料審閱", desc: "詳細審閱目標公司財務資料，進行管理層訪談及現場考察。" },
      { number: "3", title: "分析評估", desc: "識別關鍵財務問題及交易風險，評估對交易價格的影響。" },
      { number: "4", title: "報告及談判", desc: "出具盡職調查報告，並協助客戶進行交易談判及條款修訂。" },
    ],
    whyTitle: "為何選擇 LT CPA 併購服務",
    ctaTitle: "需要專業併購顧問？",
    ctaDesc: "讓我們的專家團隊為您的交易提供全方位的專業支援",
    ctaBtn: "免費諮詢",
    ctaBtn2: "查看所有服務",
  },
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { lang, slug } = await params;
  const data = serviceData[slug];
  if (!data) return notFound();

  const allServices = getAllMarkdownFiles("services", lang)
    .filter((s) => ["audit", "tax", "risk", "forensic", "consulting", "deals"].includes(s.slug))
    .map((s) => ({ slug: s.slug, title: s.data.title as string, desc: s.data.short_description as string }));

  return (
    <>
      <ServiceHero lang={lang} title={allServices.find((s) => s.slug === slug)?.title || slug} tagline={data.tagline} />
      <ServiceOverview title={data.overviewTitle} paragraphs={data.overview} />
      <ServiceScope lang={lang} title={data.scopeTitle} items={data.scope} />
      <ServiceProcess lang={lang} title={data.processTitle} steps={data.process} />
      <WhyChooseService lang={lang} title={data.whyTitle} items={[]} />
      <RelatedServices lang={lang} currentSlug={slug} services={allServices} />
      <CTASection
        lang={lang}
        title={data.ctaTitle}
        description={data.ctaDesc}
        primaryBtn={data.ctaBtn}
        secondaryBtn={data.ctaBtn2}
      />
    </>
  );
}
