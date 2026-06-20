import { useState, useEffect } from "react";

// ─── Helper Components ────────────────────────────────────────────────────────
function ProblemCard({ icon, title, desc, cost }) {
  return (
    <div className="problem-card">
      <span className="p-icon">{icon}</span>
      <div className="p-title">{title}</div>
      <p className="p-desc">{desc}</p>
      <span className="p-cost">{cost}</span>
    </div>
  );
}

function FlowStep({ num, title, desc }) {
  return (
    <div className="flow-step">
      <div className="flow-num">{num}</div>
      <div className="flow-title">{title}</div>
      <p className="flow-desc">{desc}</p>
    </div>
  );
}

function ServiceCard({ icon, title, desc, tag, isFeatured, badgeText }) {
  return (
    <div className={`service-card ${isFeatured ? "featured" : ""}`}>
      {isFeatured && badgeText && <span className="service-badge">{badgeText}</span>}
      <span className="service-icon">{icon}</span>
      <div className="service-title">{title}</div>
      <p className="service-desc">{desc}</p>
      <span className="service-tag">{tag}</span>
    </div>
  );
}

function PackageCard({ name, price, retainer, features, isFeatured, badgeText, ctaText, ctaLink }) {
  return (
    <div className={`pkg ${isFeatured ? "featured" : ""}`}>
      {isFeatured && badgeText && <span className="pkg-badge">{badgeText}</span>}
      <div className="pkg-name">{name}</div>
      <div className="pkg-price">{price}<span> one-time</span></div>
      <div className="pkg-retainer">{retainer}</div>
      <div className="pkg-divider"></div>
      <ul className="pkg-features">
        {features.map((feature, i) => (
          <li key={i} className={i === 0 ? "strong" : ""}>{feature}</li>
        ))}
      </ul>
      <a href={ctaLink} className={`pkg-cta ${isFeatured ? "filled" : "outline"}`}>
        {ctaText}
      </a>
    </div>
  );
}

function StackItem({ icon, title, desc }) {
  return (
    <div className="stack-item">
      <div className="stack-item-icon">{icon}</div>
      <div>
        <div className="stack-item-title">{title}</div>
        <p className="stack-item-desc">{desc}</p>
      </div>
    </div>
  );
}

function VerticalCard({ icon, sector, name, pain, fix }) {
  return (
    <div className="vertical-card">
      <div className="v-icon">{icon}</div>
      <div>
        <div className="v-sector">{sector}</div>
        <div className="v-name">{name}</div>
        <p className="v-pain">{pain}</p>
        <div className="v-fix">{fix}</div>
      </div>
    </div>
  );
}

function GaiaLetter({ char, word, desc }) {
  return (
    <div className="gaia-letter">
      <div className="g-char">{char}</div>
      <div>
        <div className="g-word">{word}</div>
        <p className="g-desc">{desc}</p>
      </div>
    </div>
  );
}

function FounderCard({ avatarClass, avatarLetter, name, role, desc }) {
  return (
    <div className="founder-card">
      <div className={`founder-avatar ${avatarClass}`}>{avatarLetter}</div>
      <div>
        <div className="founder-role">{role}</div>
        <div className="founder-name">{name}</div>
        <p className="founder-desc">{desc}</p>
      </div>
    </div>
  );
}

