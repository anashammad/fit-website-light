import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata, buildBreadcrumbSchema, SITE_URL } from '@/lib/metadata';
import { Heading, Text } from '@/components/atoms';
import { ProductCard } from '@/components/molecules';
import { HeroSection, FeatureGrid, CTABanner, PlatformPreview } from '@/components/organisms';
import type { Feature } from '@/components/organisms';
import type { BreadcrumbItem } from '@/components/molecules/Breadcrumb';

/* -------------------------------------------------------------------------- */
/*  Product data                                                              */
/* -------------------------------------------------------------------------- */

interface Module {
  name: string;
  description: string;
}

interface ProductData {
  slug: string;
  name: string;
  headline: string;
  subtitle: string;
  description: string;
  icon: string;
  features: Feature[];
  modules?: Module[];
  howItWorks: { step: string; title: string; description: string }[];
  integrations: string[];
  screenshots?: { src: string; alt: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  relatedSlugs: string[];
  usedBy?: string[];
}

const products: Record<string, ProductData> = {
  'fit-premium': {
    slug: 'fit-premium',
    name: 'FIT Premium (OMS)',
    headline: 'The Trading Engine Behind 90% of Oman\'s Brokerage Market',
    subtitle:
      'FIT Premium is a multi-market, multi-currency Order Management System built from the ground up for MENA capital markets — handling equities, bonds, treasury bills, and OTC instruments across every GCC exchange from a single screen.',
    description:
      'Institutional-grade OMS trusted by brokerages across Oman, UAE, Qatar, and Jordan. Full order lifecycle management with exchange connectivity and margin trading.',
    icon: 'chart-bar',
    features: [
      {
        icon: 'globe',
        title: 'Multi-Market Order Routing',
        description:
          'Route orders to MSM, ADX, DFM, QSE, Tadawul, and more from a single interface with real-time status tracking across all connected exchanges.',
      },
      {
        icon: 'sliders',
        title: 'SCA-Certified Margin Trading',
        description:
          'Built-in margin module certified by the UAE Securities and Commodities Authority, with real-time buying power calculation and automated margin calls.',
      },
      {
        icon: 'activity',
        title: 'Real-Time Market Data & Charting',
        description:
          'Real-time market data with sub-second latency, depth of market, trade blotter, watchlists, and technical analysis charting.',
      },
      {
        icon: 'link',
        title: 'Direct Exchange Integration',
        description:
          'Online integration with exchange matching engines including Nasdaq X-Stream and Horizon platforms — no intermediary delays.',
      },
      {
        icon: 'layout',
        title: 'Multi-Workspace Trading Desks',
        description:
          'Customizable multi-monitor workspace layouts for professional traders and call center operations with dedicated phone order workflows.',
      },
      {
        icon: 'shield',
        title: 'Islamic Trading Module',
        description:
          'Sharia-compliant trading workflows including Murabaha financing, purification calculations, and Islamic fund screening built in.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Connect Your Markets',
        description:
          'FIT Premium connects to GCC exchanges through direct FIX and native API integrations. Pre-built connectors for MSM, ADX, DFM, QSE, Tadawul, BSE, and KSE.',
      },
      {
        step: '2',
        title: 'Route and Execute',
        description:
          'Traders place orders through a unified interface supporting market, limit, and stop orders. Smart routing finds the best execution venue automatically.',
      },
      {
        step: '3',
        title: 'Settle and Report',
        description:
          'Straight-through processing to Wasata back-office for T+2/T+3 settlement. Full execution analytics and regulatory reporting built in.',
      },
    ],
    modules: [
      { name: 'Market Making', description: 'Automated two-sided quoting engine for designated market makers with spread management, inventory risk controls, and exchange compliance monitoring.' },
      { name: 'Institutional Desk', description: 'Block trade management, pre-trade analytics, multi-account allocation (pro-rata, waterfall), and transaction cost analysis for institutional order flow.' },
      { name: 'Algos', description: 'VWAP, TWAP, POV, Iceberg, and Smart Order Routing strategies with real-time monitoring dashboards and historical back-testing capabilities.' },
      { name: 'Options & Futures', description: 'Listed derivatives trading with options pricing (Black-Scholes, binomial), Greeks monitoring, SPAN margin calculation, and expiry management workflows.' },
      { name: 'Retail', description: 'High-volume retail brokerage module with simplified order entry, client self-service portal, tiered commissions, and mass communication tools.' },
      { name: 'Margin', description: 'SCA-certified margin trading with per-second buying power calculation, automated margin calls, forced liquidation, and Islamic Murabaha margin financing.' },
      { name: 'SkyFund', description: 'Fund administration for mutual funds, closed-end funds, and Islamic funds with automated NAV calculation, investor registry, and fee computation.' },
      { name: 'AMS', description: 'Centralized Account Management System for digital onboarding, KYC documentation, account hierarchy, trading permissions, and regulatory integration.' },
      { name: 'PMS', description: 'Lightweight portfolio management for brokers offering discretionary accounts — model portfolios, drift monitoring, batch rebalancing, and performance tracking.' },
      { name: 'US Market Integration', description: 'NYSE and NASDAQ access via FIX connectivity to US executing brokers, with unified portfolio view, multi-currency support, and extended hours trading.' },
    ],
    screenshots: [
      { src: '/images/products/fit-premium-screenshot.png', alt: 'FIT Premium — Multi-market OMS trading terminal' },
      { src: '/images/products/market-making-screenshot.png', alt: 'Market Making module — QGTS automated quoting' },
    ],
    integrations: ['FIX 4.2/4.4', '(DMA) Direct Market Access', 'Care Orders', 'REST API', 'WebSocket', 'Bloomberg', 'Reuters', 'GCC Exchange Feeds', 'Tadawul'],
    primaryCta: { label: 'Schedule a Demo', href: '/contact?product=fit-premium' },
    secondaryCta: { label: 'Request Datasheet', href: '/contact?type=datasheet&product=fit-premium' },
    relatedSlugs: ['wasata-backoffice', 'fit-surveillance', 'mobile-web-trading'],
    usedBy: ['QNB', 'ADCB', 'NBO', 'Ubhar Capital', 'Bank Dhofar', 'SICO', 'CBQ', 'United Securities'],
  },
  'api-middleware': {
    slug: 'api-middleware',
    name: 'API Middleware',
    headline: 'One Integration. Every Protocol. Total Connectivity.',
    subtitle:
      'FIT API Middleware bridges your existing infrastructure — CRM systems, risk engines, mobile apps, institutional order flow — with FIT\'s OMS and back-office through FIX, REST, and WebSocket without custom point-to-point integrations.',
    description:
      'Universal connectivity layer for MENA capital markets. Connect trading platforms, banking systems, and custodians through FIX, REST, and WebSocket.',
    icon: 'code',
    features: [
      {
        icon: 'layers',
        title: 'FIX Protocol Gateway',
        description:
          'FIX 4.2 and 4.4 compliant gateway for institutional order flow, DMA connections, and inter-broker connectivity with certificate-based authentication.',
      },
      {
        icon: 'server',
        title: 'REST & WebSocket APIs',
        description:
          'RESTful HTTP APIs with OAuth 2.0 for account and order management, plus real-time WebSocket streaming for market data and order status updates.',
      },
      {
        icon: 'shuffle',
        title: 'Protocol Translation',
        description:
          'Automatic translation between FIX, REST, and native exchange protocols — enabling seamless connectivity regardless of your technology stack.',
      },
      {
        icon: 'link',
        title: 'Banking Gateway Integration',
        description:
          'Pre-built connectors for online and offline banking gateways supporting fund transfers, payment instructions, and reconciliation with major MENA banks.',
      },
      {
        icon: 'book-open',
        title: 'Developer Portal & Sandbox',
        description:
          'Comprehensive API documentation, sandbox environment, and sample code for third-party developers building on FIT\'s platform.',
      },
      {
        icon: 'shield',
        title: 'Enterprise Security & Logging',
        description:
          'TLS 1.2+, IP whitelisting, rate limiting per client, and complete message audit logging for regulatory compliance.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Single Integration Point',
        description:
          'Connect your application to FIT API Middleware once. We handle the downstream complexity of exchange protocols and banking gateways.',
      },
      {
        step: '2',
        title: 'Protocol Translation',
        description:
          'Middleware translates between FIX, REST, WebSocket, and native exchange protocols automatically — no code changes required.',
      },
      {
        step: '3',
        title: 'Scale With Confidence',
        description:
          'Add new exchanges, custodians, and data providers without changing a single line of your application code. 10,000+ messages per second per connection.',
      },
    ],
    integrations: ['FIX 4.2/4.4/5.0', 'REST API', 'WebSocket', 'Banking Gateways', 'Custodian APIs'],
    primaryCta: { label: 'Request Integration Consultation', href: '/contact?product=api-middleware' },
    secondaryCta: { label: 'View API Documentation', href: '/contact?type=datasheet&product=api-middleware' },
    relatedSlugs: ['fit-premium', 'mobile-web-trading', 'fit-surveillance'],
    usedBy: ['QNB', 'ADCB', 'NBO', 'Al Ramz', 'CBD'],
  },
  'wasata-backoffice': {
    slug: 'wasata-backoffice',
    name: 'Wasata Backoffice',
    headline: 'The Operational Backbone for MENA Brokerage Houses',
    subtitle:
      'Wasata manages the entire post-trade lifecycle — settlement, clearing, corporate actions, margin management, AML compliance, and regulatory reporting — across multiple GCC jurisdictions from a single platform.',
    description:
      'Brokerage back-office system for trade settlement, client accounts, compliance, and regulatory reporting. Trusted by brokers across MENA.',
    icon: 'briefcase',
    features: [
      {
        icon: 'activity',
        title: 'Trade Settlement & Clearing',
        description:
          'Automated post-trade processing with T+0 through T+3 settlement cycles, DvP settlement, and direct integration with regional CSD systems.',
      },
      {
        icon: 'sliders',
        title: 'Margin Management',
        description:
          'Real-time margin monitoring with automated margin calls, collateral management, forced liquidation, and Islamic Murabaha margin financing.',
      },
      {
        icon: 'shield',
        title: 'AML/KYC Compliance',
        description:
          'FATF-compliant anti-money laundering screening, PEP checking, sanctions screening, suspicious activity reporting, and automated regulatory filing.',
      },
      {
        icon: 'file-text',
        title: 'Corporate Actions Processing',
        description:
          'Automated processing of dividends, stock splits, rights issues, bonus shares, and IPO allocations with client entitlement calculations.',
      },
      {
        icon: 'users',
        title: 'Client CRM & Accounting',
        description:
          'Full client lifecycle management with multi-currency general ledger, client money segregation, and regulatory capital calculations.',
      },
      {
        icon: 'clipboard',
        title: 'Multi-Regulator Reporting',
        description:
          'Pre-built reports for CMA Oman, SCA UAE, QFMA Qatar, CMA Saudi, and CBB Bahrain with automated submission capabilities.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Configure Your Operations',
        description:
          'Set up settlement rules per market, configure margin parameters, import client data, and establish compliance screening rules.',
      },
      {
        step: '2',
        title: 'Automate Post-Trade',
        description:
          'Trades flow from FIT Premium with straight-through processing. Settlement, corporate actions, and margin calls run automatically.',
      },
      {
        step: '3',
        title: 'Report and Comply',
        description:
          'Generate regulatory reports, client statements, and audit trails automatically. Arabic and English language support throughout.',
      },
    ],
    screenshots: [
      { src: '/images/products/wasata-screenshot.png', alt: 'Wasata Backoffice — Transactions summary & portfolio management' },
    ],
    integrations: ['FIT Premium OMS', 'CSD Systems', 'Core Banking', 'Exchange Settlement', 'Regulatory Portals'],
    primaryCta: { label: 'Book a Walkthrough', href: '/contact?product=wasata-backoffice' },
    secondaryCta: { label: 'Request Datasheet', href: '/contact?type=datasheet&product=wasata-backoffice' },
    relatedSlugs: ['fit-premium', 'investor-vision', 'digital-onboarding'],
    usedBy: ['NBO', 'Bank Dhofar', 'Ubhar Capital', 'United Securities', 'Ahli Bank', 'Global Securities'],
  },
  'fit-surveillance': {
    slug: 'fit-surveillance',
    name: 'FIT Surveillance',
    headline: 'Detect Market Abuse Before Regulators Do',
    subtitle:
      'FIT Surveillance monitors real-time trading activity across GCC exchanges to detect insider trading, market manipulation, spoofing, and other forms of disorderly trading — with full case management and regulatory reporting.',
    description:
      'Market surveillance and trade monitoring for exchanges, regulators, and brokerage compliance. Designed for MENA trading patterns.',
    icon: 'eye',
    features: [
      {
        icon: 'activity',
        title: 'Real-Time Alert Engine',
        description:
          'Pattern-based and anomaly detection algorithms monitoring order flow and trade execution in real time, generating prioritized alerts for investigation.',
      },
      {
        icon: 'alert-triangle',
        title: 'Market Manipulation Detection',
        description:
          'Algorithms for wash trading, pump-and-dump, spoofing/layering, marking the close, and cornering patterns specific to MENA market microstructure.',
      },
      {
        icon: 'eye',
        title: 'Insider Trading Monitoring',
        description:
          'Cross-reference trading patterns with corporate announcement timelines, director dealings, and connected party databases across GCC markets.',
      },
      {
        icon: 'globe',
        title: 'Cross-Market Surveillance',
        description:
          'Monitor trading activity across multiple GCC exchanges to detect cross-market manipulation schemes on dual-listed securities.',
      },
      {
        icon: 'file-text',
        title: 'Case Management & Audit',
        description:
          'Investigation workflow tools for documenting findings, escalating cases, and generating regulatory submissions with full historical replay.',
      },
      {
        icon: 'sliders',
        title: 'Configurable Rule Engine',
        description:
          'User-defined alert parameters and thresholds adjustable based on market conditions and regulatory requirements. Pre-built MENA-specific rules.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Connect Your Order Flow',
        description:
          'Feed order and trade data from your OMS or exchange matching engine. Real-time ingestion with T+0 processing of millions of orders daily.',
      },
      {
        step: '2',
        title: 'Detect Anomalies',
        description:
          'Detection engine analyzes every order against pre-built and custom rules in real time. Cross-references with corporate announcements and connected party data.',
      },
      {
        step: '3',
        title: 'Investigate and Report',
        description:
          'Review flagged activity with full order book reconstruction, document investigations, and generate reports aligned with CMA, SCA, and QFMA requirements.',
      },
    ],
    integrations: ['FIT Premium OMS', 'Exchange Matching Engines', 'CSD Records', 'Corporate Announcement Feeds', 'Regulatory Portals'],
    primaryCta: { label: 'Request a Surveillance Demo', href: '/contact?product=fit-surveillance' },
    secondaryCta: { label: 'Request Datasheet', href: '/contact?type=datasheet&product=fit-surveillance' },
    relatedSlugs: ['fit-premium', 'wasata-backoffice', 'api-middleware'],
    usedBy: ['QSC', 'Dalala', 'ADCB'],
  },
  'mobile-web-trading': {
    slug: 'mobile-web-trading',
    name: 'Mobile & Web Trading',
    headline: 'Give Your Clients a Trading App They Will Actually Use',
    subtitle:
      'Customized white-label trading applications for iOS, Android, and web — fully branded as yours, with native Arabic support, live market data, and direct exchange connectivity powered by FIT.',
    description:
      'White-label trading apps for brokerage houses. Offer your clients a modern digital trading experience on every device without building proprietary technology.',
    icon: 'smartphone',
    features: [
      {
        icon: 'tag',
        title: 'Full White-Label Customization',
        description:
          'Your brand, your colors, your app store listing. Clients see only your name — FIT handles the technology, exchange connectivity, and ongoing maintenance.',
      },
      {
        icon: 'smartphone',
        title: 'Native iOS & Android Apps',
        description:
          'Native Swift and Kotlin apps with smooth performance, biometric login, push notifications for price alerts, and offline portfolio caching.',
      },
      {
        icon: 'trending-up',
        title: 'Real-Time Trading & Charting',
        description:
          'Live streaming quotes, depth of market, interactive technical analysis charts (RSI, MACD, Bollinger Bands), and real-time order execution.',
      },
      {
        icon: 'globe',
        title: 'Multi-Market & Multi-Language',
        description:
          'Trade across GCC exchanges from a single app with full Arabic and English interfaces, proper RTL layout, and seamless language switching.',
      },
      {
        icon: 'zap',
        title: 'Rapid Deployment',
        description:
          'Go live in weeks. Pre-built modules, exchange connectors, and customization options get your branded app to market fast.',
      },
      {
        icon: 'user-check',
        title: 'Account Self-Service',
        description:
          'Fund transfers, withdrawal requests, statement downloads, document uploads, and portfolio reporting — all from within the app.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Brand and Configure',
        description:
          'Apply your brand identity — logo, colors, typography, splash screens. Choose features and configure market access for your clients.',
      },
      {
        step: '2',
        title: 'Connect Your Infrastructure',
        description:
          'Integrate with FIT Premium OMS and market data feeds through API Middleware. Seamless order routing to all connected exchanges.',
      },
      {
        step: '3',
        title: 'Launch to Clients',
        description:
          'Deploy to app stores under your developer account and launch the web platform. Start onboarding clients immediately.',
      },
    ],
    screenshots: [
      { src: '/images/products/mobile-trading-home.webp', alt: 'Mobile Trading — Market overview with live charts' },
      { src: '/images/products/mobile-trading-depth.webp', alt: 'Mobile Trading — Stock details & market depth' },
    ],
    integrations: ['FIT Premium OMS', 'API Middleware', 'GCC Exchange Feeds', 'Push Notifications', 'Biometric Auth'],
    primaryCta: { label: 'See the Trading App Demo', href: '/contact?product=mobile-web-trading' },
    secondaryCta: { label: 'Request Datasheet', href: '/contact?type=datasheet&product=mobile-web-trading' },
    relatedSlugs: ['fit-premium', 'api-middleware', 'digital-onboarding'],
    usedBy: ['QNB', 'NBO', 'Ubhar Capital', 'CBQ', 'WFS'],
  },
  'investor-vision': {
    slug: 'investor-vision',
    name: 'Investor Vision',
    headline: 'Portfolio Management Built for MENA Asset Managers',
    subtitle:
      'Investor Vision gives asset managers, fund administrators, and institutional investors a complete system for portfolio construction, performance attribution, risk analytics, NAV calculation, and Sharia-compliant fund management.',
    description:
      'Portfolio management and fund administration for MENA capital markets. Equities, fixed income, sukuk, and alternatives with GIPS-compliant reporting.',
    icon: 'pie-chart',
    features: [
      {
        icon: 'pie-chart',
        title: 'Portfolio Construction & Rebalancing',
        description:
          'Model portfolio creation with target allocation management, drift monitoring, what-if scenario analysis, and automated rebalancing recommendations.',
      },
      {
        icon: 'trending-up',
        title: 'Performance Attribution',
        description:
          'Time-weighted and money-weighted returns with benchmark comparison against local indices (MSM 30, ADX General, TASI) and sector-level attribution.',
      },
      {
        icon: 'bar-chart-2',
        title: 'Risk Analytics',
        description:
          'VaR calculations (parametric, historical, Monte Carlo), tracking error, Sharpe ratio, beta analysis, concentration risk monitoring, and stress testing.',
      },
      {
        icon: 'file-text',
        title: 'NAV & Investor Reporting',
        description:
          'Automated NAV computation with multi-currency support, fee calculation, and comprehensive investor reports and fund factsheets in Arabic and English.',
      },
      {
        icon: 'shield',
        title: 'Compliance & Sharia Screening',
        description:
          'Pre-trade and post-trade compliance against investment mandates, regulatory limits, and AAOIFI/S&P Sharia screening criteria for Islamic funds.',
      },
      {
        icon: 'layers',
        title: 'Multi-Asset & Multi-Fund',
        description:
          'Equities, fixed income, sukuk, money market, real estate funds, and alternatives. Manage multiple funds, sub-funds, and share classes from one platform.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Configure Your Funds',
        description:
          'Set up fund structures, investment mandates, benchmarks, compliance rules, and Sharia screening criteria.',
      },
      {
        step: '2',
        title: 'Manage Portfolios',
        description:
          'Construct portfolios, execute rebalancing through FIT Premium, and monitor positions, risk, and drift in real time.',
      },
      {
        step: '3',
        title: 'Report and Distribute',
        description:
          'Generate GIPS-compliant performance reports, NAV statements, and investor communications automatically in Arabic and English.',
      },
    ],
    integrations: ['FIT Premium OMS', 'GCC Market Data Feeds', 'Bloomberg', 'Custodian Systems', 'Regulatory Portals'],
    primaryCta: { label: 'Schedule a Demo', href: '/contact?product=investor-vision' },
    secondaryCta: { label: 'Request Datasheet', href: '/contact?type=datasheet&product=investor-vision' },
    relatedSlugs: ['fit-premium', 'wasata-backoffice', 'api-middleware'],
    usedBy: ['Ubhar Capital', 'SICO', 'Ahli Bank'],
  },
  'digital-onboarding': {
    slug: 'digital-onboarding',
    name: 'Digital Onboarding',
    headline: 'Onboard Clients in Minutes, Not Days',
    subtitle:
      'Replace paper-based account opening with a fully digital workflow. eKYC verification, AML screening, document collection, risk profiling, e-signatures, and instant account activation — all from a mobile device.',
    description:
      'Digital client onboarding for MENA brokerages. eKYC, AML screening, and instant account activation — prospect to first trade in under 5 minutes.',
    icon: 'user-check',
    features: [
      {
        icon: 'user-check',
        title: 'eKYC Identity Verification',
        description:
          'Government ID scanning with OCR, liveness detection via selfie/video, and cross-referencing with national ID databases (Oman Civil Status, UAE ICA) for instant authentication.',
      },
      {
        icon: 'shield',
        title: 'AML & Sanctions Screening',
        description:
          'Automated screening against OFAC, EU, and UN sanctions lists, PEP databases, and adverse media with configurable risk scoring and escalation workflows.',
      },
      {
        icon: 'file-text',
        title: 'Document Collection & E-Signatures',
        description:
          'Digital upload and OCR validation of passports, proof of address, and source of funds. Legally binding e-signatures under UAE and Oman Electronic Transactions Law.',
      },
      {
        icon: 'smartphone',
        title: 'Mobile-First & Multi-Channel',
        description:
          'Available as an embedded widget in your mobile app, standalone web application, or in-branch tablet for assisted onboarding. Arabic-first with RTL design.',
      },
      {
        icon: 'zap',
        title: 'Instant Account Activation',
        description:
          'Approved accounts are created in FIT Premium and Wasata automatically. Low-risk clients begin trading immediately; elevated-risk cases enter approval queue.',
      },
      {
        icon: 'clipboard',
        title: 'Ongoing Monitoring & Re-KYC',
        description:
          'Document expiry tracking, periodic re-screening against updated sanctions/PEP lists, and triggered re-KYC workflows when client risk profile changes.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Client Applies Online',
        description:
          'Clients fill out the application and upload required documents from their phone. National ID is verified against government databases in real time.',
      },
      {
        step: '2',
        title: 'Automated Verification',
        description:
          'Identity is verified via liveness detection, documents are OCR-validated, AML screening runs against global sanctions and PEP databases, and risk profile is scored.',
      },
      {
        step: '3',
        title: 'Account Goes Live',
        description:
          'Once approved, the trading account is created in FIT Premium and Wasata with a single click. Client can start trading immediately — under 5 minutes total.',
      },
    ],
    integrations: ['FIT Premium OMS', 'Wasata Backoffice', 'National ID Systems', 'OFAC/EU/UN Sanctions', 'AML Databases'],
    primaryCta: { label: 'Schedule a Demo', href: '/contact?product=digital-onboarding' },
    secondaryCta: { label: 'Request Datasheet', href: '/contact?type=datasheet&product=digital-onboarding' },
    relatedSlugs: ['fit-premium', 'wasata-backoffice', 'mobile-web-trading'],
    usedBy: ['NBO', 'Ubhar Capital', 'Bank Dhofar'],
  },
  'fund-management': {
    slug: 'fund-management',
    name: 'Fund Management',
    headline: 'Complete Fund Administration for MENA Asset Managers',
    subtitle:
      'Multi-portfolio, multi-currency, multi-fund administration system covering the full lifecycle from subscription and redemption to NAV calculation, performance reporting, and regulatory compliance.',
    description:
      'Fund administration system for mutual funds, Islamic funds, and investment portfolios. NAV calculation, shareholder registry, and performance analytics.',
    icon: 'fund',
    features: [
      {
        icon: 'layers',
        title: 'Multi-Portfolio & Multi-Fund',
        description:
          'Manage multiple funds, sub-funds, and portfolios simultaneously with independent NAV calculations, fee structures, and compliance rules per fund.',
      },
      {
        icon: 'activity',
        title: 'Trading & Back Office Integration',
        description:
          'Integrated buy/sell order management with real-time price, index, and FX rate updates. Direct link to back-office systems for seamless settlement.',
      },
      {
        icon: 'users',
        title: 'Shareholder Management',
        description:
          'Complete subscription and redemption processing, unit allocation, block/pledge management, and investor registry with full audit trail.',
      },
      {
        icon: 'file-text',
        title: 'Finance & Accounting Module',
        description:
          'Chart of accounts, general ledger, balance sheet, trial balance, income statement, and FX gain/loss calculations — all integrated with fund operations.',
      },
      {
        icon: 'trending-up',
        title: 'NAV & Performance Analytics',
        description:
          'Daily NAV calculation with performance metrics including Beta, Sharpe ratio, and Treynor ratio. Automated fact sheet generation and SMS notifications.',
      },
      {
        icon: 'globe',
        title: 'Multi-Currency Support',
        description:
          'Full multi-currency fund management with automated FX rate feeds, currency hedging tracking, and consolidated reporting across base currencies.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Set Up Fund Structure',
        description:
          'Configure brokers, securities, clients, portfolios, exchanges, indices, asset classes, and currencies for each fund.',
      },
      {
        step: '2',
        title: 'Manage Daily Operations',
        description:
          'Process subscriptions/redemptions, execute trades, handle corporate actions, and calculate daily NAV automatically.',
      },
      {
        step: '3',
        title: 'Report & Distribute',
        description:
          'Generate performance reports, fact sheets, financial statements, and investor communications in Arabic and English.',
      },
    ],
    integrations: ['FIT Premium OMS', 'Wasata Backoffice', 'Market Data Feeds', 'Custodian Systems', 'SMS Gateway'],
    primaryCta: { label: 'Schedule a Demo', href: '/contact?product=fund-management' },
    secondaryCta: { label: 'Request Datasheet', href: '/contact?type=datasheet&product=fund-management' },
    relatedSlugs: ['investor-vision', 'wasata-backoffice', 'fit-premium'],
    usedBy: ['Ubhar Capital', 'SICO'],
  },
  'ipo-manager': {
    slug: 'ipo-manager',
    name: 'IPO Manager',
    headline: 'Streamline IPO Subscriptions from Start to Allotment',
    subtitle:
      'Centralized IPO subscription management system handling manual and automated entry, real-time progress monitoring, allotment scenario generation, and full validation and approval workflows for capital market offerings.',
    description:
      'IPO subscription management for exchanges and brokerage houses. Centralized entry, real-time monitoring, allotment scenarios, and regulatory reporting.',
    icon: 'ipo',
    features: [
      {
        icon: 'clipboard',
        title: 'Centralized Subscription Management',
        description:
          'Single platform for collecting, validating, and managing all IPO subscriptions from multiple channels — branch, online, and institutional.',
      },
      {
        icon: 'zap',
        title: 'Manual & Automated Entry',
        description:
          'Support for both manual subscription entry by branch staff and automated bulk uploads from banking partners and online channels.',
      },
      {
        icon: 'activity',
        title: 'Real-Time Progress Reports',
        description:
          'Live dashboards showing subscription progress, coverage ratios, investor demographics, and channel breakdowns throughout the offering period.',
      },
      {
        icon: 'sliders',
        title: 'Allotment Scenario Generation',
        description:
          'Generate and compare multiple allotment scenarios (pro-rata, tiered, lottery) with what-if analysis before final approval and announcement.',
      },
      {
        icon: 'shield',
        title: 'Validation & Approval Workflow',
        description:
          'Multi-level validation of subscription applications with duplicate detection, document verification, and maker-checker approval workflows.',
      },
      {
        icon: 'file-text',
        title: 'Regulatory Reporting',
        description:
          'Pre-built reports for exchange and regulator submission including subscription summaries, allotment results, and refund processing records.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Configure the Offering',
        description:
          'Set up IPO parameters — share count, price range, subscription period, investor categories, and allotment rules.',
      },
      {
        step: '2',
        title: 'Collect Subscriptions',
        description:
          'Receive applications through all channels with real-time validation, duplicate detection, and progress monitoring.',
      },
      {
        step: '3',
        title: 'Allot and Settle',
        description:
          'Generate allotment scenarios, obtain approval, process share allocations, and manage refunds — all from a single interface.',
      },
    ],
    integrations: ['FIT Premium OMS', 'Wasata Backoffice', 'Banking Systems', 'Exchange Platforms', 'CSD Systems'],
    primaryCta: { label: 'Schedule a Demo', href: '/contact?product=ipo-manager' },
    secondaryCta: { label: 'Request Datasheet', href: '/contact?type=datasheet&product=ipo-manager' },
    relatedSlugs: ['fit-premium', 'wasata-backoffice', 'digital-onboarding'],
    usedBy: ['QSC', 'NBO'],
  },
  'banking-gateway': {
    slug: 'banking-gateway',
    name: 'Banking Gateway',
    headline: 'Seamless Fund Transfers Between Banks and Brokerages',
    subtitle:
      'Secure online gateway enabling real-time fund deposits from bank accounts to brokerage accounts and transfers from brokerage back to bank — eliminating manual processes and reducing settlement risk.',
    description:
      'Online banking integration for brokerages. Real-time deposits, withdrawals, and fund transfers between client bank accounts and brokerage accounts.',
    icon: 'bank',
    features: [
      {
        icon: 'zap',
        title: 'Online Deposit',
        description:
          'Clients deposit funds from their bank account directly into their brokerage account in real time, with instant balance updates and trading power availability.',
      },
      {
        icon: 'shuffle',
        title: 'Online Transfer to Bank',
        description:
          'Process withdrawal requests from brokerage accounts back to client bank accounts with automated approval workflows and same-day settlement.',
      },
      {
        icon: 'shield',
        title: 'Secure Authentication',
        description:
          'Bank-grade security with multi-factor authentication, transaction signing, and encrypted communication channels between brokerage and banking systems.',
      },
      {
        icon: 'activity',
        title: 'Real-Time Reconciliation',
        description:
          'Automated matching and reconciliation of fund movements between banking and brokerage ledgers with exception handling and audit trails.',
      },
      {
        icon: 'link',
        title: 'Multi-Bank Integration',
        description:
          'Pre-built connectors for major MENA banks including NBO, Bank Dhofar, Ahli Bank, QNB, ADCB, and CBD with standardized API integration.',
      },
      {
        icon: 'file-text',
        title: 'Transaction Reporting',
        description:
          'Complete transaction history with regulatory reporting, AML monitoring integration, and automated client notifications for all fund movements.',
      },
    ],
    howItWorks: [
      {
        step: '1',
        title: 'Connect Your Banks',
        description:
          'Integrate with client banking partners through secure API connections. Pre-built connectors reduce integration time to days.',
      },
      {
        step: '2',
        title: 'Enable Fund Transfers',
        description:
          'Clients initiate deposits and withdrawals through your trading platform or mobile app. Transactions are validated and processed in real time.',
      },
      {
        step: '3',
        title: 'Reconcile Automatically',
        description:
          'Fund movements are matched across systems automatically. Exception reports flag discrepancies for manual review.',
      },
    ],
    integrations: ['FIT Premium OMS', 'Wasata Backoffice', 'Core Banking APIs', 'Payment Gateways', 'AML Systems'],
    primaryCta: { label: 'Schedule a Demo', href: '/contact?product=banking-gateway' },
    secondaryCta: { label: 'Request Datasheet', href: '/contact?type=datasheet&product=banking-gateway' },
    relatedSlugs: ['fit-premium', 'wasata-backoffice', 'api-middleware'],
    usedBy: ['NBO', 'Bank Dhofar', 'Ahli Bank', 'CBD'],
  },
};

const allSlugs = Object.keys(products);

/* -------------------------------------------------------------------------- */
/*  Next.js static generation                                                 */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];
  if (!product) return {};

  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
  });
}

