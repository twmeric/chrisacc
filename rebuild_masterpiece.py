#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
LTCPA CMS Masterpiece Rebuild
Reference: CWMNG & e-corp best practices
Version: 9.0 Masterpiece
"""

import os
import json

# Ensure UTF-8 encoding
import sys
sys.stdout.reconfigure(encoding='utf-8')

def create_cms_schema():
    """Create complete CMS data schema - CLEAN, no encoding issues"""
    
    schema = {
        "version": "9.0",
        "lastUpdated": "2026-04-11",
        "site": {
            "companyName": {
                "tc": "櫪韜會計師事務所有限公司",
                "en": "Lorence & Tang CPA Limited", 
                "sc": "枥韬会计师事务所有限公司"
            },
            "tagline": {
                "tc": "專業會計服務",
                "en": "Professional Accounting Services",
                "sc": "专业会计服务"
            },
            "contact": {
                "phone": "+852 3987 1008",
                "email": "info@ltgroupcpa.com",
                "whatsapp": "85239871008",
                "address": {
                    "tc": "香港金鐘道95號統一中心12樓1202室",
                    "en": "Suite 1202, 12/F, United Centre, 95 Queensway, Hong Kong",
                    "sc": "香港金钟道95号统一中心12楼1202室"
                },
                "hours": {
                    "tc": "星期一至五: 9:00 - 18:00",
                    "en": "Monday - Friday: 9:00 - 18:00",
                    "sc": "星期一至五: 9:00 - 18:00"
                }
            },
            "logo": {
                "url": "images/logo.png",
                "alt": "LTCPA Logo"
            },
            "social": {
                "whatsapp": "85239871008",
                "linkedin": "",
                "facebook": "",
                "wechat": ""
            },
            "footer": {
                "copyright": "© 2026 櫪韜會計師事務所有限公司. All Rights Reserved.",
                "description": {
                    "tc": "我們是一家擁有豐富經驗的專業會計事務所，致力於為各行各業的企業提供全面的會計、審計、稅務及商業顧問服務。",
                    "en": "We are a professional accounting firm with extensive experience, dedicated to providing comprehensive accounting, audit, tax and advisory services.",
                    "sc": "我们是一家拥有丰富经验的专业会计事务所，致力于为各行各业的企业提供全面的会计、审计、税务及商业顾问服务。"
                }
            }
        },
        "navigation": {
            "main": [
                {
                    "id": "home",
                    "url": "/",
                    "label": {"tc": "首頁", "en": "Home", "sc": "首页"}
                },
                {
                    "id": "about",
                    "url": "/about.html",
                    "label": {"tc": "關於我們", "en": "About", "sc": "关于我们"},
                    "children": [
                        {"id": "purpose", "url": "/purpose.html", "label": {"tc": "我們的宗旨", "en": "Our Purpose", "sc": "我们的宗旨"}},
                        {"id": "value", "url": "/value.html", "label": {"tc": "我們的價值", "en": "Our Values", "sc": "我们的价值"}},
                        {"id": "commitment", "url": "/commitment.html", "label": {"tc": "我們的承諾", "en": "Our Commitment", "sc": "我们的承诺"}}
                    ]
                },
                {
                    "id": "services",
                    "url": "/services.html",
                    "label": {"tc": "服務範圍", "en": "Services", "sc": "服务范围"},
                    "children": [
                        {"id": "audit", "url": "/audit.html", "label": {"tc": "審計服務", "en": "Audit", "sc": "审计服务"}},
                        {"id": "tax", "url": "/tax.html", "label": {"tc": "稅務服務", "en": "Tax", "sc": "税务服务"}},
                        {"id": "risk", "url": "/risk.html", "label": {"tc": "風險管理", "en": "Risk", "sc": "风险管理"}},
                        {"id": "forensic", "url": "/forensic.html", "label": {"tc": "法證服務", "en": "Forensic", "sc": "法证服务"}},
                        {"id": "consulting", "url": "/consulting.html", "label": {"tc": "商業顧問", "en": "Consulting", "sc": "商业顾问"}},
                        {"id": "deals", "url": "/deals.html", "label": {"tc": "企業併購", "en": "Deals", "sc": "企业并购"}}
                    ]
                },
                {
                    "id": "contact",
                    "url": "/contact.html",
                    "label": {"tc": "聯繫我們", "en": "Contact", "sc": "联系我们"}
                }
            ],
            "footer": [
                {"label": {"tc": "私隱政策", "en": "Privacy Policy", "sc": "隐私政策"}, "url": "/privacy.html"},
                {"label": {"tc": "使用條款", "en": "Terms of Use", "sc": "使用条款"}, "url": "/terms.html"}
            ]
        },
        "pages": {
            "index": {
                "tc": {
                    "meta": {
                        "title": "櫪韜會計師事務所有限公司 | 專業會計服務",
                        "description": "提供全面的審計、稅務及顧問服務，助您的業務穩健發展",
                        "keywords": "會計師, 審計, 稅務, 香港, CPA"
                    },
                    "hero": {
                        "enabled": True,
                        "title": "專業會計服務，助您業務騰飛",
                        "subtitle": "憑藉豐富經驗和專業知識，為企業提供最優質的財務解決方案",
                        "ctaText": "免費諮詢",
                        "ctaLink": "/contact.html",
                        "backgroundImage": ""
                    },
                    "services": {
                        "enabled": True,
                        "title": "我們的服務",
                        "subtitle": "從稅務策劃到企業併購，全方位支援您的商業決策",
                        "items": [
                            {"id": "audit", "icon": "fa-chart-line", "title": "審計服務", "description": "提供法定審計、內部審計及各類鑒證服務，確保財務報表的準確性和合規性。", "link": "/audit.html", "enabled": True},
                            {"id": "tax", "icon": "fa-calculator", "title": "稅務服務", "description": "專業的稅務規劃及申報服務，助您合法節稅，優化稅務結構。", "link": "/tax.html", "enabled": True},
                            {"id": "risk", "icon": "fa-shield-alt", "title": "風險管理", "description": "協助企業識別及管理風險，確保業務運營符合法規要求。", "link": "/risk.html", "enabled": True},
                            {"id": "consulting", "icon": "fa-handshake", "title": "商業顧問", "description": "從業務策略到營運優化，提供全方位的專業顧問服務。", "link": "/consulting.html", "enabled": True},
                            {"id": "forensic", "icon": "fa-search", "title": "法證服務", "description": "提供專業的調查及法證服務，協助處理商業糾紛及舞弊調查。", "link": "/forensic.html", "enabled": True},
                            {"id": "deals", "icon": "fa-building", "title": "企業併購", "description": "協助處理併購交易、盡職調查及企業估值等專業服務。", "link": "/deals.html", "enabled": True}
                        ]
                    },
                    "about": {
                        "enabled": True,
                        "title": "關於櫪韜",
                        "content": "櫪韜會計師事務所有限公司擁有經驗豐富的專業團隊，致力於為客戶提供優質的會計及顧問服務。我們以客戶為本，深入了解每位客戶的獨特需求，提供度身訂造的解決方案。",
                        "ctaText": "了解更多",
                        "ctaLink": "/about.html"
                    },
                    "cta": {
                        "enabled": True,
                        "title": "準備好提升您的業務了嗎？",
                        "description": "立即與我們的專家團隊聯繫，獲取專業建議",
                        "buttonText": "立即諮詢",
                        "buttonLink": "/contact.html"
                    }
                },
                "en": {
                    "meta": {
                        "title": "Lorence & Tang CPA Limited | Professional Accounting Services",
                        "description": "Providing comprehensive audit, tax and advisory services to help your business thrive",
                        "keywords": "accountant, audit, tax, Hong Kong, CPA"
                    },
                    "hero": {
                        "enabled": True,
                        "title": "Professional Accounting Services for Your Business Growth",
                        "subtitle": "With extensive experience and expertise, we provide the best financial solutions",
                        "ctaText": "Free Consultation",
                        "ctaLink": "/contact.html"
                    },
                    "services": {
                        "enabled": True,
                        "title": "Our Services",
                        "subtitle": "From tax planning to M&A, comprehensive support for your business",
                        "items": [
                            {"id": "audit", "icon": "fa-chart-line", "title": "Audit Services", "description": "Statutory audit, internal audit and assurance services", "link": "/audit.html", "enabled": True},
                            {"id": "tax", "icon": "fa-calculator", "title": "Tax Services", "description": "Professional tax planning and filing services", "link": "/tax.html", "enabled": True},
                            {"id": "risk", "icon": "fa-shield-alt", "title": "Risk Management", "description": "Help enterprises identify and manage risks", "link": "/risk.html", "enabled": True},
                            {"id": "consulting", "icon": "fa-handshake", "title": "Consulting", "description": "From business strategy to operational optimization", "link": "/consulting.html", "enabled": True},
                            {"id": "forensic", "icon": "fa-search", "title": "Forensic Services", "description": "Professional investigation and forensic services", "link": "/forensic.html", "enabled": True},
                            {"id": "deals", "icon": "fa-building", "title": "M&A Deals", "description": "Assisting with merger transactions and due diligence", "link": "/deals.html", "enabled": True}
                        ]
                    },
                    "about": {
                        "enabled": True,
                        "title": "About Lorence & Tang",
                        "content": "Lorence & Tang CPA Limited has an experienced professional team dedicated to providing quality accounting and advisory services.",
                        "ctaText": "Learn More",
                        "ctaLink": "/about.html"
                    },
                    "cta": {
                        "enabled": True,
                        "title": "Ready to Elevate Your Business?",
                        "description": "Contact our expert team today for professional advice",
                        "buttonText": "Contact Us",
                        "buttonLink": "/contact.html"
                    }
                },
                "sc": {
                    "meta": {
                        "title": "枥韬会计师事务所有限公司 | 专业会计服务",
                        "description": "提供全面的审计、税务及顾问服务，助您的业务稳健发展",
                        "keywords": "会计师, 审计, 税务, 香港, CPA"
                    },
                    "hero": {
                        "enabled": True,
                        "title": "专业会计服务，助您业务腾飞",
                        "subtitle": "凭借丰富经验和专业知识，为企业提供最优质的财务解决方案",
                        "ctaText": "免费咨询",
                        "ctaLink": "/contact.html"
                    },
                    "services": {
                        "enabled": True,
                        "title": "我们的服务",
                        "subtitle": "从税务策划到企业并购，全方位支持您的商业决策",
                        "items": [
                            {"id": "audit", "icon": "fa-chart-line", "title": "审计服务", "description": "提供法定审计、内部审计及各类鉴证服务", "link": "/audit.html", "enabled": True},
                            {"id": "tax", "icon": "fa-calculator", "title": "税务服务", "description": "专业的税务规划及申报服务", "link": "/tax.html", "enabled": True},
                            {"id": "risk", "icon": "fa-shield-alt", "title": "风险管理", "description": "协助企业识别及管理风险", "link": "/risk.html", "enabled": True},
                            {"id": "consulting", "icon": "fa-handshake", "title": "商业顾问", "description": "从业务策略到营运优化", "link": "/consulting.html", "enabled": True},
                            {"id": "forensic", "icon": "fa-search", "title": "法证服务", "description": "提供专业的调查及法证服务", "link": "/forensic.html", "enabled": True},
                            {"id": "deals", "icon": "fa-building", "title": "企业并购", "description": "协助处理并购交易、尽职调查", "link": "/deals.html", "enabled": True}
                        ]
                    },
                    "about": {
                        "enabled": True,
                        "title": "关于枥韬",
                        "content": "枥韬会计师事务所有限公司拥有经验丰富的专业团队，致力于为客户提供优质的会计及顾问服务。",
                        "ctaText": "了解更多",
                        "ctaLink": "/about.html"
                    },
                    "cta": {
                        "enabled": True,
                        "title": "准备好提升您的业务了吗？",
                        "description": "立即与我们的专家团队联系，获取专业建议",
                        "buttonText": "立即咨询",
                        "buttonLink": "/contact.html"
                    }
                }
            },
            "about": {
                "tc": {
                    "meta": {"title": "關於我們 | 櫪韜會計師事務所", "description": "了解櫪韜會計師事務所的歷史、使命和價值觀"},
                    "hero": {"enabled": True, "title": "關於我們"},
                    "introduction": {
                        "enabled": True,
                        "title": "公司介紹",
                        "paragraphs": [
                            "櫪韜會計師事務所有限公司擁有經驗豐富的專業團隊，致力於為客戶提供優質的會計及顧問服務。我們以客戶為本，深入了解每位客戶的獨特需求，提供度身訂造的解決方案。",
                            "憑藉多年的行業經驗，我們建立了廣泛的專業網絡，能夠為客戶提供全面的商業支援，助您在競爭激烈的市場中脫穎而出。"
                        ]
                    },
                    "mission": {
                        "enabled": True,
                        "title": "我們的使命",
                        "quote": "我們的成功建基於客戶的成功。透過專業、誠信、創新的服務理念，我們與客戶建立長期的合作關係，共同成長。",
                        "content": "我們致力於為各行各業的企業提供全面的會計、審計、稅務及商業顧問服務，協助客戶實現財務目標，推動業務持續發展。"
                    },
                    "vision": {
                        "enabled": True,
                        "title": "我們的願景",
                        "content": "成為香港最受信賴的專業會計服務提供者，協助客戶實現可持續的業務增長，並為會計行業的專業發展作出貢獻。"
                    },
                    "values": {
                        "enabled": True,
                        "title": "我們秉持的核心價值觀",
                        "subtitle": "指引著我們的每一項決策和行動",
                        "items": [
                            {"icon": "fa-award", "title": "專業卓越", "description": "持續提升專業能力，追求卓越服務品質，為客戶創造最大價值"},
                            {"icon": "fa-handshake", "title": "誠信正直", "description": "堅守職業道德，以誠信和透明的態度對待每一位客戶"},
                            {"icon": "fa-lightbulb", "title": "創新求變", "description": "擁抱變革與創新，運用最新技術和方法提升服務效率"},
                            {"icon": "fa-users", "title": "團隊協作", "description": "發揮團隊協作精神，整合專業資源，為客戶提供全方位支援"}
                        ]
                    },
                    "timeline": {
                        "enabled": True,
                        "title": "發展歷程",
                        "subtitle": "見證我們的成長與蛻變",
                        "items": [
                            {"year": "2005", "title": "成立", "description": "櫪韜會計師事務所有限公司在香港正式成立，開始為本地中小企業提供專業會計服務"},
                            {"year": "2010", "title": "擴展", "description": "成功拓展稅務諮詢及商業顧問服務，客戶數量突破100家"},
                            {"year": "2015", "title": "壯大", "description": "專業團隊增至30人，服務範圍擴展至企業併購及法證會計服務"},
                            {"year": "2018", "title": "數碼化", "description": "引入先進的數碼化系統，提升服務效率，為客戶提供更便捷的服務體驗"},
                            {"year": "2023", "title": "里程碑", "description": "服務客戶超過500家，專業團隊增至50人，繼續致力於為客戶創造價值"},
                            {"year": "2026", "title": "持續發展", "description": "持續提升服務品質，拓展國際業務，為更多企業提供優質的專業服務"}
                        ]
                    },
                    "cta": {
                        "enabled": True,
                        "title": "無論您的企業規模大小，我們都能為您提供專業、可靠的財務解決方案",
                        "buttonText": "立即聯繫我們",
                        "buttonLink": "/contact.html"
                    }
                },
                "en": {
                    "meta": {"title": "About Us | Lorence & Tang CPA Limited", "description": "Learn about our history, mission and values"},
                    "hero": {"enabled": True, "title": "About Us"},
                    "introduction": {
                        "enabled": True,
                        "title": "Company Introduction",
                        "paragraphs": [
                            "Lorence & Tang CPA Limited has an experienced professional team dedicated to providing quality accounting and advisory services. We put clients first, deeply understanding each client's unique needs.",
                            "With years of industry experience, we have built an extensive professional network to provide comprehensive business support."
                        ]
                    },
                    "mission": {
                        "enabled": True,
                        "title": "Our Mission",
                        "quote": "Our success is built on our clients' success. Through professional, honest, and innovative service, we build long-term partnerships.",
                        "content": "We are committed to providing comprehensive accounting, audit, tax and advisory services."
                    },
                    "vision": {
                        "enabled": True,
                        "title": "Our Vision",
                        "content": "To become Hong Kong's most trusted professional accounting service provider."
                    },
                    "values": {
                        "enabled": True,
                        "title": "Our Core Values",
                        "subtitle": "Guiding every decision we make",
                        "items": [
                            {"icon": "fa-award", "title": "Professional Excellence", "description": "Continuously improving professional capabilities"},
                            {"icon": "fa-handshake", "title": "Integrity", "description": "Upholding professional ethics with honesty"},
                            {"icon": "fa-lightbulb", "title": "Innovation", "description": "Embracing change and innovation"},
                            {"icon": "fa-users", "title": "Teamwork", "description": "Collaborating to provide comprehensive support"}
                        ]
                    },
                    "timeline": {
                        "enabled": True,
                        "title": "Our History",
                        "subtitle": "Witness our growth and transformation",
                        "items": [
                            {"year": "2005", "title": "Founded", "description": "Lorence & Tang CPA Limited was established in Hong Kong"},
                            {"year": "2010", "title": "Expansion", "description": "Successfully expanded tax advisory and business consulting services"},
                            {"year": "2015", "title": "Growth", "description": "Professional team grew to 30 people"},
                            {"year": "2018", "title": "Digitalization", "description": "Introduced advanced digital systems"},
                            {"year": "2023", "title": "Milestone", "description": "Serving over 500 clients with 50 professionals"},
                            {"year": "2026", "title": "Continuous Development", "description": "Continuing to enhance service quality"}
                        ]
                    },
                    "cta": {
                        "enabled": True,
                        "title": "Whatever your business size, we can provide professional financial solutions",
                        "buttonText": "Contact Us",
                        "buttonLink": "/contact.html"
                    }
                },
                "sc": {
                    "meta": {"title": "关于我们 | 枥韬会计师事务所", "description": "了解枥韬会计师事务所的历史、使命和价值观"},
                    "hero": {"enabled": True, "title": "关于我们"},
                    "introduction": {
                        "enabled": True,
                        "title": "公司介绍",
                        "paragraphs": [
                            "枥韬会计师事务所有限公司拥有经验丰富的专业团队，致力于为客户提供优质的会计及顾问服务。我们以客户为本，深入了解每位客户的独特需求。",
                            "凭借多年的行业经验，我们建立了广泛的专业网络，能够为客户提供全面的商业支持。"
                        ]
                    },
                    "mission": {
                        "enabled": True,
                        "title": "我们的使命",
                        "quote": "我们的成功建立在客户的成功之上。透过专业、诚信、创新的服务理念，我们与客户建立长期的合作关系。",
                        "content": "我们致力于为各行各业的企业提供全面的会计、审计、税务及商业顾问服务。"
                    },
                    "vision": {
                        "enabled": True,
                        "title": "我们的愿景",
                        "content": "成为香港最受信赖的专业会计服务提供者。"
                    },
                    "values": {
                        "enabled": True,
                        "title": "我们秉持的核心价值观",
                        "subtitle": "指引着我们的每一项决策和行动",
                        "items": [
                            {"icon": "fa-award", "title": "专业卓越", "description": "持续提升专业能力"},
                            {"icon": "fa-handshake", "title": "诚信正直", "description": "坚守职业道德"},
                            {"icon": "fa-lightbulb", "title": "创新求变", "description": "拥抱变革与创新"},
                            {"icon": "fa-users", "title": "团队协作", "description": "发挥团队协作精神"}
                        ]
                    },
                    "timeline": {
                        "enabled": True,
                        "title": "发展历程",
                        "subtitle": "见证我们的成长与蜕变",
                        "items": [
                            {"year": "2005", "title": "成立", "description": "枥韬会计师事务所有限公司在香港正式成立"},
                            {"year": "2010", "title": "扩展", "description": "成功拓展税务咨询及商业顾问服务"},
                            {"year": "2015", "title": "壮大", "description": "专业团队增至30人"},
                            {"year": "2018", "title": "数字化", "description": "引入先进的数字化系统"},
                            {"year": "2023", "title": "里程碑", "description": "服务客户超过500家"},
                            {"year": "2026", "title": "持续发展", "description": "继续提升服务质量"}
                        ]
                    },
                    "cta": {
                        "enabled": True,
                        "title": "无论您的企业规模大小，我们都能为您提供专业、可靠的财务解决方案",
                        "buttonText": "立即联系我们",
                        "buttonLink": "/contact.html"
                    }
                }
            },
            "services": {
                "tc": {
                    "meta": {"title": "服務範圍 | 櫪韜會計師事務所", "description": "全方位的專業服務，滿足您不同的業務需求"},
                    "hero": {"enabled": True, "title": "服務範圍", "description": "全方位的專業服務，滿足您不同的業務需求"},
                    "services": {
                        "enabled": True,
                        "items": [
                            {"id": "audit", "title": "審計與鑑證", "shortDesc": "為資本市場注入信心", "link": "/audit.html"},
                            {"id": "tax", "title": "稅務諮詢", "shortDesc": "優化效率，傳承保護", "link": "/tax.html"},
                            {"id": "risk", "title": "風險與監管", "shortDesc": "從被動合規到策略韌性", "link": "/risk.html"},
                            {"id": "forensic", "title": "法證服務", "shortDesc": "守護誠信與價值", "link": "/forensic.html"},
                            {"id": "consulting", "title": "企業諮詢", "shortDesc": "驅動轉型與績效", "link": "/consulting.html"},
                            {"id": "deals", "title": "併購交易", "shortDesc": "在交易每個階段釋放價值", "link": "/deals.html"}
                        ]
                    },
                    "whyChooseUs": {
                        "enabled": True,
                        "title": "為何選擇 LT CPA",
                        "description": "我們擁有經驗豐富的專業團隊，致力於為客戶提供最優質的服務",
                        "items": [
                            {"icon": "fa-globe", "title": "國際視野", "description": "精通多個司法管轄區的會計準則和稅法，為跨境業務提供無縫服務"},
                            {"icon": "fa-user-tie", "title": "資深團隊", "description": "每個項目由資深合夥人親自督導，確保服務品質和策略一致性"},
                            {"icon": "fa-cogs", "title": "創新方案", "description": "運用最新技術和方法論，為客戶量身定制前瞻性解決方案"},
                            {"icon": "fa-bolt", "title": "敏捷響應", "description": "精品規模帶來敏捷優勢，快速響應市場變化和客戶需求"}
                        ]
                    },
                    "cta": {
                        "enabled": True,
                        "title": "需要專業的財務建議？",
                        "description": "我們的專家團隊隨時為您提供支援",
                        "buttonText": "立即諮詢",
                        "buttonLink": "/contact.html"
                    }
                },
                "en": {
                    "meta": {"title": "Our Services | Lorence & Tang CPA Limited", "description": "Comprehensive professional services"},
                    "hero": {"enabled": True, "title": "Our Services", "description": "Comprehensive professional services"},
                    "services": {
                        "enabled": True,
                        "items": [
                            {"id": "audit", "title": "Audit & Assurance", "shortDesc": "Instilling confidence in capital markets", "link": "/audit.html"},
                            {"id": "tax", "title": "Tax Advisory", "shortDesc": "Optimizing efficiency, protecting heritage", "link": "/tax.html"},
                            {"id": "risk", "title": "Risk & Regulatory", "shortDesc": "From compliance to strategic resilience", "link": "/risk.html"},
                            {"id": "forensic", "title": "Forensic Services", "shortDesc": "Safeguarding integrity and value", "link": "/forensic.html"},
                            {"id": "consulting", "title": "Consulting", "shortDesc": "Driving transformation and performance", "link": "/consulting.html"},
                            {"id": "deals", "title": "M&A Deals", "shortDesc": "Unlocking value at every stage", "link": "/deals.html"}
                        ]
                    },
                    "whyChooseUs": {
                        "enabled": True,
                        "title": "Why Choose LT CPA",
                        "description": "We have an experienced professional team",
                        "items": [
                            {"icon": "fa-globe", "title": "Global Vision", "description": "Expert in accounting standards across jurisdictions"},
                            {"icon": "fa-user-tie", "title": "Senior Team", "description": "Each project supervised by senior partners"},
                            {"icon": "fa-cogs", "title": "Innovative Solutions", "description": "Using latest technology and methodologies"},
                            {"icon": "fa-bolt", "title": "Agile Response", "description": "Boutique size brings agile advantages"}
                        ]
                    },
                    "cta": {
                        "enabled": True,
                        "title": "Need professional financial advice?",
                        "description": "Our expert team is ready to support you",
                        "buttonText": "Contact Us",
                        "buttonLink": "/contact.html"
                    }
                },
                "sc": {
                    "meta": {"title": "服务范围 | 枥韬会计师事务所", "description": "全方位的专业服务"},
                    "hero": {"enabled": True, "title": "服务范围", "description": "全方位的专业服务，满足您不同的业务需求"},
                    "services": {
                        "enabled": True,
                        "items": [
                            {"id": "audit", "title": "审计与鉴证", "shortDesc": "为资本市场注入信心", "link": "/audit.html"},
                            {"id": "tax", "title": "税务咨询", "shortDesc": "优化效率，传承保护", "link": "/tax.html"},
                            {"id": "risk", "title": "风险与监管", "shortDesc": "从被动合规到策略韧性", "link": "/risk.html"},
                            {"id": "forensic", "title": "法证服务", "shortDesc": "守护诚信与价值", "link": "/forensic.html"},
                            {"id": "consulting", "title": "企业咨询", "shortDesc": "驱动转型与绩效", "link": "/consulting.html"},
                            {"id": "deals", "title": "并购交易", "shortDesc": "在交易每个阶段释放价值", "link": "/deals.html"}
                        ]
                    },
                    "whyChooseUs": {
                        "enabled": True,
                        "title": "为何选择 LT CPA",
                        "description": "我们拥有经验丰富的专业团队",
                        "items": [
                            {"icon": "fa-globe", "title": "国际视野", "description": "精通多个司法管辖区的会计准则和税法"},
                            {"icon": "fa-user-tie", "title": "资深团队", "description": "每个项目由资深合伙人亲自督导"},
                            {"icon": "fa-cogs", "title": "创新方案", "description": "运用最新技术和方法论"},
                            {"icon": "fa-bolt", "title": "敏捷响应", "description": "精品规模带来敏捷优势"}
                        ]
                    },
                    "cta": {
                        "enabled": True,
                        "title": "需要专业的财务建议？",
                        "description": "我们的专家团队随时为您提供支持",
                        "buttonText": "立即咨询",
                        "buttonLink": "/contact.html"
                    }
                }
            }
        },
        "whatsappLeads": {
            "enabled": True,
            "config": {
                "apiToken": "",
                "phoneNumberId": "",
                "defaultMessage": "您好，我剛剛在您的網站留下了聯繫資訊，請與我聯繫。"
            }
        }
    }
    
    return schema

def save_cms_schema():
    """Save CMS schema to file"""
    schema = create_cms_schema()
    
    os.makedirs('data', exist_ok=True)
    
    with open('data/cms-masterpiece-v9.json', 'w', encoding='utf-8') as f:
        json.dump(schema, f, ensure_ascii=False, indent=2)
    
    print("[OK] CMS Masterpiece Schema V9 created")
    print(f"[INFO] Total pages: {len(schema['pages'])}")
    print(f"[INFO] Languages: TC, EN, SC")
    print(f"[INFO] Site sections: {len(schema['site'])}")

if __name__ == "__main__":
    save_cms_schema()