function StatItem({ number, label }) {
  return (
    <div className="stat-item">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ─── Data Constants ───────────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: "📱",
    title: "Your team answers the same WhatsApp messages every day",
    desc: "Product info, pricing, timings, return policy — your staff copy-pastes the same replies 40 times a day. Every reply is 5 minutes of a human's time.",
    cost: "~3 hrs/day lost per person"
  },
  {
    icon: "📋",
    title: "Leads arrive and nobody follows up fast enough",
    desc: "A lead comes in at 9pm. Your sales team sees it at 9am. By then, the prospect has already spoken to two competitors who responded in under an hour.",
    cost: "~40% of leads lost to speed"
  },
  {
    icon: "📄",
    title: "Your data is entered by hand into spreadsheets and Tally",
    desc: "Invoices typed manually. CVs read one by one. Student enrollment processed form by form. This is skilled human time spent on tasks a system could do in seconds.",
    cost: "~₹3–6L/yr in wasted salary"
  },
  {
    icon: "📊",
    title: "You check 6 different apps to understand how your business is doing",
    desc: "Meta Ads. Razorpay. Google Analytics. Shopify. WhatsApp. Email. Every morning, 45 minutes before you have a complete picture of yesterday.",
    cost: "~4 hrs/week of owner time"
  },
  {
    icon: "🔄",
    title: "Your business stops when key people are unavailable",
    desc: "When your best employee is on leave, operations slow. When you're unavailable, decisions stall. The business is dependent on specific humans for things that shouldn't need humans at all.",
    cost: "Single point of failure risk"
  },
  {
    icon: "💸",
    title: "You're hiring people to solve problems that are actually systems problems",
    desc: "Another operations executive. Another support person. Another data entry staff. The headcount grows but the underlying inefficiency doesn't — it just costs more.",
    cost: "₹25K–40K/month per hire"
  }
];

const FLOW_STEPS = [
  {
    num: "01",
    title: "Free Ops Audit",
    desc: "30-minute call. We map your workflow, find where time and money are leaking, and show you exactly what a system would look like."
  },
  {
    num: "02",
    title: "Live Demo",
    desc: "Before you spend a rupee, we build a working demo using your actual documents and data. You see it working on your real business."
  },
  {
    num: "03",
    title: "Build & Deploy",
    desc: "Fixed-price. Fixed timeline. We build the full system and deploy it on secure infrastructure. Your team gets a training session and handover docs."
  },
  {
    num: "04",
    title: "Ongoing Support",
    desc: "We monitor, maintain, and improve the system every month. APIs change, business needs evolve — we stay with you through all of it."
  }
];

const SERVICES = [
  {
    icon: "⚡",
    title: "AI Lead Qualifier",
    desc: "Incoming lead → enriched in 60 seconds → scored → WhatsApp briefing card sent to your sales team. Works while you sleep.",
    tag: "Lead Gen · WhatsApp · Claude",
    isFeatured: true,
    badgeText: "MOST POPULAR"
  },
  {
    icon: "💬",
    title: "WhatsApp Automation Bot",
    desc: "Handles 80% of incoming WhatsApp queries automatically. Product info, pricing, FAQs, booking — answered instantly, 24/7.",
    tag: "WhatsApp API · n8n · Claude"
  },
  {
    icon: "🧠",
    title: "RAG Knowledge Bot",
    desc: "Upload your catalogs, manuals, and FAQs. Your bot reads them all and answers any question from them instantly — in Hindi or English.",
    tag: "RAG · Supabase Vector · Claude"
  },
  {
    icon: "📞",
    title: "Voice AI Receptionist",
    desc: "Answers every inbound call, handles FAQs, books appointments, and logs everything automatically. Built on Vapi voice AI.",
    tag: "Vapi · ElevenLabs · n8n"
  },
  {
    icon: "📊",
    title: "Live Business Dashboard",
    desc: "Every metric from every platform in one place. Daily WhatsApp brief at 8am: revenue, leads, top ad, support tickets, cash position.",
    tag: "Google Sheets · Looker · APIs"
  },
  {
    icon: "🗂️",
    title: "Invoice & Document Parser",
    desc: "PDFs emailed in → data extracted by Claude → pushed to Google Sheets or Tally automatically. Eliminates manual data entry entirely.",
    tag: "Claude · n8n · Google Sheets"
  },
  {
    icon: "🎓",
    title: "Student Onboarding System",
    desc: "Payment confirmed → welcome sent → form triggered → materials delivered → progress tracked. Zero manual steps from enrollment to first class.",
    tag: "Typeform · n8n · WhatsApp"
  },
  {
    icon: "👥",
    title: "Recruitment Automation",
    desc: "200 CVs screened in 4 minutes. Top candidates shortlisted, scheduled, and briefed automatically. Rejection emails sent without a single human click.",
    tag: "Claude · Cal.com · Google Sheets"
  },
  {
    icon: "🔁",
    title: "Full Sales Pipeline Automation",
    desc: "Every lead from every source unified, enriched, assigned, and followed up automatically. Weekly report delivered to your WhatsApp every Sunday night.",
    tag: "CRM · n8n · Claude · WhatsApp"
  }
];

