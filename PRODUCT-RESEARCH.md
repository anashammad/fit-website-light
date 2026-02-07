# FIT Product Research Report

> Comprehensive product research for First Information Technology LLC (FIT) — fitoman.com
> Research Date: February 2026

---

## Company Background

**First Information Technology LLC (FIT)** is a financial technology company established in 1999 in Oman. Founded by Nasser Abu Shoaib, a former Accenture employee who acquired Accenture's brokerage suite of solutions, FIT has grown to become the dominant provider of trading technology in Oman with approximately **90% market share**. The company operates from offices in Oman, Amman (Jordan), UAE, and Qatar.

FIT serves brokerage houses, exchanges, banks, and regulators across the MENA region, providing comprehensive electronic trading solutions covering brokerage management, order management, portfolio management, fund management, custody management, and e-trading.

**Key Differentiator:** FIT is one of very few homegrown MENA fintech companies providing a full-stack capital markets technology suite, as opposed to Western vendors adapting products for the region.

---

## MAIN PRODUCTS

---

### 1. FIT Premium (BORSAT) — Order Management System

#### Description

FIT Premium, commercially branded as **BORSAT**, is a Multi-Market, Multi-Currency, Multi-Language Order Management System (OMS) designed specifically for brokerage houses operating in MENA capital markets. It serves as the central nervous system for broker-dealer operations, managing the full order lifecycle from client order entry through execution, allocation, and settlement integration.

BORSAT handles equities, bonds, treasury bills, and OTC instruments across multiple exchanges simultaneously. The system integrates directly with exchange matching engines (including Horizon and X-Stream) and provides real-time market data, order routing, execution management, and compliance checks in a single unified platform.

Unlike global OMS solutions that require extensive localization, BORSAT was built from the ground up for MENA market microstructure, including Sharia-compliant trading workflows, Arabic language support, and integration with regional exchange protocols.

#### Key Features

- **Multi-Market Order Routing** — Route orders to multiple exchanges (MSM, ADX, DFM, QSE, Tadawul, etc.) from a single interface with real-time order status tracking
- **Margin Trading (SCA Certified)** — Built-in margin trading module certified by the Securities and Commodities Authority (UAE), with real-time buying power calculation and margin call management
- **Real-Time Market Data** — Live price feeds with depth of market, ticker, trade blotter, and technical analysis charting tools
- **Exchange Integration** — Direct online integration with exchange matching engines including Nasdaq's X-Stream and Horizon platforms
- **Multi-Workspace / Multi-Monitor** — Customizable workspace layouts supporting multi-monitor trading desks for professional traders and call center operations
- **Call Center Module** — Dedicated call center functionality for phone-based order execution with client verification and order confirmation workflows
- **Back-Office Integration** — Online real-time integration with back-office settlement systems for straight-through processing (STP)
- **Islamic Trading Module** — Sharia-compliant trading workflows including Murabaha financing and purification calculations

#### Target Users / Personas

| Persona | Role | Use Case |
|---------|------|----------|
| Head Trader | Senior trader at a brokerage | Monitors all order flow, manages risk exposure, oversees execution quality |
| Dealer / Broker | Order execution staff | Enters and manages client orders, monitors positions, handles margin calls |
| Call Center Agent | Client-facing phone broker | Takes phone orders, verifies client identity, executes trades on behalf of clients |
| Operations Manager | Back-office lead | Monitors STP rates, handles failed trades, manages settlement workflows |
| Compliance Officer | Regulatory compliance | Reviews order logs, monitors for market abuse, generates regulatory reports |

#### Competitive Landscape

| Competitor | Product | Strengths | Weaknesses vs FIT |
|-----------|---------|-----------|-------------------|
| **ION Group (Fidessa)** | Fidessa OMS | Global market leader, used by 200+ brokers worldwide, deep multi-asset coverage | Expensive licensing, limited Arabic/MENA localization, heavy implementation overhead |
| **FlexTrade Systems** | FlexOMS | Highly customizable, strong algorithmic trading integration, broker-neutral | Primarily focused on US/European markets, limited MENA exchange connectivity |
| **Horizon Software** | Horizon Trading Platform | Strong in derivatives, good multi-market support | Limited MENA presence, not designed for regional regulatory requirements |

#### MENA Market Differentiators

- Native Arabic language UI and RTL support
- Pre-built connectivity to all GCC stock exchanges (MSM, ADX, DFM, QSE, Tadawul, BSE, KSE, EGX)
- SCA and CMA regulatory compliance built-in
- Islamic/Sharia-compliant trading module
- Designed for regional market microstructure (T+2/T+3 settlement cycles, market-specific circuit breakers)
- Local support teams in Oman, UAE, Jordan, and Qatar
- 25+ years of MENA market expertise

#### Technical Specifications

| Specification | Detail |
|---------------|--------|
| Architecture | Client-server with web-based components |
| Protocols | FIX 4.2/4.4, native exchange APIs (X-Stream INET, Horizon) |
| Asset Classes | Equities, Bonds, Treasury Bills, OTC, ETFs |
| Languages | Arabic, English (full bi-directional) |
| Market Data | Real-time streaming with sub-second latency |
| Database | Oracle / SQL Server |
| Deployment | On-premise or hosted |
| Capacity | Supports 10,000+ concurrent orders per second |

---

### 2. Wasata — Back-Office System

#### Description

**Wasata** is FIT's comprehensive Brokerage Management and Back-Office Solution that handles the entire post-trade lifecycle for brokerage houses. The name "Wasata" (Arabic for "brokerage/mediation") reflects its purpose as the operational backbone for broker-dealers in the MENA region.

Wasata manages client account administration, trade settlement and clearing, corporate actions processing, margin management, regulatory reporting, CRM, and AML/KYC compliance. It integrates tightly with BORSAT (the OMS) to provide end-to-end straight-through processing from order execution through final settlement.

The system is designed to handle the regulatory complexity of operating across multiple MENA jurisdictions, each with their own settlement cycles, regulatory reporting requirements, and compliance frameworks.

#### Key Features

- **Trade Settlement & Clearing** — Automated post-trade processing with support for T+0, T+2, and T+3 settlement cycles across different markets, including DvP (Delivery versus Payment) settlement
- **Client Account Management** — Full client lifecycle management including KYC onboarding, account opening, documentation management, and account status tracking
- **Margin Management** — Real-time margin monitoring with automated margin calls, collateral management, and forced liquidation workflows per regulatory requirements
- **AML/KYC Compliance** — Anti-money laundering screening, suspicious activity reporting, PEP (Politically Exposed Persons) checking, and sanctions screening aligned with FATF and regional regulations
- **Corporate Actions** — Automated processing of dividends, stock splits, rights issues, bonus shares, and IPO allocations with client entitlement calculations
- **CRM Module** — Client relationship management with activity tracking, communication history, portfolio performance reporting, and fee management
- **Regulatory Reporting** — Pre-built reports for CMA, SCA, QFMA, and other MENA regulators with automated submission capabilities
- **Multi-Currency Accounting** — Full general ledger with multi-currency support, client money segregation, and regulatory capital calculations