/* -------------------------------------------------------------------------- */
/*  Page component                                                            */
/* -------------------------------------------------------------------------- */

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug];
  if (!product) notFound();

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.name },
  ];

  const relatedProducts = product.relatedSlugs
    .filter((s) => products[s])
    .map((s) => products[s]);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Organization', name: 'FIT' },
    url: `${SITE_URL}/products/${product.slug}`,
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Products', url: `${SITE_URL}/products` },
    { name: product.name },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.howItWorks.map((step) => ({
      '@type': 'Question',
      name: `How does ${step.title} work?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: step.description,
      },
    })),
  };

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <HeroSection
        variant="page"
        title={product.headline}
        subtitle={product.subtitle}
        breadcrumbs={breadcrumbs}
        ctas={[
          { label: product.primaryCta.label, href: product.primaryCta.href, variant: 'primary' },
          { label: product.secondaryCta.label, href: product.secondaryCta.href, variant: 'secondary' },
        ]}
      />

      {/* Used By */}
      {product.usedBy && product.usedBy.length > 0 && (
        <section className="border-b border-terminal-border bg-gray-50 py-6">
          <div className="container-content flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Text variant="body-sm" className="shrink-0 font-medium text-slate-500">
              Deployed at:
            </Text>
            <div className="flex flex-wrap justify-center gap-3">
              {product.usedBy.map((client) => (
                <span
                  key={client}
                  className="rounded-full border border-terminal-border bg-white px-4 py-1.5 text-body-sm font-medium text-primary"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Platform Preview */}
      <PlatformPreview
        productName={product.name}
        screenshots={product.screenshots}
        demoHref={product.primaryCta.href}
      />

      {/* Features */}
      <FeatureGrid
        overline={product.name}
        heading="Key Capabilities"
        features={product.features}
      />

      {/* Add-On Modules (FIT Premium only) */}
      {product.modules && product.modules.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-content">
            <Text variant="overline" className="text-accent">
              Add-On Modules
            </Text>
            <Heading level={2} className="mt-2 text-gray-900">
              Extend {product.name} With Specialized Modules
            </Heading>
            <Text variant="body-lg" className="mx-auto mt-4 max-w-2xl text-slate-600">
              Each module plugs directly into {product.name} and can be deployed independently based on your needs.
            </Text>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {product.modules.map((mod) => (
                <div
                  key={mod.name}
                  className="rounded-lg border border-terminal-border bg-gray-50 p-5 transition-all duration-300 hover:border-accent/15"
                >
                  <Heading level={4} className="text-base text-gray-900">
                    {mod.name}
                  </Heading>
                  <Text variant="body-sm" className="mt-2 text-slate-600">
                    {mod.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="container-content">
          <Text variant="overline" className="text-accent">
            How It Works
          </Text>
          <Heading level={2} className="mt-2 text-gray-900">
            Three Steps to Get Started
          </Heading>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {product.howItWorks.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent text-h4 font-bold">
                  {step.step}
                </div>
                <Heading level={4} className="mt-4 text-gray-900">
                  {step.title}
                </Heading>
                <Text variant="body-sm" className="mt-2 text-slate-600">
                  {step.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section-padding bg-white">
        <div className="container-content text-center">
          <Text variant="overline" className="text-accent">
            Integrations
          </Text>
          <Heading level={2} className="mt-2 text-gray-900">
            Built to Connect
          </Heading>
          <Text variant="body-lg" className="mx-auto mt-4 max-w-2xl text-slate-600">
            {product.name} works with your existing infrastructure through standard protocols and APIs.
          </Text>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-4">
            {product.integrations.map((integration) => (
              <span
                key={integration}
                className="rounded-full border border-terminal-border bg-gray-50 px-5 py-2 text-body-sm font-medium font-mono text-primary"
              >
                {integration}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="section-padding bg-gray-50">
        <div className="container-content">
          <Text variant="overline" className="text-accent">
            Related Products
          </Text>
          <Heading level={2} className="mt-2 text-gray-900">
            Explore the FIT Suite
          </Heading>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProducts.map((rp) => (
              <ProductCard
                key={rp.slug}
                name={rp.name}
                description={rp.description}
                icon={rp.icon}
                href={`/products/${rp.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        heading={`Ready to see ${product.name} in action?`}
        subtext="Get a personalized demo from our team or download the product datasheet."
        buttonLabel={product.primaryCta.label}
        buttonHref={product.primaryCta.href}
        secondaryLabel={product.secondaryCta.label}
        secondaryHref={product.secondaryCta.href}
      />
    </>
  );
}
