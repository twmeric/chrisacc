/**
 * LTCPA CMS Frontend Engine V9
 * Reference: CWMNG & e-corp best practices
 * Features: Multi-language, CMS rendering, WhatsApp integration, Analytics
 */

// Configuration
const API_BASE_URL = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:8787'
    : 'https://ltcpa-cms-worker.jimsbond007.workers.dev';

// Global cache
let cmsCache = null;
let currentLang = 'tc';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initLanguage();
    fetchCMSData();
    initMobileMenu();
    initSmoothScroll();
    trackPageView();
});

/* ========================================
   Language Management
   ======================================== */
function initLanguage() {
    const savedLang = localStorage.getItem('ltcpa_lang') || 'tc';
    currentLang = savedLang;
    document.documentElement.lang = savedLang === 'tc' ? 'zh-Hant' : savedLang === 'sc' ? 'zh-Hans' : 'en';
    updateLanguageSwitcher();
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('ltcpa_lang', lang);
    document.documentElement.lang = lang === 'tc' ? 'zh-Hant' : lang === 'sc' ? 'zh-Hans' : 'en';
    updateLanguageSwitcher();
    
    // Reload page with new language
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const baseName = currentPage.replace(/-(en|sc)\.html$/, '.html');
    const newPage = lang === 'tc' ? baseName : baseName.replace('.html', `-${lang}.html`);
    
    if (newPage !== currentPage) {
        window.location.href = newPage;
    } else {
        renderCMS(cmsCache); // Re-render current page
    }
}

function updateLanguageSwitcher() {
    const buttons = document.querySelectorAll('.language-switcher button, .lang-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === currentLang || btn.textContent.toLowerCase().includes(currentLang)) {
            btn.classList.add('active');
        }
    });
}

/* ========================================
   CMS Data Fetching & Rendering
   ======================================== */
async function fetchCMSData() {
    try {
        const res = await fetch(API_BASE_URL + '/api/cms/data', { 
            cache: 'no-store',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!res.ok) throw new Error('CMS API error: ' + res.status);
        
        cmsCache = await res.json();
        renderCMS(cmsCache);
        
        console.log('[CMS] Data loaded successfully');
    } catch (err) {
        console.warn('[CMS] Failed to load CMS data, using static fallback.', err);
        // Static fallback is already in HTML
    }
}

function renderCMS(data) {
    if (!data) return;
    
    const lang = currentLang;
    
    // Render site-wide elements
    renderSiteMeta(data.site, lang);
    renderNavigation(data.navigation, lang);
    renderFooter(data.site, lang);
    
    // Render page-specific content
    const pageName = getCurrentPageName();
    if (pageName && data.pages[pageName]) {
        renderPageContent(data.pages[pageName], lang);
    }
}

function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    const baseName = filename.replace(/-(en|sc)\.html$/, '.html').replace('.html', '');
    
    const pageMap = {
        'index': 'index',
        'about': 'about',
        'services': 'services',
        'audit': 'audit',
        'tax': 'tax',
        'risk': 'risk',
        'forensic': 'forensic',
        'consulting': 'consulting',
        'deals': 'deals',
        'commitment': 'commitment',
        'purpose': 'purpose',
        'value': 'value',
        'contact': 'contact'
    };
    
    return pageMap[baseName] || null;
}

function renderSiteMeta(site, lang) {
    if (!site) return;
    
    // Update title
    if (site.companyName && site.companyName[lang]) {
        const titleEl = document.querySelector('title[data-cms="site.companyName.' + lang + '"]');
        if (titleEl) {
            document.title = titleEl.textContent.replace(/^.+\|/, site.companyName[lang] + ' |');
        }
    }
    
    // Update logo alt
    const logoImg = document.querySelector('.logo img, .footer-logo img');
    if (logoImg && site.logo && site.logo.alt) {
        logoImg.alt = site.logo.alt;
    }
    
    // Update contact info
    if (site.contact) {
        updateElementText('[data-cms="site.contact.phone"]', site.contact.phone);
        updateElementText('[data-cms="site.contact.email"]', site.contact.email);
        updateElementText('[data-cms="site.contact.address.' + lang + '"]', site.contact.address?.[lang]);
        updateElementText('[data-cms="site.contact.hours.' + lang + '"]', site.contact.hours?.[lang]);
    }
    
    // Update footer
    if (site.footer) {
        updateElementText('[data-cms="site.footer.copyright"]', site.footer.copyright);
        updateElementText('[data-cms="site.footer.description.' + lang + '"]', site.footer.description?.[lang]);
    }
}