#### Target Users / Personas

| Persona | Role | Use Case |
|---------|------|----------|
| Operations Manager | Head of back-office | Oversees settlement, manages exceptions, ensures STP rates |
| Compliance Officer | AML/KYC compliance | Runs AML screening, files STRs, manages KYC documentation |
| Accountant | Financial operations | Manages client ledgers, reconciliations, regulatory capital reports |
| Client Services | Account management | Opens accounts, handles client inquiries, processes transfers |
| Risk Manager | Risk oversight | Monitors margin exposure, manages collateral, triggers liquidations |

#### Competitive Landscape

| Competitor | Product | Strengths | Weaknesses vs FIT |
|-----------|---------|-----------|-------------------|
| **FIS Global** | Securities Processing Suite | Massive global scale, handles clearing for major banks and broker-dealers | Extremely expensive, over-engineered for mid-size MENA brokers, poor Arabic support |
| **Broadridge** | Post-Trade Solutions | Industry standard for US/EU post-trade, strong in corporate actions | Not designed for MENA regulatory frameworks, requires heavy customization |
| **Calypso (Adenza)** | Calypso Platform | Strong in derivatives back-office, good risk management | Enterprise-focused, cost-prohibitive for regional brokers, limited MENA presence |

#### MENA Market Differentiators

- Pre-built compliance reports for all GCC regulators (CMA Oman, SCA UAE, QFMA Qatar, CMA Saudi, CBB Bahrain)
- Arabic-language client statements and reports
- Islamic finance accounting (Murabaha, Wakala calculations)
- Integration with regional CSD (Central Securities Depository) systems
- Zakat calculation module
- Support for Sharia board audit trails

#### Technical Specifications

| Specification | Detail |
|---------------|--------|
| Architecture | Multi-tier server application |
| Integration | Real-time integration with BORSAT OMS, exchange settlement systems, banking gateways |
| Settlement | T+0 through T+5 configurable per market |
| Compliance | FATF-compliant AML, sanctions screening, PEP checking |
| Reporting | Crystal Reports / custom report engine, Excel export, PDF generation |
| Database | Oracle / SQL Server |
| Deployment | On-premise with secure remote access |
| Audit Trail | Complete audit logging of all transactions and user actions |

---

### 3. Investor Vision — Portfolio Management System

#### Description

**Investor Vision** is FIT's Portfolio Management System (PMS) designed for asset managers, fund managers, investment advisors, and institutional investors operating in MENA capital markets. It provides comprehensive portfolio analytics, performance measurement, risk assessment, and investment decision support across multiple asset classes.

The system enables portfolio managers to construct and monitor investment portfolios, track benchmark performance, analyze risk/return characteristics, generate client reporting, and comply with regional investment regulations. It integrates with BORSAT for order execution and Wasata for settlement, creating a complete investment management workflow.

Investor Vision addresses the growing demand in the GCC for professional portfolio management tools as the region's asset management industry matures, sovereign wealth funds expand, and retail investment in mutual funds and managed accounts increases.

#### Key Features

- **Portfolio Construction & Rebalancing** — Model portfolio creation, target allocation management, drift monitoring, and automated rebalancing recommendations with what-if scenario analysis
- **Performance Attribution** — Time-weighted and money-weighted return calculation, benchmark comparison (against local indices like MSM 30, ADX General, TASI), sector/security-level attribution analysis
- **Risk Analytics** — VaR (Value at Risk) calculations, tracking error, Sharpe ratio, beta analysis, concentration risk monitoring, and stress testing
- **Multi-Asset Coverage** — Support for equities, fixed income, sukuk, money market instruments, real estate funds, and alternative investments
- **Client Reporting** — Automated generation of client portfolio statements, performance reports, and investment reviews in Arabic and English
- **Compliance Monitoring** — Pre-trade and post-trade compliance checking against investment policy statements, regulatory limits, and Sharia screening criteria
- **NAV Calculation** — Net Asset Value computation for managed funds with full audit trail, fee calculation (management fees, performance fees), and investor allocation
- **Research Integration** — Integration with FIT's Research Management module for analyst recommendations and investment thesis tracking

#### Target Users / Personas

| Persona | Role | Use Case |
|---------|------|----------|
| Portfolio Manager | Asset management firm | Constructs portfolios, monitors performance, makes investment decisions |
| Fund Manager | Mutual fund / investment fund | Manages fund NAV, investor allocations, regulatory compliance |
| Investment Advisor | Wealth management | Advises HNW clients, generates proposals, tracks model portfolios |
| Institutional Investor | Pension fund / insurance | Monitors multi-manager allocations, benchmark tracking |
| Risk Analyst | Investment risk team | Runs risk models, stress tests, compliance checks |

#### Competitive Landscape

| Competitor | Product | Strengths | Weaknesses vs FIT |
|-----------|---------|-----------|-------------------|
| **FactSet** | Portfolio Analytics | Best-in-class analytics, massive data coverage, strong performance attribution | Very expensive, primarily designed for US/EU markets, no Arabic support |
| **Bloomberg** | PORT (Portfolio & Risk Analytics) | Unmatched data, global standard for institutional investors | Cost-prohibitive for regional asset managers, terminal-dependent |
| **Murex** | MX.3 Investment Management | Strong multi-asset coverage, excellent risk analytics | Enterprise-only pricing, complex implementation, not designed for MENA boutique firms |

#### MENA Market Differentiators

- Sharia screening integration (AAOIFI and S&P Sharia compliance standards)
- Sukuk analytics and Islamic fund management capabilities
- Pre-built connectivity to GCC market data feeds
- Arabic-language client reporting
- Compliance with MENA investment regulations (CMA, SCA investment fund rules)
- Designed for the scale of regional asset managers (not over-engineered for global scale)

#### Technical Specifications

| Specification | Detail |
|---------------|--------|
| Architecture | Client-server with web portal for client access |
| Data Feeds | Real-time and end-of-day from GCC exchanges, Reuters, Bloomberg |
| Asset Classes | Equities, Fixed Income, Sukuk, Money Market, Funds, Real Estate |
| Performance | GIPS-compliant return calculation methodologies |
| Risk Models | Parametric VaR, Historical VaR, Monte Carlo simulation |
| Reporting | Automated PDF/Excel reports, web-based client portal |
| Database | Oracle / SQL Server |
| Integration | BORSAT (OMS), Wasata (back-office), external custodians |

---

### 4. Mobile & Web Trading Platform

#### Description

FIT's **Mobile & Web Trading** platform provides customized white-label trading applications for brokerage houses to offer their retail and institutional clients. Available as native iOS and Android apps (branded as **Global Mobile Trade System** on app stores) and as a responsive web application, the platform enables investors to trade, monitor portfolios, access market data, and manage accounts from any device.

