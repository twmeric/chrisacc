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

const serviceData: Record<Locale, Record<string, { tagline: string; overviewTitle: string; overview: string[]; scopeTitle: string; scope: { title: string; desc: string; points: string[] }[]; processTitle: string; process: { number: string; title: string; desc: string }[]; whyTitle: string; ctaTitle: string; ctaDesc: string; ctaBtn: string; ctaBtn2: string }>> = {
  "zh-hant": {
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
        { title: "策略規劃", desc: "Strategic Planning", points: ["業務發展策略", "市場進入策略", "企業重組及轉型顧問"] },
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
        { title: "估值服務", desc: "Valuation Services", points: ["企業價值評估", "無形資產估值", "購股權估值"] },
        { title: "交易支援", desc: "Transaction Support", points: ["交易架構設計建議", "買賣協議財務條款審閱", "交割後整合支援"] },
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
  },
  "zh-hans": {
    audit: {
      tagline: "为资本市场注入信心。",
      overviewTitle: "专业审计，值得信赖",
      overview: [
        "在当今复杂的商业环境中，财务报表的准确性和可靠性对于维护投资者信心、满足监管要求以及支持企业决策至关重要。枥韬会计师事务所有限公司提供全方位的审计及鉴证服务，协助企业确保财务资讯的真实性和公允性。",
        "我们的审计团队由经验丰富的注册会计师组成，深谙香港及国际审计准则，能够为各行各业的客户提供高质素的审计服务。无论是法定审计、内部审计，还是特殊目的审计，我们都能根据您的具体需求，制定最合适的审计方案。",
      ],
      scopeTitle: "服务范围",
      scope: [
        { title: "法定及非法定审计", desc: "Statutory & Non-Statutory Audit", points: ["按照香港审计准则执行法定审计", "特别目的审计及尽职调查", "内部控制审阅及建议"] },
        { title: "资本市场交易", desc: "Capital Market Transactions", points: ["首次公开招股（IPO）审计", "并购尽职调查", "财务尽职调查报告"] },
        { title: "合规及风险", desc: "Compliance & Risk", points: ["监管合规审查", "风险评估及管理建议", "企业管治咨询"] },
      ],
      processTitle: "审计流程",
      process: [
        { number: "1", title: "规划与风险评估", desc: "深入了解您的业务、行业环境及内部控制，识别重大风险领域。" },
        { number: "2", title: "实质性测试", desc: "对财务报表各科目进行详细测试，收集充分适当的审计证据。" },
        { number: "3", title: "分析与评价", desc: "综合分析审计结果，评价财务报表是否在所有重大方面公允列报。" },
        { number: "4", title: "报告与跟进", desc: "出具审计报告，并就发现的问题提出改进建议，协助企业持续优化。" },
      ],
      whyTitle: "为何选择 LT CPA 审计服务",
      ctaTitle: "需要专业审计服务？",
      ctaDesc: "让我们的专家团队为您提供高质量的审计解决方案",
      ctaBtn: "免费咨询",
      ctaBtn2: "查看所有服务",
    },
    tax: {
      tagline: "合法节税，合规经营。",
      overviewTitle: "专业税务咨询，助您合法节税",
      overview: [
        "税务规划是企业财务管理的重要一环。合理的税务安排不仅能够有效降低企业税负，更能确保企业在复杂多变的税务法规环境中合法合规经营。枥韬会计师事务所有限公司提供全面的税务咨询及规划服务，协助客户实现税务效益最大化。",
        "我们的税务团队紧贴最新的税务法规变化，拥有丰富的本地及跨境税务经验。无论是香港利得税、薪俸税、物业税，还是国际税务安排、转让定价等，我们都能为您提供专业意见和切实可行的解决方案。",
      ],
      scopeTitle: "服务范围",
      scope: [
        { title: "企业税务", desc: "Corporate Tax", points: ["利得税报税及规划", "税务尽职调查", "税务争议解决"] },
        { title: "个人税务", desc: "Personal Tax", points: ["薪俸税及物业税申报", "个人税务规划", "离岸税务咨询"] },
        { title: "国际税务", desc: "International Tax", points: ["跨境税务安排", "转让定价文件准备", "双重征税协定应用"] },
      ],
      processTitle: "税务服务流程",
      process: [
        { number: "1", title: "税务诊断", desc: "全面分析企业现行税务状况，识别潜在风险及节税机会。" },
        { number: "2", title: "方案设计", desc: "根据企业实际情况，设计合法合规的税务优化方案。" },
        { number: "3", title: "实施执行", desc: "协助企业落实税务方案，处理相关申报及备案手续。" },
        { number: "4", title: "持续跟进", desc: "定期检讨税务安排，确保符合最新法规要求。" },
      ],
      whyTitle: "为何选择 LT CPA 税务服务",
      ctaTitle: "需要专业税务咨询？",
      ctaDesc: "让我们的税务专家为您制定最佳的税务策略",
      ctaBtn: "免费咨询",
      ctaBtn2: "查看所有服务",
    },
    risk: {
      tagline: "识别风险，把握机遇。",
      overviewTitle: "风险管理与合规顾问",
      overview: [
        "在瞬息万变的商业环境中，企业面临的风险日益复杂多样。有效的风险管理和合规体系不仅能够保护企业资产和声誉，更能为企业创造竞争优势。枥韬会计师事务所有限公司提供专业的风险及合规顾问服务，协助企业建立稳健的风险管理框架。",
        "我们的专业团队具备丰富的企业风险评估、内部控制审阅及监管合规经验。我们会因应客户的行业特性和业务规模，度身设计合适的风险管理方案，协助企业在合规的基础上稳健发展。",
      ],
      scopeTitle: "服务范围",
      scope: [
        { title: "企业风险评估", desc: "Enterprise Risk Assessment", points: ["全面风险识别及评估", "风险管理策略制定", "风险监控及报告机制"] },
        { title: "内部控制审阅", desc: "Internal Control Review", points: ["内部控制系统评估", "营运流程优化建议", "舞弊风险评估"] },
        { title: "监管合规", desc: "Regulatory Compliance", points: ["法规遵循审查", "合规培训及政策制定", "监管报告支援"] },
      ],
      processTitle: "风险管理流程",
      process: [
        { number: "1", title: "风险识别", desc: "全面了解企业营运环境，系统性识别各类潜在风险。" },
        { number: "2", title: "风险评估", desc: "分析风险发生的可能性及影响程度，厘定风险优先次序。" },
        { number: "3", title: "应对设计", desc: "制定针对性的风险应对策略及内部控制措施。" },
        { number: "4", title: "监察改进", desc: "持续监察风险状况，定期检讨及优化风险管理体系。" },
      ],
      whyTitle: "为何选择 LT CPA 风险服务",
      ctaTitle: "需要专业风险管理顾问？",
      ctaDesc: "让我们协助您建立稳健的风险管理及合规体系",
      ctaBtn: "免费咨询",
      ctaBtn2: "查看所有服务",
    },
    forensic: {
      tagline: "揭示真相，捍卫正义。",
      overviewTitle: "法证会计及调查服务",
      overview: [
        "当企业怀疑存在舞弊、财务欺诈或商业纠纷时，及时、专业的法证会计调查能够揭示事实真相，为企业挽回损失并提供法律支援。枥韬会计师事务所有限公司的法证会计团队具备专业的调查技能和丰富的实战经验，能够协助客户处理各类复杂的财务纠纷和舞弊案件。",
        "我们运用先进的数据分析技术和严谨的调查方法，从海量财务资料中抽丝剥茧，找出关键证据。无论是内部舞弊调查、诉讼支援，还是资产追踪，我们都能为客户提供独立、客观的专业意见。",
      ],
      scopeTitle: "服务范围",
      scope: [
        { title: "舞弊调查", desc: "Fraud Investigation", points: ["内部舞弊及贪污调查", "财务报表欺诈分析", "举报热线及调查服务"] },
        { title: "诉讼支援", desc: "Litigation Support", points: ["商业纠纷损失评估", "专家证人服务", "仲裁及调解支援"] },
        { title: "资产追踪", desc: "Asset Tracing", points: ["隐藏资产调查", "资金流向分析", "破产及清盘调查"] },
      ],
      processTitle: "法证调查流程",
      process: [
        { number: "1", title: "初步评估", desc: "了解案件背景，评估调查范围及所需资源。" },
        { number: "2", title: "资料搜集", desc: "系统性搜集及保存相关财务资料和电子证据。" },
        { number: "3", title: "深入分析", desc: "运用专业技术分析数据，识别异常交易及关键证据。" },
        { number: "4", title: "报告及建议", desc: "撰写详尽调查报告，并就后续行动提供专业建议。" },
      ],
      whyTitle: "为何选择 LT CPA 法证服务",
      ctaTitle: "需要专业法证会计服务？",
      ctaDesc: "让我们的专家团队协助您揭示真相，捍卫权益",
      ctaBtn: "免费咨询",
      ctaBtn2: "查看所有服务",
    },
    consulting: {
      tagline: "助力企业成长，共创商业价值。",
      overviewTitle: "商业咨询顾问服务",
      overview: [
        "在竞争激烈的商业环境中，企业需要专业的顾问服务来把握机遇、应对挑战。枥韬会计师事务所有限公司提供全面的商业咨询服务，从财务管理、营运优化到策略规划，协助企业提升竞争力，实现可持续发展。",
        "我们的商业顾问团队拥有丰富的跨行业经验，能够深入了解客户的业务模式和发展目标，提供切实可行且具前瞻性的建议。无论是初创企业还是成熟公司，我们都能成为您值得信赖的商业伙伴。",
      ],
      scopeTitle: "服务范围",
      scope: [
        { title: "财务管理顾问", desc: "Financial Advisory", points: ["财务分析及绩效评估", "现金流管理及预算规划", "融资策略及资本结构优化"] },
        { title: "营运改善", desc: "Operational Improvement", points: ["营运流程优化", "成本管理及控制", "供应链管理顾问"] },
        { title: "策略规划", desc: "Strategic Planning", points: ["业务发展策略", "市场进入策略", "企业重组及转型顾问"] },
      ],
      processTitle: "咨询服务流程",
      process: [
        { number: "1", title: "现况诊断", desc: "深入了解企业现况，识别问题根源及改善机会。" },
        { number: "2", title: "策略制定", desc: "根据企业目标及市场环境，制定切实可行的发展策略。" },
        { number: "3", title: "方案实施", desc: "协助企业落实改善方案，提供必要的培训及支援。" },
        { number: "4", title: "成效评估", desc: "持续追踪实施成效，确保达成预期目标。" },
      ],
      whyTitle: "为何选择 LT CPA 商业咨询",
      ctaTitle: "需要专业商业顾问？",
      ctaDesc: "让我们成为您企业成长路上的专业伙伴",
      ctaBtn: "免费咨询",
      ctaBtn2: "查看所有服务",
    },
    deals: {
      tagline: "专业尽职调查，降低交易风险。",
      overviewTitle: "并购及交易顾问服务",
      overview: [
        "并购交易涉及大量复杂的财务、法律及商业风险。专业的尽职调查和交易顾问服务能够帮助投资者全面了解目标公司的真实状况，识别潜在风险，从而做出明智的投资决策。枥韬会计师事务所有限公司提供专业的并购顾问服务，为您的交易保驾护航。",
        "我们的并购团队拥有丰富的本地及跨境交易经验，能够为买方和卖方提供独立、客观的专业意见。从财务尽职调查、估值分析到交易结构设计，我们都能为您提供全方位的支援。",
      ],
      scopeTitle: "服务范围",
      scope: [
        { title: "财务尽职调查", desc: "Financial Due Diligence", points: ["目标公司财务状况分析", "盈利质量评估", "资产负债及或然负债审阅"] },
        { title: "估值服务", desc: "Valuation Services", points: ["企业价值评估", "无形资产估值", "购股权估值"] },
        { title: "交易支援", desc: "Transaction Support", points: ["交易架构设计建议", "买卖协议财务条款审阅", "交割后整合支援"] },
      ],
      processTitle: "并购顾问流程",
      process: [
        { number: "1", title: "初步了解", desc: "与客户沟通交易背景及关注事项，确定尽职调查范围。" },
        { number: "2", title: "资料审阅", desc: "详细审阅目标公司财务资料，进行管理层访谈及现场考察。" },
        { number: "3", title: "分析评估", desc: "识别关键财务问题及交易风险，评估对交易价格的影响。" },
        { number: "4", title: "报告及谈判", desc: "出具尽职调查报告，并协助客户进行交易谈判及条款修订。" },
      ],
      whyTitle: "为何选择 LT CPA 并购服务",
      ctaTitle: "需要专业并购顾问？",
      ctaDesc: "让我们的专家团队为您的交易提供全方位的专业支援",
      ctaBtn: "免费咨询",
      ctaBtn2: "查看所有服务",
    },
  },
  "en": {
    audit: {
      tagline: "Injecting confidence into the capital markets.",
      overviewTitle: "Professional Audit You Can Trust",
      overview: [
        "In today's complex business environment, the accuracy and reliability of financial statements are vital to maintaining investor confidence, meeting regulatory requirements, and supporting corporate decisions. LT CPA Limited provides comprehensive audit and assurance services to help enterprises ensure the truth and fairness of financial information.",
        "Our audit team comprises experienced certified public accountants who are well-versed in Hong Kong and international auditing standards, capable of delivering high-quality audit services to clients across various industries. Whether statutory audit, internal audit, or special-purpose audit, we tailor the most suitable audit plan to your specific needs.",
      ],
      scopeTitle: "Service Scope",
      scope: [
        { title: "Statutory & Non-Statutory Audit", desc: "Statutory & Non-Statutory Audit", points: ["Statutory audits in accordance with HKSA", "Special-purpose audits and due diligence", "Internal control review and recommendations"] },
        { title: "Capital Market Transactions", desc: "Capital Market Transactions", points: ["IPO audit", "M&A due diligence", "Financial due diligence reports"] },
        { title: "Compliance & Risk", desc: "Compliance & Risk", points: ["Regulatory compliance review", "Risk assessment and management advice", "Corporate governance advisory"] },
      ],
      processTitle: "Audit Process",
      process: [
        { number: "1", title: "Planning & Risk Assessment", desc: "Gain an in-depth understanding of your business, industry environment, and internal controls to identify significant risk areas." },
        { number: "2", title: "Substantive Testing", desc: "Conduct detailed testing of financial statement items and gather sufficient appropriate audit evidence." },
        { number: "3", title: "Analysis & Evaluation", desc: "Synthesize audit findings and evaluate whether financial statements are fairly presented in all material respects." },
        { number: "4", title: "Reporting & Follow-up", desc: "Issue the audit report and provide improvement recommendations to help enterprises continuously optimize." },
      ],
      whyTitle: "Why Choose LT CPA Audit Services",
      ctaTitle: "Need Professional Audit Services?",
      ctaDesc: "Let our expert team provide you with high-quality audit solutions",
      ctaBtn: "Free Consultation",
      ctaBtn2: "View All Services",
    },
    tax: {
      tagline: "Tax savings through legal compliance.",
      overviewTitle: "Professional Tax Advisory for Legal Tax Savings",
      overview: [
        "Tax planning is a crucial part of corporate financial management. A reasonable tax arrangement not only effectively reduces corporate tax burden but also ensures legal and compliant operations amid complex and ever-changing tax regulations. LT CPA Limited provides comprehensive tax advisory and planning services to help clients maximize tax efficiency.",
        "Our tax team keeps abreast of the latest tax regulation changes and has extensive local and cross-border tax experience. Whether it is Hong Kong profits tax, salaries tax, property tax, or international tax arrangements and transfer pricing, we can provide professional advice and practical solutions.",
      ],
      scopeTitle: "Service Scope",
      scope: [
        { title: "Corporate Tax", desc: "Corporate Tax", points: ["Profits tax filing and planning", "Tax due diligence", "Tax dispute resolution"] },
        { title: "Personal Tax", desc: "Personal Tax", points: ["Salaries tax and property tax filing", "Personal tax planning", "Offshore tax advisory"] },
        { title: "International Tax", desc: "International Tax", points: ["Cross-border tax arrangements", "Transfer pricing documentation", "Double taxation treaty application"] },
      ],
      processTitle: "Tax Service Process",
      process: [
        { number: "1", title: "Tax Diagnosis", desc: "Comprehensively analyze the current tax status of the enterprise to identify potential risks and tax-saving opportunities." },
        { number: "2", title: "Solution Design", desc: "Design legal and compliant tax optimization solutions based on the actual situation of the enterprise." },
        { number: "3", title: "Implementation", desc: "Assist the enterprise in implementing tax solutions and handle related filings and record-filing procedures." },
        { number: "4", title: "Ongoing Follow-up", desc: "Regularly review tax arrangements to ensure compliance with the latest regulatory requirements." },
      ],
      whyTitle: "Why Choose LT CPA Tax Services",
      ctaTitle: "Need Professional Tax Advisory?",
      ctaDesc: "Let our tax experts formulate the best tax strategy for you",
      ctaBtn: "Free Consultation",
      ctaBtn2: "View All Services",
    },
    risk: {
      tagline: "Identifying risks, seizing opportunities.",
      overviewTitle: "Risk Management & Compliance Advisory",
      overview: [
        "In a rapidly changing business environment, enterprises face increasingly complex and diverse risks. Effective risk management and compliance systems not only protect corporate assets and reputation but also create competitive advantages. LT CPA Limited provides professional risk and compliance advisory services to help enterprises establish robust risk management frameworks.",
        "Our professional team has extensive experience in enterprise risk assessment, internal control review, and regulatory compliance. We design suitable risk management solutions tailored to the client's industry characteristics and business scale, assisting enterprises to develop steadily on a compliant basis.",
      ],
      scopeTitle: "Service Scope",
      scope: [
        { title: "Enterprise Risk Assessment", desc: "Enterprise Risk Assessment", points: ["Comprehensive risk identification and assessment", "Risk management strategy formulation", "Risk monitoring and reporting mechanism"] },
        { title: "Internal Control Review", desc: "Internal Control Review", points: ["Internal control system evaluation", "Operational process optimization advice", "Fraud risk assessment"] },
        { title: "Regulatory Compliance", desc: "Regulatory Compliance", points: ["Regulatory compliance review", "Compliance training and policy formulation", "Regulatory reporting support"] },
      ],
      processTitle: "Risk Management Process",
      process: [
        { number: "1", title: "Risk Identification", desc: "Gain a comprehensive understanding of the enterprise operating environment and systematically identify various potential risks." },
        { number: "2", title: "Risk Assessment", desc: "Analyze the likelihood and impact of risks to determine risk priorities." },
        { number: "3", title: "Response Design", desc: "Develop targeted risk response strategies and internal control measures." },
        { number: "4", title: "Monitoring & Improvement", desc: "Continuously monitor risk status and regularly review and optimize the risk management system." },
      ],
      whyTitle: "Why Choose LT CPA Risk Services",
      ctaTitle: "Need Professional Risk Management Advisory?",
      ctaDesc: "Let us help you establish a robust risk management and compliance system",
      ctaBtn: "Free Consultation",
      ctaBtn2: "View All Services",
    },
    forensic: {
      tagline: "Revealing the truth, defending justice.",
      overviewTitle: "Forensic Accounting & Investigation Services",
      overview: [
        "When an enterprise suspects fraud, financial deception, or commercial disputes, timely and professional forensic accounting investigations can reveal the truth, help the enterprise recover losses, and provide legal support. LT CPA Limited's forensic accounting team possesses professional investigative skills and extensive practical experience, capable of assisting clients in handling various complex financial disputes and fraud cases.",
        "We use advanced data analysis techniques and rigorous investigation methods to sift through massive amounts of financial data, identify key evidence. Whether internal fraud investigation, litigation support, or asset tracing, we provide clients with independent and objective professional opinions.",
      ],
      scopeTitle: "Service Scope",
      scope: [
        { title: "Fraud Investigation", desc: "Fraud Investigation", points: ["Internal fraud and corruption investigation", "Financial statement fraud analysis", "Whistleblower hotline and investigation services"] },
        { title: "Litigation Support", desc: "Litigation Support", points: ["Commercial dispute loss assessment", "Expert witness services", "Arbitration and mediation support"] },
        { title: "Asset Tracing", desc: "Asset Tracing", points: ["Hidden asset investigation", "Fund flow analysis", "Bankruptcy and liquidation investigation"] },
      ],
      processTitle: "Forensic Investigation Process",
      process: [
        { number: "1", title: "Initial Assessment", desc: "Understand the case background and assess the investigation scope and required resources." },
        { number: "2", title: "Data Collection", desc: "Systematically collect and preserve relevant financial data and electronic evidence." },
        { number: "3", title: "In-depth Analysis", desc: "Use professional techniques to analyze data and identify anomalous transactions and key evidence." },
        { number: "4", title: "Reporting & Recommendations", desc: "Write a detailed investigation report and provide professional advice on subsequent actions." },
      ],
      whyTitle: "Why Choose LT CPA Forensic Services",
      ctaTitle: "Need Professional Forensic Accounting Services?",
      ctaDesc: "Let our expert team help you reveal the truth and defend your rights",
      ctaBtn: "Free Consultation",
      ctaBtn2: "View All Services",
    },
    consulting: {
      tagline: "Empowering business growth, creating commercial value.",
      overviewTitle: "Business Advisory Services",
      overview: [
        "In a highly competitive business environment, enterprises need professional advisory services to seize opportunities and meet challenges. LT CPA Limited provides comprehensive business advisory services, from financial management and operational optimization to strategic planning, helping enterprises enhance competitiveness and achieve sustainable development.",
        "Our business advisory team has extensive cross-industry experience, capable of deeply understanding clients' business models and development goals, providing practical and forward-looking advice. Whether a startup or an established company, we can be your trusted business partner.",
      ],
      scopeTitle: "Service Scope",
      scope: [
        { title: "Financial Management Advisory", desc: "Financial Advisory", points: ["Financial analysis and performance evaluation", "Cash flow management and budget planning", "Financing strategy and capital structure optimization"] },
        { title: "Operational Improvement", desc: "Operational Improvement", points: ["Operational process optimization", "Cost management and control", "Supply chain management advisory"] },
        { title: "Strategic Planning", desc: "Strategic Planning", points: ["Business development strategy", "Market entry strategy", "Corporate restructuring and transformation advisory"] },
      ],
      processTitle: "Advisory Process",
      process: [
        { number: "1", title: "Current State Diagnosis", desc: "Gain an in-depth understanding of the enterprise's current state, identify root causes of problems and improvement opportunities." },
        { number: "2", title: "Strategy Formulation", desc: "Formulate practical and feasible development strategies based on enterprise goals and market environment." },
        { number: "3", title: "Solution Implementation", desc: "Assist the enterprise in implementing improvement solutions and provide necessary training and support." },
        { number: "4", title: "Performance Evaluation", desc: "Continuously track implementation effectiveness to ensure expected goals are achieved." },
      ],
      whyTitle: "Why Choose LT CPA Business Advisory",
      ctaTitle: "Need Professional Business Advisory?",
      ctaDesc: "Let us become your professional partner on the path to business growth",
      ctaBtn: "Free Consultation",
      ctaBtn2: "View All Services",
    },
    deals: {
      tagline: "Professional due diligence, reducing transaction risks.",
      overviewTitle: "M&A and Transaction Advisory Services",
      overview: [
        "M&A transactions involve a large number of complex financial, legal, and commercial risks. Professional due diligence and transaction advisory services can help investors fully understand the true status of the target company, identify potential risks, and thus make wise investment decisions. LT CPA Limited provides professional M&A advisory services to safeguard your transactions.",
        "Our M&A team has extensive local and cross-border transaction experience, capable of providing independent and objective professional opinions to both buyers and sellers. From financial due diligence and valuation analysis to transaction structure design, we provide comprehensive support.",
      ],
      scopeTitle: "Service Scope",
      scope: [
        { title: "Financial Due Diligence", desc: "Financial Due Diligence", points: ["Target company financial status analysis", "Earnings quality assessment", "Asset, liability, and contingent liability review"] },
        { title: "Valuation Services", desc: "Valuation Services", points: ["Enterprise value assessment", "Intangible asset valuation", "Share option valuation"] },
        { title: "Transaction Support", desc: "Transaction Support", points: ["Transaction structure design advice", "Review of financial clauses in sale and purchase agreements", "Post-closing integration support"] },
      ],
      processTitle: "M&A Advisory Process",
      process: [
        { number: "1", title: "Initial Understanding", desc: "Communicate with the client on transaction background and concerns to determine the due diligence scope." },
        { number: "2", title: "Data Review", desc: "Review target company financial data in detail, conduct management interviews, and on-site inspections." },
        { number: "3", title: "Analysis & Evaluation", desc: "Identify key financial issues and transaction risks, and assess their impact on transaction price." },
        { number: "4", title: "Reporting & Negotiation", desc: "Issue the due diligence report and assist the client in transaction negotiation and clause revision." },
      ],
      whyTitle: "Why Choose LT CPA M&A Services",
      ctaTitle: "Need Professional M&A Advisory?",
      ctaDesc: "Let our expert team provide comprehensive professional support for your transaction",
      ctaBtn: "Free Consultation",
      ctaBtn2: "View All Services",
    },
  },
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { lang, slug } = await params;
  const data = serviceData[lang]?.[slug];
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