const PACKAGES = [
  {
    name: "Starter",
    price: "₹75,000",
    retainer: "+ ₹8,000/month retainer",
    features: [
      "One automation system of your choice",
      "2-week delivery timeline",
      "3-month minimum retainer",
      "WhatsApp or email delivery surface",
      "Training session + handover docs",
      "Monthly monitoring and maintenance"
    ],
    isFeatured: false,
    ctaText: "Get Started →",
    ctaLink: "#cta"
  },
  {
    name: "Growth",
    price: "₹1,75,000",
    retainer: "+ ₹20,000/month retainer",
    features: [
      "Two systems bundled (e.g. Lead Qualifier + WhatsApp Bot)",
      "4-week delivery timeline",
      "6-month minimum retainer",
      "WhatsApp + web chat delivery",
      "Live dashboard included",
      "Monthly strategy call with founders",
      "Priority support response"
    ],
    isFeatured: true,
    badgeText: "BEST VALUE",
    ctaText: "Get Started →",
    ctaLink: "#cta"
  },
  {
    name: "Scale",
    price: "₹3,50,000",
    retainer: "+ ₹40,000/month retainer",
    features: [
      "Full operations stack — 4+ systems",
      "Sales pipeline + WhatsApp automation",
      "Live business dashboard + daily brief",
      "Voice AI receptionist",
      "8-week delivery timeline",
      "12-month retainer",
      "Dedicated monthly ops review",
      "New workflow added every quarter"
    ],
    isFeatured: false,
    ctaText: "Get Started →",
    ctaLink: "#cta"
  }
];

const STACK_PILLS = [
  { text: "n8n", isLime: true },
  { text: "Claude AI", isLime: true },
  { text: "Supabase", isLime: true },
  { text: "React", isLime: true },
  { text: "WhatsApp API", isLime: false },
  { text: "Vapi", isLime: false },
  { text: "Firecrawl", isLime: false },
  { text: "Google Cloud", isLime: false },
  { text: "Looker Studio", isLime: false },
  { text: "Hetzner VPS", isLime: false },
  { text: "pgvector", isLime: false },
  { text: "Twilio", isLime: false }
];

const STACK_ITEMS = [
  {
    icon: "🔒",
    title: "Your data stays yours",
    desc: "All systems run on private infrastructure. Your customer data, leads, and business information never pass through third-party platforms. We sign NDAs before any document is shared with us."
  },
  {
    icon: "🇮🇳",
    title: "Built for Indian business reality",
    desc: "WhatsApp-first. Hindi and English support. Tally and Razorpay integrations. Regional language handling. Not a Western tool forced onto an Indian workflow."
  },
  {
    icon: "⚡",
    title: "Monitored 24/7",
    desc: "Every workflow is monitored continuously. If something breaks, we know before you do. Our incident log tracks every failure and resolution — you get a monthly reliability report."
  },
  {
    icon: "📈",
    title: "Scales with your business",
    desc: "Systems are built multi-tenant from day one. As your volume grows — more leads, more orders, more support queries — the infrastructure scales without manual intervention or new costs."
  }
];