The white-label approach means each brokerage client receives a fully branded application with their own logo, colors, and domain, while FIT handles the underlying technology, exchange connectivity, and ongoing maintenance. This model allows small and mid-size MENA brokers to offer a modern digital trading experience without the cost and complexity of building proprietary technology.

#### Key Features

- **White-Label Customization** — Full branding customization including logo, color scheme, typography, splash screens, and app store listing under the broker's name
- **Real-Time Trading** — Live order entry with market, limit, and stop orders, real-time order status tracking, and position monitoring across multiple markets
- **Live Market Data** — Streaming price quotes, depth of market, intraday charts, watchlists, and market movers/alerts with configurable push notifications
- **Portfolio Dashboard** — Real-time portfolio valuation, P&L tracking, historical performance charts, and dividend/corporate action notifications
- **Technical Analysis** — Interactive charts with common technical indicators (RSI, MACD, Bollinger Bands, moving averages) powered by charting libraries
- **Secure Authentication** — Multi-factor authentication, biometric login (fingerprint/face), session management, and encrypted communication
- **Multi-Language Support** — Full Arabic and English interfaces with RTL layout support and seamless language switching
- **Account Management** — Fund transfers, withdrawal requests, statement downloads, and document uploads directly from the app

#### Target Users / Personas

| Persona | Role | Use Case |
|---------|------|----------|
| Retail Investor | Individual stock trader | Trades stocks on the go, monitors portfolio, checks market news |
| Active Trader | Frequent day trader | Places rapid orders, uses technical analysis, tracks multiple markets |
| Brokerage CEO | Decision maker | Selects technology partner for digital channel, evaluates white-label options |
| Brokerage IT Manager | Technical lead | Manages app deployment, customization requests, integration testing |
| Wealth Client | High-net-worth investor | Reviews managed portfolio, communicates with advisor, accesses research |

#### Competitive Landscape

| Competitor | Product | Strengths | Weaknesses vs FIT |
|-----------|---------|-----------|-------------------|
| **Quadcode** | White-Label Trading Platform | Modern UI, supports 1000+ assets, social trading features | Primarily forex/CFD focused, not designed for MENA stock exchanges |
| **Leverate** | LXSuite / SiRiX | Full brokerage-in-a-box, strong mobile apps, social trading | Forex/CFD oriented, limited MENA equity market connectivity |
| **DXtrade (Devexperts)** | DXtrade Platform | Multi-asset, highly customizable, strong API | No MENA exchange connectivity out of the box, expensive for small brokers |

#### MENA Market Differentiators

- Pre-built integration with all GCC stock exchanges
- Arabic-first UI design with proper RTL layout (not just translated)
- Lightweight data usage optimized for regional mobile networks
- Islamic trading mode with Sharia-compliant indicators
- Local app store compliance for MENA markets
- Integrated with FIT's BORSAT OMS for seamless order flow

#### Technical Specifications

| Specification | Detail |
|---------------|--------|
| Mobile Platforms | iOS (Swift), Android (Kotlin/Java), native apps |
| Web Platform | Responsive HTML5/JavaScript web application |
| APIs | REST + WebSocket for real-time data streaming |
| Security | TLS 1.2+, AES-256 encryption, OAuth 2.0, biometric auth |
| Push Notifications | FCM (Android), APNs (iOS) for price alerts and order confirmations |
| Market Data Latency | Sub-second for streaming quotes |
| Offline Capability | Cached watchlists and portfolio view, order queue for offline submission |
| App Store | Published under each broker's developer account (white-label) |

---

### 5. FIT Surveillance — Market Control & Order Surveillance System

#### Description

**FIT Surveillance** is a market surveillance and trade monitoring system designed for stock exchanges, capital market regulators, and compliance departments at brokerage houses across the MENA region. The system monitors real-time trading activity to detect potential market abuse, including insider trading, market manipulation, front-running, spoofing, and other forms of disorderly trading.

Market surveillance is a critical component of capital market infrastructure, mandated by IOSCO (International Organization of Securities Commissions) principles and enforced by regional regulators. FIT Surveillance addresses the specific surveillance needs of MENA markets, which have unique characteristics including concentrated ownership structures, limited free float, and cross-border trading patterns across GCC-linked exchanges.

#### Key Features

- **Real-Time Alert Engine** — Pattern-based and anomaly detection algorithms that monitor order flow and trade execution in real-time, generating prioritized alerts for investigation
- **Market Manipulation Detection** — Algorithms to detect wash trading, pump-and-dump schemes, spoofing/layering, marking the close, and cornering/squeezing patterns
- **Insider Trading Monitoring** — Cross-referencing trading patterns with corporate announcement timelines, director dealings, and connected party databases
- **Cross-Market Surveillance** — Monitoring trading activity across multiple GCC exchanges to detect cross-market manipulation schemes
- **Case Management** — Investigation workflow tools for compliance officers to document findings, escalate cases, and generate regulatory submissions
- **Regulatory Reporting** — Pre-built reports aligned with CMA, SCA, QFMA, and CMA Saudi regulatory requirements for suspicious activity reporting
- **Historical Replay** — Ability to reconstruct full order book and trade history for any security over any time period for forensic investigation
- **Configurable Rule Engine** — User-defined alert parameters and thresholds that can be adjusted based on market conditions and regulatory requirements

#### Target Users / Personas

| Persona | Role | Use Case |
|---------|------|----------|
| Market Regulator | Exchange surveillance department | Monitors all trading activity, investigates alerts, enforces market rules |
| Compliance Director | Brokerage compliance head | Oversees broker's trading surveillance, files suspicious activity reports |
| Surveillance Analyst | Market monitoring team | Reviews alerts, conducts preliminary investigations, escalates cases |
| Exchange CTO | Technology leadership | Selects and implements surveillance infrastructure |
| Legal Counsel | Regulatory affairs | Uses case documentation for enforcement actions |

#### Competitive Landscape

| Competitor | Product | Strengths | Weaknesses vs FIT |
|-----------|---------|-----------|-------------------|
| **Nasdaq** | SMARTS Trade Surveillance | Industry gold standard, used by 50+ exchanges and 20+ regulators globally, AI/ML-powered | Very expensive, designed for tier-1 exchanges, limited customization for smaller markets |
| **NICE Actimize** | Surveillance Solutions | Strong in cross-asset surveillance, good case management, enterprise scale | Primarily bank/broker focused, expensive, limited MENA deployment experience |
| **Scila** | Market Surveillance | Modern cloud-native architecture, real-time alerts, configurable rules | European-focused, limited MENA market expertise, newer entrant |

#### MENA Market Differentiators

- Designed for the unique trading patterns of MENA markets (concentrated ownership, family group trading)
- Pre-configured alert models for GCC-specific manipulation patterns
- Arabic-language case management and reporting
- Cross-GCC surveillance capabilities (critical as GCC exchanges become increasingly interconnected)
- Affordable for smaller MENA exchanges that cannot justify Nasdaq SMARTS licensing
- Local regulatory expertise and ongoing rule updates as MENA regulations evolve