function renderNavigation(nav, lang) {
    if (!nav || !nav.main) return;
    
    const navContainer = document.getElementById('navLinks') || document.querySelector('nav ul');
    if (!navContainer) return;
    
    // Render main navigation
    const navHTML = nav.main.map(item => {
        const label = item.label?.[lang] || item.label?.tc || item.id;
        const hasChildren = item.children && item.children.length > 0;
        
        if (hasChildren) {
            const childrenHTML = item.children.map(child => {
                const childLabel = child.label?.[lang] || child.label?.tc || child.id;
                return `<li><a href="${child.url}">${childLabel}</a></li>`;
            }).join('');
            
            return `
                <li class="has-dropdown">
                    <a href="${item.url}">${label} <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown">${childrenHTML}</ul>
                </li>
            `;
        }
        
        return `<li><a href="${item.url}">${label}</a></li>`;
    }).join('');
    
    navContainer.innerHTML = navHTML;
}

function renderFooter(site, lang) {
    if (!site) return;
    
    // Footer navigation links
    const footerNav = document.querySelector('.footer-links ul');
    if (footerNav && site.footer && site.footer.links) {
        const linksHTML = site.footer.links.map(link => {
            const label = link.label?.[lang] || link.label?.tc || 'Link';
            return `<li><a href="${link.url}">${label}</a></li>`;
        }).join('');
        footerNav.innerHTML = linksHTML;
    }
}

function renderPageContent(pageData, lang) {
    if (!pageData || !pageData[lang]) return;
    
    const data = pageData[lang];
    
    // Render based on page structure
    if (data.hero) renderHero(data.hero);
    if (data.introduction) renderIntroduction(data.introduction);
    if (data.mission) renderMission(data.mission);
    if (data.vision) renderVision(data.vision);
    if (data.values) renderValues(data.values);
    if (data.timeline) renderTimeline(data.timeline);
    if (data.services) renderServices(data.services);
    if (data.whyChooseUs) renderWhyChooseUs(data.whyChooseUs);
    if (data.contactInfo) renderContactInfo(data.contactInfo);
    if (data.form) renderContactForm(data.form);
}

// Section renderers
function renderHero(hero) {
    if (!hero.enabled) {
        const heroSection = document.querySelector('.hero, .page-hero');
        if (heroSection) heroSection.style.display = 'none';
        return;
    }
    
    updateElementText('.hero h1, .page-hero h1', hero.title);
    updateElementText('.hero p.lead, .page-hero p.subtitle', hero.subtitle);
    updateElementText('.hero .cta-button, .page-hero .cta-button', hero.ctaText);
    
    const ctaLink = document.querySelector('.hero .cta-button, .page-hero .cta-button');
    if (ctaLink && hero.ctaLink) ctaLink.href = hero.ctaLink;
}

function renderIntroduction(intro) {
    if (!intro.enabled) return;
    
    updateElementText('.about-content h2, .intro-section h2', intro.title);
    
    const paragraphs = document.querySelectorAll('.about-content p, .intro-section p');
    if (intro.paragraphs && paragraphs.length > 0) {
        intro.paragraphs.forEach((text, i) => {
            if (paragraphs[i]) paragraphs[i].textContent = text;
        });
    }
}

function renderMission(mission) {
    if (!mission.enabled) return;
    
    updateElementText('.mission-section h2, .section-mission h2', mission.title);
    updateElementText('.mission-section blockquote, .mission-quote', mission.quote);
    updateElementText('.mission-section .content, .mission-content', mission.content);
}

function renderVision(vision) {
    if (!vision.enabled) return;
    
    updateElementText('.vision-section h2, .section-vision h2', vision.title);
    updateElementText('.vision-section p, .vision-content', vision.content);
}

function renderValues(values) {
    if (!values.enabled) return;
    
    updateElementText('.values-section h2, .section-values h2', values.title);
    updateElementText('.values-section .subtitle, .values-subtitle', values.subtitle);
    
    const valueCards = document.querySelectorAll('.value-card, .core-value');
    if (values.items && valueCards.length > 0) {
        values.items.forEach((item, i) => {
            if (valueCards[i]) {
                const card = valueCards[i];
                const titleEl = card.querySelector('h3, h4, .value-title');
                const descEl = card.querySelector('p, .value-desc');
                const iconEl = card.querySelector('i, .value-icon');
                
                if (titleEl) titleEl.textContent = item.title;
                if (descEl) descEl.textContent = item.description;
                if (iconEl && item.icon) iconEl.className = 'fas ' + item.icon;
            }
        });
    }
}