const VERTICALS = [
  {
    icon: "🏠",
    sector: "Real Estate",
    name: "Real Estate Agencies",
    pain: "Agents drowning in unqualified WhatsApp leads. Prospects getting no reply at night. Property queries that could be answered from a brochure taking 20 minutes of agent time.",
    fix: "→ Lead qualifier + WhatsApp bot + property RAG bot"
  },
  {
    icon: "🎓",
    sector: "Education",
    name: "Coaching Institutes & EdTech",
    pain: "Admin team answering fee, batch, and syllabus questions all day. Student onboarding done manually per enrollment. Attendance and follow-up tracking in WhatsApp groups.",
    fix: "→ Admission bot + student onboarding + fee follow-up automation"
  },
  {
    icon: "👔",
    sector: "Recruitment",
    name: "Recruitment & Staffing Agencies",
    pain: "200 CVs read manually for every role. Candidates ghosted because follow-up was manual. Interview scheduling done through WhatsApp back-and-forth for 3 days.",
    fix: "→ CV screener + auto-scheduler + candidate communication bot"
  },
  {
    icon: "⚖️",
    sector: "Professional Services",
    name: "CA Firms & Legal Offices",
    pain: "Clients calling for document checklists and deadline reminders that haven't changed in 3 years. Invoice data entered manually from PDFs. Client onboarding done through WhatsApp.",
    fix: "→ Client query bot + invoice parser + document collection automation"
  },
  {
    icon: "📦",
    sector: "E-commerce",
    name: "D2C Brands & Online Traders",
    pain: "Support team copy-pasting return policy and tracking links. Order data manually reconciled between Shopify and Razorpay. No unified view of which ad spend is actually converting.",
    fix: "→ Support bot + order automation + marketing attribution dashboard"
  },
  {
    icon: "🏥",
    sector: "Healthcare",
    name: "Clinics & Diagnostic Centres",
    pain: "Receptionist managing physical desk and phone simultaneously. Appointment booking done through 3 WhatsApp messages. Test prep instructions repeated 30 times per day.",
    fix: "→ Voice AI receptionist + appointment bot + test prep RAG bot"
  }
];

const GAIA_LETTERS = [
  {
    char: "G",
    word: "Gap Identification",
    desc: "We map every manual process in your business and identify exactly where time, money, and leads are leaking before writing a single line of code."
  },
  {
    char: "A",
    word: "Architecture Design",
    desc: "We design the full system — triggers, data flows, AI decision points, and human handoffs — before any build begins. You approve the blueprint first."
  },
  {
    char: "I",
    word: "Implementation",
    desc: "Fixed-price. Fixed timeline. We build on your real data and test against your real edge cases — not clean demo scenarios that break in week two."
  },
  {
    char: "A",
    word: "Activation & Ongoing Ops",
    desc: "Systems go live with training, runbooks, and monitoring. We stay on retainer to maintain, improve, and expand as your business grows."
  }
];

const FOUNDERS = [
  {
    avatarClass: "g",
    avatarLetter: "G",
    name: "Gargi Thakur",
    role: "Technical Co-founder",
    desc: "Builds every system. Handles architecture, n8n workflows, React dashboards, Supabase databases, Claude integrations, and deployment. If it runs, she built it."
  },
  {
    avatarClass: "b",
    avatarLetter: "B",
    name: "Bhawik",
    role: "Sales Co-founder",
    desc: "Handles all client relationships — discovery calls, proposals, onboarding, and ongoing communication. If you've spoken to gargi.ai, you've spoken to him."
  }
];

const STATS = [
  { number: "2 wks", label: "Average delivery timeline for Starter systems" },
  { number: "24/7", label: "Every system monitored continuously" },
  { number: "₹0", label: "Cost for the initial operational audit" },
  { number: "5+", label: "Target verticals with deep domain expertise" }
];

const TICKER_ITEMS = [
  "n8n Workflow Automation",
  "WhatsApp Business API",
  "RAG Knowledge Bots",
  "AI Lead Qualification",
  "Voice AI Receptionist",
  "Live Business Dashboards",
  "Invoice Parsing",
  "Student Onboarding",
  "Claude · Supabase · React",
  "Serving Jabalpur & Nationwide"
];