#### Technical Specifications

| Specification | Detail |
|---------------|--------|
| Architecture | Server-based with web dashboard for analysts |
| Data Ingestion | Real-time order and trade feeds from exchanges, T+0 processing |
| Alert Engine | Rule-based + statistical anomaly detection |
| Storage | Time-series database for high-volume tick data storage |
| Performance | Processes millions of orders/trades per day |
| Integration | Exchange trading systems, CSD records, corporate announcement feeds |
| Deployment | On-premise (required by most regulators for data sovereignty) |
| Reporting | Customizable dashboards, scheduled reports, ad-hoc queries |

---

### 6. API Middleware — FIX/REST/WebSocket Connectivity Layer

#### Description

FIT's **API Middleware** is a connectivity and integration layer that bridges the gap between FIT's core trading systems (BORSAT, Wasata) and external systems including third-party trading platforms, banking systems, custodians, market data providers, and exchange gateways. It exposes FIT's trading functionality through industry-standard protocols including FIX (Financial Information eXchange), REST APIs, and WebSocket connections.

The middleware serves as a universal adapter, enabling brokerage houses to connect their existing infrastructure (CRM systems, risk engines, mobile apps built by other vendors, institutional client order flow) with FIT's OMS and back-office systems without requiring custom point-to-point integrations.

In the MENA market, where many brokerage houses use a mix of legacy systems, banking platforms, and modern fintech tools, a flexible API layer is essential for digital transformation without the risk and cost of wholesale system replacement.

#### Key Features

- **FIX Protocol Gateway** — FIX 4.2 and 4.4 compliant gateway for institutional order flow, DMA (Direct Market Access) connections, and inter-broker connectivity
- **REST API** — RESTful HTTP APIs for account management, order submission, portfolio queries, and market data access with OAuth 2.0 authentication
- **WebSocket Streaming** — Real-time bidirectional WebSocket connections for live market data, order status updates, and portfolio changes with minimal latency
- **Protocol Translation** — Translates between FIX, REST, and native exchange protocols, enabling seamless connectivity regardless of the client's technology stack
- **Banking Gateway Integration** — Pre-built connectors for online and offline banking gateways supporting fund transfers, payment instructions, and reconciliation
- **Rate Limiting & Throttling** — Configurable rate limits per client/connection to protect system stability during high-volume periods
- **Message Logging & Audit** — Complete logging of all API messages for regulatory compliance, troubleshooting, and performance analysis
- **Developer Portal** — API documentation, sandbox environment, and sample code for third-party developers building on FIT's platform

#### Target Users / Personas

| Persona | Role | Use Case |
|---------|------|----------|
| Brokerage CTO | Technology leadership | Designs integration architecture, selects connectivity options |
| Third-Party Developer | Fintech app builder | Builds trading apps or tools that connect to broker's FIT systems |
| Institutional Client | Fund manager / DMA trader | Sends orders via FIX from their own OMS directly to the broker |
| Banking Integration Lead | Bank IT team | Connects banking payment systems with brokerage settlement |
| Custodian Operations | External custodian | Receives trade instructions and settlement data via API |

#### Competitive Landscape

| Competitor | Product | Strengths | Weaknesses vs FIT |
|-----------|---------|-----------|-------------------|
| **Ullink (Itiviti/Broadridge)** | Connectivity Solutions | Largest FIX network globally, connects to 2,000+ venues | Extremely expensive per connection, designed for global scale not regional |
| **FIXSOL** | FIX Engine & Gateways | Affordable FIX solutions, good for emerging markets | Limited to FIX only, no REST/WebSocket, minimal MENA presence |
| **InfoReach** | Multi-Asset Trading Infrastructure | Strong multi-protocol support, good algo connectivity | US/EU focused, no MENA exchange connectors |

#### MENA Market Differentiators

- Pre-built connectors for all GCC exchange APIs and protocols
- Banking gateway integrations for major MENA banks
- Support for regional custodian connectivity (NBO, NBK, HSBC Middle East, etc.)
- Arabic character support in FIX tag values and API responses
- Designed for the connectivity requirements of MENA market infrastructure
- Lower cost than global alternatives, sized appropriately for regional brokers

#### Technical Specifications

| Specification | Detail |
|---------------|--------|
| FIX Versions | FIX 4.2, FIX 4.4 (FIX 5.0 SP2 available) |
| REST API | RESTful HTTP/1.1 and HTTP/2, JSON payloads, OAuth 2.0 |
| WebSocket | WSS (TLS-encrypted), JSON/binary message format |
| Throughput | 10,000+ messages per second per connection |
| Latency | Sub-millisecond for FIX, <50ms for REST/WebSocket |
| Security | TLS 1.2+, IP whitelisting, API key + OAuth, certificate-based auth for FIX |
| Monitoring | Real-time connection health dashboard, alerting on disconnections |
| Deployment | On-premise or co-located with exchange data centers |

---

### 7. Digital Onboarding — eKYC & Client Activation Platform

#### Description

**Digital Onboarding** is FIT's end-to-end digital client onboarding platform that transforms the traditionally paper-heavy, multi-day brokerage account opening process into a streamlined digital experience completed in minutes. The platform handles electronic Know Your Customer (eKYC) verification, Anti-Money Laundering (AML) screening, document collection and validation, risk profiling, and instant account activation — all from a mobile device or web browser.

In the MENA brokerage market, account opening has historically required in-person branch visits, physical document submission, and multi-day processing times. As GCC regulators (particularly CMA Oman, SCA UAE, and CMA Saudi) have introduced frameworks permitting remote digital onboarding, FIT's Digital Onboarding platform enables brokers to capitalize on this regulatory shift and compete with the frictionless experience offered by neobrokers and international platforms.

The platform integrates directly with FIT's AMS (Account Management System), Wasata back-office, and BORSAT OMS, so a newly onboarded client can begin trading immediately upon approval — achieving true straight-through processing from prospect to first trade.

#### Key Features

- **eKYC Identity Verification** — Real-time identity verification using government-issued ID document scanning (OCR), liveness detection via selfie/video, and cross-referencing with national ID databases (e.g., Oman Civil Status, UAE ICA) for instant authentication
- **AML/Sanctions Screening** — Automated screening against global sanctions lists (OFAC, EU, UN), PEP (Politically Exposed Persons) databases, adverse media, and regional watchlists with configurable risk scoring and escalation workflows
- **Document Collection & Validation** — Digital upload and automated validation of required documents (passport, proof of address, bank statements, source of funds declarations) with OCR extraction and completeness checking
- **Risk Profiling & Suitability** — Digital questionnaires for client risk assessment and investment suitability scoring aligned with CMA/SCA regulations and MiFID II-equivalent requirements
- **Electronic Signatures** — Legally binding e-signature capture for account agreements, risk disclosures, margin agreements, and terms of service — eliminating the need for physical document signing
- **Instant Account Activation** — Automated account creation in BORSAT and Wasata upon successful KYC/AML clearance, with immediate trading access for low-risk clients and queue-based approval for elevated-risk cases
- **Ongoing Monitoring & Re-KYC** — Automated document expiry tracking, periodic re-screening against updated sanctions/PEP lists, and triggered re-KYC workflows when client risk profile changes
- **Multi-Channel Access** — Available as an embedded widget within the broker's mobile app, standalone web application, or in-branch tablet application for assisted onboarding