function renderTimeline(timeline) {
    if (!timeline.enabled) return;
    
    updateElementText('.timeline-section h2, .section-timeline h2', timeline.title);
    updateElementText('.timeline-section .subtitle, .timeline-subtitle', timeline.subtitle);
    
    const timelineContainer = document.querySelector('.timeline-items, .timeline-list');
    if (timelineContainer && timeline.items) {
        const itemsHTML = timeline.items.map(item => `
            <div class="timeline-item">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
        
        timelineContainer.innerHTML = itemsHTML;
    }
}

function renderServices(services) {
    if (!services.enabled) return;
    
    updateElementText('.services-section h2, .section-services h2', services.title);
    updateElementText('.services-section .subtitle, .services-subtitle', services.subtitle);
    
    const servicesGrid = document.querySelector('.services-grid, .service-list');
    if (servicesGrid && services.items) {
        const itemsHTML = services.items.filter(item => item.enabled).map(item => `
            <div class="service-card" data-service-id="${item.id}">
                <i class="fas ${item.icon}"></i>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.link}">了解更多 <i class="fas fa-arrow-right"></i></a>
            </div>
        `).join('');
        
        servicesGrid.innerHTML = itemsHTML;
    }
}

function renderWhyChooseUs(whyChooseUs) {
    if (!whyChooseUs.enabled) return;
    
    updateElementText('.why-choose-section h2, .section-why h2', whyChooseUs.title);
    updateElementText('.why-choose-section .description, .why-description', whyChooseUs.description);
    
    const featuresGrid = document.querySelector('.why-features, .features-grid');
    if (featuresGrid && whyChooseUs.items) {
        const itemsHTML = whyChooseUs.items.map(item => `
            <div class="feature-card">
                <i class="fas ${item.icon}"></i>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `).join('');
        
        featuresGrid.innerHTML = itemsHTML;
    }
}

function renderContactInfo(contactInfo) {
    if (!contactInfo.enabled) return;
    
    updateElementText('.contact-company', contactInfo.companyName);
    updateElementText('.contact-address', contactInfo.address);
    updateElementText('.contact-phone', contactInfo.phone);
    updateElementText('.contact-email', contactInfo.email);
    updateElementText('.contact-hours', contactInfo.hours);
}

function renderContactForm(form) {
    if (!form.enabled) return;
    
    updateElementText('.contact-form h3, .form-section h3', form.title);
    updateElementText('.contact-form > p, .form-description', form.description);
    
    // Update form field labels and placeholders
    if (form.fields) {
        Object.keys(form.fields).forEach(fieldName => {
            const field = form.fields[fieldName];
            const input = document.querySelector(`[name="${fieldName}"], #${fieldName}`);
            const label = document.querySelector(`label[for="${fieldName}"]`);
            
            if (label) label.textContent = field.label;
            if (input) input.placeholder = field.placeholder;
        });
    }
    
    // Update submit button
    const submitBtn = document.querySelector('button[type="submit"], .submit-btn');
    if (submitBtn) submitBtn.textContent = form.submitButton;
}

// Helper function
function updateElementText(selector, text) {
    if (!text) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
}

/* ========================================
   Mobile Menu
   ======================================== */
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn, .menu-toggle');
    const nav = document.querySelector('nav, .main-nav');
    
    if (mobileBtn && nav) {
        mobileBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileBtn.classList.toggle('active');
        });
    }
}

/* ========================================
   Smooth Scroll
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ========================================
   Analytics Tracking
   ======================================== */
function trackPageView() {
    const page = window.location.pathname;
    const lang = currentLang;
    
    // Send to Worker for analytics
    fetch(API_BASE_URL + '/api/analytics/pageview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            page: page,
            language: lang,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        })
    }).catch(() => {}); // Silently fail
}

// Track contact form submissions
function trackFormSubmission(formType) {
    fetch(API_BASE_URL + '/api/analytics/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            event: 'form_submit',
            formType: formType,
            language: currentLang,
            timestamp: new Date().toISOString()
        })
    }).catch(() => {});
}

// Expose to global for onclick handlers
window.switchLanguage = switchLanguage;
window.trackFormSubmission = trackFormSubmission;