// ─── Main Component ──────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [ctaValue, setCtaValue] = useState("");
  const [ctaSubmitted, setCtaSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCtaSubmit = (e) => {
    e.preventDefault();
    if (ctaValue.trim()) {
      setCtaSubmitted(true);
    }
  };

  return (
    <>
      {/* NAV */}
      <nav style={{ borderBottomColor: scrolled ? "rgba(30, 30, 42, 0.9)" : "rgba(30, 30, 42, 0.6)" }}>
        <a href="#" className="nav-logo">gargi<span>.ai</span></a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#packages">Pricing</a>
          <a href="#verticals">Industries</a>
          <a href="#about">About</a>
          <a href="#cta" className="nav-cta">Book Free Audit →</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow">Jabalpur, India · Serving SMBs Nationwide</div>
            <h1>Your business runs on manual work.<br /><em>It doesn't have to.</em></h1>
            <p className="hero-sub">gargi.ai builds AI-powered automation systems for Indian small businesses — replacing repetitive manual work with systems that run 24/7, cost less than one employee, and never call in sick.</p>
            <div className="hero-actions">
              <a href="#cta" className="btn-primary">Get a Free Ops Audit →</a>
              <a href="#services" className="btn-ghost">See What We Build</a>
            </div>
            <p className="hero-note">// No pitch. 30 minutes. We show you exactly where time is leaking.</p>
          </div>
          <div className="hero-terminal">
            <div className="terminal-bar">
              <div className="t-dot r"></div><div className="t-dot y"></div><div className="t-dot g"></div>
              <span className="terminal-label">gargi.ai · lead_qualifier.workflow</span>
            </div>
            <div className="terminal-body">
              <div className="t-line"><span className="t-comment">// Lead came in 11:47pm from PropNest website</span></div>
              <div className="t-gap"></div>
              <div className="t-line"><span className="t-key">trigger</span><span className="t-dim">: </span><span className="t-str">"form_submit"</span></div>
              <div className="t-line"><span className="t-key">source</span><span className="t-dim">: </span><span className="t-str">"website → WhatsApp"</span></div>
              <div className="t-gap"></div>
              <div className="t-line"><span className="t-comment">// Firecrawl enriches company in 3s</span></div>
              <div className="t-line"><span className="t-key">company_size</span><span className="t-dim">: </span><span className="t-val">"85 employees"</span></div>
              <div className="t-line"><span className="t-key">est_budget</span><span className="t-dim">: </span><span className="t-val">"₹8L–12L"</span></div>
              <div className="t-gap"></div>
              <div className="t-line"><span className="t-comment">// Claude scores and writes briefing</span></div>
              <div className="t-line"><span className="t-key">lead_score</span><span className="t-dim">: </span><span className="t-val">87/100</span></div>
              <div className="t-line"><span className="t-key">priority</span><span className="t-dim">: </span><span className="t-tag">🔴 HIGH</span></div>
              <div className="t-gap"></div>
              <div className="t-line"><span className="t-comment">// WhatsApp alert sent to sales team</span></div>
              <div className="t-line"><span className="t-arrow">→ </span><span className="t-success">✓ Delivered in 58 seconds</span></div>
              <div className="t-gap"></div>
              <div className="t-line"><span className="t-comment">// Your team was asleep. System wasn't.</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <span key={index} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* PROBLEM */}
      <section id="problem">
        <div className="container">
          <div className="problem-intro">
            <span className="section-eyebrow">The Problem</span>
            <h2>Manual work is costing your business more than you think</h2>
          </div>
          <div className="problem-grid">
            {PROBLEMS.map((prob, i) => (
              <ProblemCard key={i} {...prob} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE FIX IT (SOLUTION FLOW) */}
      <section id="solution">
        <div className="container">
          <div className="solution-header">
            <span className="section-eyebrow">How gargi.ai Works</span>
            <h2>We map your operations, then replace the manual parts</h2>
            <p>No generic software. No 6-month implementation. Systems built specifically for how your business works — delivered in 2–4 weeks.</p>
          </div>
          <div className="flow-container">
            {FLOW_STEPS.map((step, i) => (
              <FlowStep key={i} {...step} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="services-header">
            <span className="section-eyebrow">What We Build</span>
            <h2>AI systems for real business problems</h2>
            <p>Every system is built on n8n, Claude AI, Supabase, and WhatsApp — the stack that powers the most reliable automation workflows in production today.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((srv, i) => (
              <ServiceCard key={i} {...srv} />
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages">
        <div className="container">
          <div className="packages-header">
            <span className="section-eyebrow">Pricing</span>
            <h2>Transparent pricing. No surprises.</h2>
            <p>Every package includes a fixed-price build and an ongoing retainer so the system keeps working as your business changes.</p>
          </div>
          <div className="packages-grid">
            {PACKAGES.map((pkg, i) => (
              <PackageCard key={i} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack">
        <div className="container">
          <div className="stack-inner">
            <div className="stack-left">
              <span className="section-eyebrow">The Stack</span>
              <h2>Built on tools that work in production, not just demos</h2>
              <p>We don't use overpriced SaaS platforms that charge per-task and eat your margins. Everything we build runs on infrastructure we control — reliable, fast, and affordable to maintain long-term.</p>
              <div className="stack-pills">
                {STACK_PILLS.map((pill, i) => (
                  <span key={i} className={`pill ${pill.isLime ? "lime" : ""}`}>{pill.text}</span>
                ))}
              </div>
            </div>
            <div className="stack-right">
              {STACK_ITEMS.map((item, i) => (
                <StackItem key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VERTICALS */}
      <section id="verticals">
        <div className="container">
          <div className="verticals-header">
            <span className="section-eyebrow">Industries We Serve</span>
            <h2>Deep expertise in 6 sectors across Central India</h2>
            <p>We don't build generic automation. We understand the specific operational reality of each industry we work in.</p>
          </div>
          <div className="verticals-grid">
            {VERTICALS.map((vert, i) => (
              <VerticalCard key={i} {...vert} />
            ))}
          </div>
        </div>
      </section>

      {/* GAIA FRAMEWORK */}
      <section id="gaia">
        <div className="container">
          <div className="gaia-inner">
            <div className="gaia-left">
              <div className="gaia-acronym">
                {GAIA_LETTERS.map((letter, i) => (
                  <GaiaLetter key={i} {...letter} />
                ))}
              </div>
            </div>
            <div className="gaia-right">
              <div className="gaia-tag">Proprietary Framework</div>
              <h2>The GAIA Framework — how every gargi.ai engagement works</h2>
              <p>Most automation projects fail because they start with the tool instead of the problem. GAIA — our Gargi AI Activation Architecture — is the structured process we use on every engagement to ensure what we build actually works in your specific business, not just in a controlled demo.</p>
              <p>It's why our systems survive contact with real data, real users, and real operational messiness — instead of breaking three weeks after delivery.</p>
              <a href="#cta" className="btn-primary" style={{ marginTop: "0.5rem" }}>See GAIA in Action →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="about-inner">
            <div className="about-left">
              <span className="section-eyebrow">Who We Are</span>
              <h2>Two people in Jabalpur. Solving real problems.</h2>
              <p>gargi.ai is not a large agency with 50 people where your project gets handed to a junior. It's two co-founders — one who builds, one who sells — who are personally accountable for every system we deploy.</p>
              <p>We're based in Jabalpur, Madhya Pradesh. That means our costs are a fraction of a Mumbai or Bangalore agency — and we pass that advantage to clients through better pricing and higher margins that let us spend more time on your system, not managing overhead.</p>
              <div className="stat-block">
                {STATS.map((stat, i) => (
                  <StatItem key={i} {...stat} />
                ))}
              </div>
            </div>
            <div className="about-right">
              <div className="founder-cards">
                {FOUNDERS.map((founder, i) => (
                  <FounderCard key={i} {...founder} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <div className="cta-inner">
            <span className="section-eyebrow">Get Started</span>
            <h2>See what gargi.ai would automate in your business — free</h2>
            <p>Book a 30-minute operational mapping session. We'll map your workflow live on the call, identify your 3 highest-impact automation opportunities, and show you what each would cost and deliver. No pitch. Just clarity.</p>
            <form onSubmit={handleCtaSubmit} className="cta-form">
              <input
                className="cta-input"
                type="text"
                value={ctaValue}
                onChange={(e) => setCtaValue(e.target.value)}
                placeholder="Your WhatsApp number or email"
                disabled={ctaSubmitted}
                required
              />
              <button
                className="cta-submit"
                type="submit"
                style={ctaSubmitted ? { background: "#1D9E75" } : {}}
              >
                {ctaSubmitted ? "Sent ✓" : "Book Audit →"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-logo">gargi<span>.ai</span></div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#packages">Pricing</a>
            <a href="#verticals">Industries</a>
            <a href="#gaia">GAIA Framework</a>
            <a href="#about">About</a>
          </div>
          <div className="footer-copy">© 2025 gargi.ai · Jabalpur, MP, India</div>
        </div>
      </footer>
    </>
  );
}