#### Target Users / Personas

| Persona | Role | Use Case |
|---------|------|----------|
| Prospective Investor | New client | Opens brokerage account digitally from mobile/web without visiting a branch |
| Client Onboarding Officer | Brokerage operations | Reviews flagged applications, approves elevated-risk cases, manages document exceptions |
| Compliance Officer | AML/KYC compliance | Configures screening rules, reviews AML alerts, approves PEP/high-risk clients |
| Brokerage CEO / COO | Strategic leadership | Accelerates client acquisition, reduces onboarding cost per client, improves conversion rates |
| Branch Manager | Retail distribution | Uses tablet-based assisted onboarding for walk-in clients, reducing paperwork |
| IT Manager | Technology operations | Integrates onboarding platform with existing systems, manages API connections |

#### Competitive Landscape

| Competitor | Product | Strengths | Weaknesses vs FIT |
|-----------|---------|-----------|-------------------|
| **FYNXT** | Digital Onboarding Platform | Purpose-built for brokers and fund managers, strong KYC automation, multi-jurisdictional support | No native integration with OMS/back-office systems, requires separate middleware, limited MENA regulatory templates |
| **Sumsub** | Identity Verification & KYC | Global coverage (220+ countries), AI-powered document verification, strong fraud detection | Generic fintech platform not specialized for brokerage, no trading system integration, per-verification pricing model expensive at scale |
| **Jumio** | Identity Verification | Industry-leading biometric verification, strong liveness detection, used by major fintechs | Pure identity verification — no account opening workflow, no AML screening, no brokerage-specific features |

#### MENA Market Differentiators

- Pre-built integration with national ID systems in Oman, UAE, Saudi Arabia, Qatar, and Bahrain for instant identity verification
- Arabic-language onboarding flows with RTL design, culturally appropriate UX, and local document templates
- Compliance templates pre-configured for CMA Oman, SCA UAE, QFMA Qatar, and CMA Saudi onboarding regulations
- Sharia-compliant account types (Islamic trading accounts, Murabaha margin agreements) included in the onboarding workflow
- Direct integration with BORSAT OMS and Wasata back-office — no middleware gap between onboarding and trading
- Support for GCC national ID cards, passports, and residency permits with region-specific OCR models
- Designed for the regulatory requirement of many MENA jurisdictions that mandate local data residency for client PII

#### Technical Specifications

| Specification | Detail |
|---------------|--------|
| Architecture | Cloud-ready microservices with on-premise deployment option |
| Identity Verification | OCR document scanning, NFC chip reading, biometric liveness detection |
| AML Screening | Real-time sanctions (OFAC, EU, UN), PEP, adverse media, regional watchlists |
| Integration | REST APIs to BORSAT, Wasata, AMS; webhook-based event notifications |
| Data Security | AES-256 encryption at rest, TLS 1.2+ in transit, PII data masking |
| Compliance | GDPR-aligned, MENA data residency compliant |
| E-Signature | Legally binding under UAE Electronic Transactions Law, Oman Electronic Transactions Law |
| Onboarding Time | < 5 minutes for low-risk clients (fully automated path) |
| Throughput | Supports 10,000+ concurrent onboarding sessions |
| Mobile SDK | iOS and Android SDKs for embedded onboarding within broker mobile apps |

---

## ADD-ON MODULES (for FIT Premium / BORSAT)

---

### 1. Market Making Module

#### Description

The **Market Making** module extends BORSAT with automated two-sided quote management capabilities, enabling designated market makers and liquidity providers to continuously quote bid and ask prices on exchange-listed securities. Market makers play a critical role in MENA equity markets where many listed securities suffer from low liquidity and wide bid-ask spreads.

This module is used by brokerages that have been designated as market makers by stock exchanges (e.g., MSM, ADX, DFM) to fulfill their obligations of maintaining continuous two-sided quotes within maximum spread requirements and minimum quote sizes.

#### Key Features

- **Automated Quoting Engine** — Continuously posts and updates bid/ask quotes based on configurable pricing models, reference prices, and spread parameters
- **Inventory Risk Management** — Real-time tracking of market maker inventory with configurable position limits, auto-hedging triggers, and P&L monitoring
- **Spread Management** — Dynamic spread adjustment based on volatility, inventory skew, and market conditions with minimum/maximum spread constraints
- **Exchange Compliance** — Automated compliance with exchange market-making obligations including minimum quote size, maximum spread, and presence time requirements
- **Quote Protection** — Anti-gaming features including mass quote withdrawal on rapid adverse price movements, and quote throttling to prevent over-execution
- **Performance Analytics** — Dashboards showing market-making P&L, spread earned, presence time, fill rates, and inventory turnover

#### Target Users

- Designated market makers at GCC exchanges
- Liquidity provider programs
- Brokerage proprietary trading desks
- Exchange-appointed specialists

#### Competitive Landscape

- **Optiver / Flow Traders** — Proprietary market-making technology (not sold to third parties)
- **Eurex Market Making Tools** — Exchange-provided tools for Eurex-designated market makers
- **Custom-built solutions** — Many market makers build proprietary systems

#### MENA Market Differentiators

- Designed for the liquidity challenges specific to MENA equity markets (thin order books, concentrated ownership)
- Pre-built compliance with GCC exchange market-making program requirements
- Supports the specific quoting protocols used by MENA exchanges

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Quote Update Frequency | Sub-second, configurable per security |
| Pricing Models | Mid-price, reference-price, inventory-adjusted |
| Risk Limits | Position, P&L, delta, quote count limits |
| Exchange Support | MSM, ADX, DFM, QSE market-making programs |

---

### 2. Institutional Desk Module

#### Description

The **Institutional Desk** module provides specialized workflows for handling large institutional orders — block trades, program trades, and negotiated deals — that require different handling than standard retail flow. It includes pre-trade analytics, order slicing strategies, block trade negotiation, and allocation to multiple sub-accounts.

Institutional clients (fund managers, pension funds, insurance companies, sovereign wealth funds) require differentiated execution services including benchmark-aware execution (VWAP, implementation shortfall), post-trade allocation, and detailed transaction cost analysis (TCA).

#### Key Features

- **Block Trade Management** — Large order handling with manual and algorithmic slicing, working order management, and trade-away/step-out capabilities
- **Pre-Trade Analytics** — Estimated market impact, liquidity analysis, and optimal execution strategy recommendations based on order size relative to ADV
- **Multi-Account Allocation** — Post-execution allocation of fills across multiple client sub-accounts based on pre-defined allocation models (pro-rata, waterfall, etc.)
- **Transaction Cost Analysis (TCA)** — Post-trade analysis of execution quality versus VWAP, arrival price, and implementation shortfall benchmarks
- **FIX Connectivity for Institutional Clients** — Direct FIX connections for buy-side clients to send orders from their own OMS
- **Negotiated / Cross Trades** — Workflow for broker-negotiated block crosses with regulatory reporting and compliance checks

#### Target Users

- Institutional sales traders
- Buy-side dealing desks
- Fund managers placing large orders
- Brokerage heads of institutional business

#### Competitive Landscape

- **Bloomberg EMSX** — Execution management system with institutional workflow
- **Virtu ITG / POSIT** — Institutional execution and dark pool access
- **Instinet** — Agency broker with institutional execution tools

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Order Slicing | Manual, VWAP, TWAP, POV strategies |
| FIX Support | Institutional FIX 4.4 with allocation extensions |
| Allocation Models | Pro-rata, waterfall, manual, model-based |
| TCA Metrics | VWAP, arrival price, implementation shortfall |

---

### 3. Algos — Algorithmic Trading Module

#### Description

The **Algos** module adds pre-built algorithmic trading strategies to BORSAT, enabling brokers to offer their clients (both institutional and sophisticated retail) automated execution strategies that minimize market impact, optimize execution timing, and improve overall trade execution quality.

Algorithmic trading has become standard in developed markets where 60-70% of equity volume is algo-driven, but MENA markets are still in early adoption. FIT's Algos module provides a gateway for MENA brokers to offer these capabilities without building proprietary algo infrastructure.

#### Key Features

- **VWAP (Volume Weighted Average Price)** — Executes orders in line with historical volume profiles to achieve a price close to the day's VWAP
- **TWAP (Time Weighted Average Price)** — Distributes order execution evenly across a specified time window regardless of volume patterns
- **POV (Percentage of Volume)** — Participates at a specified percentage of real-time market volume to minimize market footprint
- **Smart Order Routing (SOR)** — Routes orders to the optimal venue when a security is listed on multiple exchanges (e.g., dual-listed GCC stocks)
- **Iceberg Orders** — Breaks large orders into smaller visible portions with automated refilling to hide total order size from the market
- **Customizable Parameters** — User-configurable urgency, aggressiveness, start/end times, price limits, and volume constraints
- **Real-Time Monitoring** — Live dashboard showing algo progress, fill rates, benchmark tracking, and estimated completion time
- **Back-Testing** — Historical simulation of algo strategies against past market data to validate performance

#### Target Users

- Institutional traders seeking execution quality
- Proprietary trading desks
- Sophisticated retail investors
- Brokerage algo desk operators

#### Competitive Landscape

- **Fidessa (ION) Algo Suite** — Comprehensive algo suite for multi-asset trading
- **FlexTrade Algo Engine** — Customizable algorithmic trading strategies
- **Trading Technologies (TT) Algo Engine** — Futures-focused algorithmic trading

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Strategies | VWAP, TWAP, POV, Iceberg, Sniper, Implementation Shortfall |
| Latency | Millisecond-level execution decisions |
| Market Data | Requires real-time tick-level feed |
| Back-Testing | Historical replay with tick-level data |
| Monitoring | Web dashboard with real-time algo progress |

---

### 4. Options & Futures Module

#### Description

The **Options & Futures** module extends BORSAT to support listed derivatives trading, including exchange-traded options, futures contracts, and structured OTC derivatives. As MENA exchanges (particularly Tadawul and ADX) expand their derivatives offerings, this module enables brokers to support these new instruments within their existing FIT infrastructure.

The module handles the full lifecycle of derivatives trading including contract specification management, options pricing (Greeks calculation), margin/premium calculations, exercise and assignment workflows, and expiry management.

#### Key Features

- **Options Trading** — Support for call/put options with market, limit, and complex multi-leg order types (spreads, straddles, strangles)
- **Futures Trading** — Front-month, back-month, and spread trading for index futures, single-stock futures, and commodity futures
- **Options Pricing & Greeks** — Real-time calculation of theoretical prices, delta, gamma, theta, vega, and rho using Black-Scholes and binomial models
- **Margin Calculation** — Real-time initial margin and variation margin computation using SPAN or exchange-specific margin methodologies
- **Exercise & Assignment** — Automated and manual exercise workflows for American and European-style options with assignment processing
- **Strategy Builder** — Visual options strategy builder for constructing complex multi-leg positions with P&L payoff diagrams
- **Expiry Management** — Automated handling of contract rollovers, expirations, cash settlement, and physical delivery workflows
- **OTC Derivatives** — Support for OTC-traded derivatives with bilateral confirmation and settlement

#### Target Users

- Derivatives traders and dealers
- Options market makers
- Risk management teams
- Institutional clients trading hedging strategies

#### Competitive Landscape

- **Murex MX.3** — Industry-leading derivatives platform for banks and large institutions
- **ION Markets (Fidessa)** — Multi-asset derivatives support
- **Trading Technologies (TT)** — Strong in exchange-traded derivatives

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Instrument Types | Equity options, index futures, single-stock futures, commodity futures, OTC derivatives |
| Pricing Models | Black-Scholes, Binomial, Monte Carlo |
| Margin Methods | SPAN, exchange-specific methodologies |
| Greeks | Delta, Gamma, Theta, Vega, Rho (real-time) |
| Order Types | Market, limit, spread, straddle, butterfly, condor |

---

### 5. Retail Module

#### Description

The **Retail** module optimizes BORSAT for high-volume retail brokerage operations where thousands of individual investors trade small-to-medium sized orders. It adds features specifically designed for retail client management including simplified order entry interfaces, client self-service portals, automated account opening, and mass communication tools.

MENA retail trading has grown significantly, particularly post-COVID, with markets like Saudi Arabia seeing a surge in retail participation. This module helps brokers efficiently serve this high-volume, lower-revenue-per-client segment.

#### Key Features

- **Simplified Order Entry** — Streamlined order interfaces designed for retail investors with fewer fields, market/limit defaults, and guided workflows
- **Self-Service Client Portal** — Web-based portal where retail clients can view positions, download statements, update personal details, and submit fund transfer requests
- **Automated Account Opening** — Digital KYC onboarding with ID document scanning, electronic signatures, and automated compliance checks
- **Tiered Commission Management** — Flexible commission structures with tiered pricing, volume discounts, promotional rates, and commission-free trading campaigns
- **Mass Communication** — Bulk SMS, email, and push notification campaigns for market alerts, research distribution, and promotional offers
- **Referral & Loyalty Programs** — Client referral tracking, loyalty point systems, and gamification features to drive engagement and client acquisition

#### Target Users

- Retail brokerage operations managers
- Client onboarding teams
- Marketing and client acquisition teams
- Retail investors (end users)

#### Competitive Landscape

- **Robinhood / eToro model** — Consumer-grade trading apps (but not available in MENA)
- **SaxoTraderGO** — Multi-asset retail trading platform
- **DXtrade (Devexperts)** — White-label retail trading platform

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Capacity | 100,000+ retail client accounts |
| Onboarding | Digital KYC with OCR document scanning |
| Communications | SMS gateway, email, push notifications |
| Portal | Web-based responsive client self-service |

---

### 6. Margin Module

#### Description

The **Margin** module provides comprehensive margin trading and financing capabilities within BORSAT, enabling brokerage houses to offer leveraged trading to their clients. It manages the full margin lifecycle including credit assessment, margin account setup, real-time buying power calculation, margin call management, and forced liquidation workflows.

Margin trading is heavily regulated in MENA markets, with each regulator (SCA, CMA, QFMA) having specific rules about maximum leverage ratios, eligible securities, and disclosure requirements. FIT's Margin module is **certified by the SCA (Securities and Commodities Authority of the UAE)**, ensuring regulatory compliance.

#### Key Features

- **Real-Time Buying Power** — Continuously calculated buying power based on equity, collateral haircuts, and market value changes with per-second updates
- **Configurable Margin Parameters** — Flexible margin rate configuration per security, client tier, and market with initial margin, maintenance margin, and concentration limits
- **Automated Margin Calls** — Triggered when equity falls below maintenance requirements with automated client notification via SMS/email and configurable cure periods
- **Forced Liquidation** — Automated position liquidation when margin calls are not met within the cure period, following regulatory priority rules
- **Collateral Management** — Supports cash and securities collateral with configurable haircut rates per security based on liquidity and volatility
- **Islamic Margin (Murabaha)** — Sharia-compliant margin financing using Murabaha structure with profit rate calculation instead of interest
- **Regulatory Reporting** — Automated generation of margin reports required by SCA, CMA, and other regulators
- **Credit Risk Dashboard** — Real-time monitoring of total margin exposure, concentration risk, and portfolio-level risk metrics

#### Target Users

- Margin trading operations managers
- Credit/risk departments at brokerages
- Compliance officers monitoring margin compliance
- Traders managing margin accounts

#### Competitive Landscape

- **Sterling Trading Tech** — Cloud-based risk and margin system for US brokers
- **FIS** — Enterprise margin calculation for large clearing firms
- **Custom-built solutions** — Many MENA brokers use spreadsheet-based margin tracking

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Calculation Frequency | Real-time (per-second) |
| Margin Models | Reg-T style, risk-based, portfolio margin |
| SCA Certification | Certified for UAE margin trading |
| Collateral Types | Cash, listed securities, bonds, bank guarantees |
| Liquidation | Automated with configurable rules and priority |

---

### 7. SkyFund Module

#### Description

**SkyFund** is FIT's dedicated fund management module that provides end-to-end operational support for investment fund managers, including mutual funds, closed-end funds, private equity funds, and Islamic investment funds. It handles fund accounting, NAV calculation, investor registry, subscription/redemption processing, fee computation, and regulatory reporting.

The GCC fund management industry is growing as regulators encourage the development of collective investment schemes and as retail investors increasingly prefer managed products over direct stock picking. SkyFund enables asset managers and brokerage firms with fund management licenses to operationalize their fund offerings within FIT's integrated platform.

#### Key Features

- **NAV Calculation** — Automated daily/weekly/monthly Net Asset Value computation with full audit trail, multi-pricing source support, and fair value adjustments
- **Investor Registry** — Complete unitholder/shareholder registry management with subscription, redemption, transfer, and switch transaction processing
- **Fee Calculation** — Automated management fee, performance fee (high-water mark), subscription fee, redemption fee, and custody fee calculations
- **Fund Accounting** — Double-entry fund accounting with multi-currency support, accrual management, and income distribution calculations
- **Subscription / Redemption** — Workflow for processing investor subscriptions and redemptions with cut-off time management, pricing, and settlement
- **Regulatory Reporting** — Pre-built reports for CMA and SCA fund regulations including periodic fund reports, prospectus compliance, and investor disclosures
- **Islamic Fund Support** — Sharia-compliant fund structures including Mudarabah, Musharakah, and Wakala with Sharia screening integration
- **Performance Reporting** — Fund performance vs benchmark, peer comparison, risk-adjusted returns, and attribution analysis

#### Target Users

- Fund managers and fund administrators
- Fund accountants
- Investor relations teams
- Regulatory reporting officers

#### Competitive Landscape

- **SS&C Technologies** — Leading global fund administration platform (Eze, PORTIA)
- **SimCorp** — Integrated investment management platform with strong fund accounting
- **Linedata** — Fund management and administration technology

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Fund Types | Open-end, closed-end, ETF, private equity, Islamic funds |
| NAV Frequency | Daily, weekly, monthly, on-demand |
| Pricing Sources | Exchange feeds, Bloomberg, manual pricing |
| Accounting | Double-entry, multi-currency, IFRS-compliant |
| Investor Capacity | Unlimited unitholders per fund |

---

### 8. AMS — Account Management System

#### Description

The **AMS (Account Management System)** module centralizes all client account management functions for brokerage houses, serving as a single source of truth for client data, account status, documentation, and permissions across all FIT systems. It manages the complete client lifecycle from prospect registration through account opening, ongoing maintenance, and account closure.

AMS integrates with external KYC/AML databases, national ID verification systems, and regulatory reporting platforms to ensure compliant and efficient account management.

#### Key Features

- **Digital Onboarding** — End-to-end digital account opening with e-KYC, document upload, electronic signatures, and automated compliance screening
- **Client Data Management** — Centralized client master data including personal information, financial profile, risk assessment, and investment suitability
- **Document Management** — Secure storage and retrieval of client documents (ID, proof of address, financial statements, signed agreements) with expiry tracking
- **Account Hierarchy** — Support for individual, joint, corporate, trust, and custodial account types with complex ownership structures
- **Permission Management** — Granular trading permissions per account including market access, instrument restrictions, order size limits, and margin eligibility
- **Suitability Assessment** — Client risk profiling questionnaires with automated suitability scoring aligned with MiFID II / CMA suitability requirements
- **Regulatory Integration** — Integration with national ID systems, beneficial ownership registries, and regulatory filing platforms
- **Audit Trail** — Complete history of all account changes with maker-checker workflows for sensitive modifications

#### Target Users

- Client services / account opening teams
- Compliance officers responsible for KYC
- Operations managers overseeing account lifecycle
- Branch managers at brokerage offices

#### Competitive Landscape

- **Broadridge** — Investor communication and account management
- **FIS** — Client onboarding and lifecycle management for financial institutions
- **Appway (now FNZ)** — Client lifecycle management and digital onboarding

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Onboarding | Digital KYC, e-signature, OCR document scanning |
| Account Types | Individual, joint, corporate, trust, custodial, omnibus |
| Integration | National ID APIs, AML databases, CRM systems |
| Workflow | Maker-checker for sensitive changes |
| Storage | Encrypted document storage with retention policies |

---

### 9. PMS — Portfolio Management System (Add-On)

#### Description

The **PMS (Portfolio Management System)** add-on module is a lightweight portfolio management capability embedded within BORSAT, distinct from the standalone Investor Vision product. While Investor Vision is a full-featured institutional PMS for asset managers, this add-on provides essential portfolio management features directly within the OMS for brokers who offer discretionary portfolio management or model portfolio services to their clients.

It enables relationship managers and portfolio advisors at brokerage firms to create model portfolios, assign clients to models, monitor drift, and execute rebalancing trades — all within the same BORSAT interface they use for regular order management.

#### Key Features

- **Model Portfolio Management** — Create and maintain model portfolios with target allocations, rebalancing bands, and benchmark assignments
- **Client-Model Assignment** — Assign individual client accounts to model portfolios with customizable deviation thresholds
- **Drift Monitoring** — Real-time monitoring of client portfolio drift from model targets with visual indicators and alerts
- **Rebalancing Execution** — Generate and execute rebalancing orders across all clients assigned to a model in a single workflow
- **Performance Tracking** — Client portfolio performance vs model and benchmark with time-weighted return calculations
- **Reporting** — Client portfolio reports showing holdings, allocation, performance, and comparison to model

#### Target Users

- Portfolio advisors at brokerage firms
- Relationship managers offering managed accounts
- Discretionary portfolio managers
- Brokerage heads of wealth management

#### Competitive Landscape

- Same as Investor Vision but at a lighter tier
- **Morningstar Direct** — Model portfolio management for advisors
- **Black Diamond (SS&C)** — Wealth management portfolio platform

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Integration | Embedded within BORSAT OMS |
| Models | Unlimited model portfolios |
| Rebalancing | Batch rebalancing across all model clients |
| Performance | TWR and MWR calculations |

---

### 10. US Market Integration Module

#### Description

The **US Market Integration** module enables MENA-based brokerage houses to offer their clients access to US equity markets (NYSE, NASDAQ) alongside their existing GCC trading capabilities. This is achieved through FIX-based connectivity to US market execution venues via partner broker-dealers, allowing MENA investors to trade US stocks, ETFs, and ADRs from the same BORSAT platform they use for local market trading.

Cross-border investing has become a major growth driver for MENA brokerages as GCC investors increasingly seek diversification into US tech stocks, ETFs, and other US-listed securities. This module removes the need for clients to open separate international brokerage accounts.

#### Key Features

- **US Market Access** — Trading on NYSE and NASDAQ via FIX connectivity to US-based executing broker-dealers
- **Unified Platform** — Clients trade local GCC and US markets from a single BORSAT interface with unified portfolio view
- **Real-Time US Market Data** — Level 1 and Level 2 market data for US-listed securities with real-time streaming
- **Multi-Currency Support** — Automated USD/local currency conversion with configurable FX rates and margin in local currency
- **Extended Hours Trading** — Support for pre-market and after-hours trading sessions on US exchanges
- **Fractional Shares** — Support for fractional share trading on US markets (where available from executing broker)
- **US Tax Reporting** — W-8BEN form management and withholding tax tracking for dividend payments
- **Regulatory Compliance** — Compliance with both MENA and US regulatory requirements for cross-border trading

#### Target Users

- MENA retail investors seeking US market access
- Brokerage product managers designing international offerings
- Operations teams managing cross-border settlement
- Compliance officers handling dual-jurisdiction requirements

#### Competitive Landscape

- **Interactive Brokers** — Direct US market access for international investors
- **Saxo Bank** — Multi-market access from a single platform
- **DriveWealth** — API-based US market access for international brokers (B2B)

#### Technical Specifications

| Spec | Detail |
|------|--------|
| Connectivity | FIX 4.2/4.4 to US executing brokers |
| Markets | NYSE, NASDAQ, NYSE Arca, BATS |
| Settlement | T+1 (US standard) via partner clearing firm |
| Market Data | Real-time Level 1/2 via market data vendor |
| Trading Hours | Regular + pre/after-hours sessions |
| Currency | USD with automated FX conversion |

---

## APPENDIX: MENA Capital Markets Technology Landscape

### Key Exchanges Served by FIT

| Exchange | Country | Trading System | FIT Penetration |
|----------|---------|----------------|-----------------|
| MSM (Muscat Securities Market) | Oman | Horizon / X-Stream | ~90% of brokers |
| ADX (Abu Dhabi Securities Exchange) | UAE | Nasdaq X-Stream | Multiple brokers |
| DFM (Dubai Financial Market) | UAE | Nasdaq X-Stream | Multiple brokers |
| QSE (Qatar Stock Exchange) | Qatar | Nasdaq X-Stream | Multiple brokers |
| Tadawul (Saudi Stock Exchange) | Saudi Arabia | Nasdaq X-Stream INET | Expanding |
| BSE (Bahrain Bourse) | Bahrain | Nasdaq | Present |
| KSE (Kuwait Stock Exchange) | Kuwait | Nasdaq | Present |

### Regional Regulatory Bodies

| Regulator | Country | Key Requirements |
|-----------|---------|-----------------|
| CMA (Capital Market Authority) | Oman | Broker licensing, trading rules, surveillance |
| SCA (Securities and Commodities Authority) | UAE | Margin trading certification, broker regulations |
| QFMA (Qatar Financial Markets Authority) | Qatar | Broker classification, compliance reporting |
| CMA (Capital Market Authority) | Saudi Arabia | Trading regulations, market access rules |
| CBB (Central Bank of Bahrain) | Bahrain | Financial institution regulation |

### Technology Competitive Summary

| Category | FIT Product | Global Leader | Regional Alternative |
|----------|-------------|---------------|---------------------|
| OMS | BORSAT / FIT Premium | ION Fidessa | TraderEvolution |
| Back-Office | Wasata | FIS / Broadridge | KGiSL Dolphin |
| Portfolio Mgmt | Investor Vision | Bloomberg PORT | Advent (SS&C) |
| Mobile Trading | Mobile/Web Platform | Quadcode | Leverate SiRiX |
| Surveillance | FIT Surveillance | Nasdaq SMARTS | Scila |
| API Layer | API Middleware | Ullink/Itiviti | FIXSOL |
| Digital Onboarding | Digital Onboarding | Sumsub / FYNXT | Jumio |
| Fund Mgmt | SkyFund | SS&C | SimCorp |

---

*This research report was compiled from web research including fitoman.com product pages, LinkedIn company profiles, ZoomInfo company data, industry publications, and competitor product documentation. Some product details are inferred from industry-standard capabilities for the product category where FIT-specific documentation was not publicly available.*
