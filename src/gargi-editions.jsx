import { useState, useEffect, useRef } from "react";

// ─── Scroll Hook ───────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: "brain", label: "Gargi Brain" },
  { id: "agentic", label: "Agentic" },
  { id: "growth", label: "Growth Engine" },
  { id: "brand", label: "Brand AI" },
  { id: "analytics", label: "Analytics" },
  { id: "content", label: "Content" },
  { id: "retainers", label: "Retainers" },
  { id: "seo", label: "SEO" },
  { id: "creative", label: "Creative" },
  { id: "infra", label: "Infrastructure" },
  { id: "founders", label: "Founders" },
  { id: "api", label: "API" },
];

const TICKER_ITEMS = [
  "40+ AI Innovations", "₹1Cr+ Client Results", "Proprietary Frameworks",
  "Forbes-Ready Founder", "Indian SMB Specialists", "Category Authority",
  "40+ AI Innovations", "₹1Cr+ Client Results", "Proprietary Frameworks",
];

// ─── Fade-In wrapper ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Marquee ticker ───────────────────────────────────────────────────────────
function Ticker() {
  return (
    <div style={{ overflow: "hidden", background: "#C8FF00", padding: "10px 0", borderTop: "1px solid #000", borderBottom: "1px solid #000" }}>
      <div style={{
        display: "flex", gap: "3rem", animation: "ticker 18s linear infinite", whiteSpace: "nowrap", width: "max-content",
      }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
          <span key={i} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: "#000", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            ✦ {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, subtitle, tag, gradient, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: gradient || "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
          border: "1px solid rgba(200,255,0,0.15)",
          borderRadius: "16px",
          padding: "28px",
          cursor: "pointer",
          transform: hovered ? "translateY(-4px)" : "none",
          boxShadow: hovered ? "0 20px 40px rgba(200,255,0,0.1)" : "0 4px 20px rgba(0,0,0,0.4)",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {tag && (
          <span style={{
            position: "absolute", top: "16px", right: "16px",
            background: "#C8FF00", color: "#000", fontSize: "0.65rem",
            fontFamily: "'Space Mono', monospace", fontWeight: 700,
            padding: "3px 10px", borderRadius: "99px", textTransform: "uppercase", letterSpacing: "0.08em",
          }}>{tag}</span>
        )}
        <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{icon}</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#fff", marginBottom: "8px", lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{subtitle}</div>
      </div>
    </Reveal>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ number, label, title, description }) {
  return (
    <Reveal>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#C8FF00",
            border: "1px solid #C8FF00", padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.1em",
          }}>#{number} {label}</span>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          color: "#fff", lineHeight: 1.15, marginBottom: "16px", fontStyle: "italic",
        }}>{title}</h2>
        {description && (
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", maxWidth: "520px", lineHeight: 1.8 }}>
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

// ─── Horizontal scroll cards ──────────────────────────────────────────────────
function HScrollCards({ items }) {
  const [x, setX] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setX(p => (p - 0.5) % (items.length * 220)), 16);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div style={{ overflow: "hidden", marginBottom: "24px" }}>
      <div style={{ display: "flex", gap: "16px", transform: `translateX(${x}px)`, width: "max-content", transition: "none" }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} style={{
            background: "rgba(200,255,0,0.05)", border: "1px solid rgba(200,255,0,0.2)",
            borderRadius: "12px", padding: "14px 20px", whiteSpace: "nowrap",
            fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)",
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stat Block ───────────────────────────────────────────────────────────────
function StatBlock({ value, label, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div style={{ textAlign: "center", padding: "24px" }}>
        <div style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)",
          color: "#C8FF00", fontStyle: "italic", lineHeight: 1,
        }}>{value}</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {label}
        </div>
      </div>
    </Reveal>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function GargiEditions() {
  const scrollY = useScrollY();
  const [activeSection, setActiveSection] = useState("brain");
  const [menuOpen, setMenuOpen] = useState(false);

  // Parallax hero text
  const heroOffset = scrollY * 0.35;

  return (
    <div style={{ background: "#060606", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Space+Mono:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes floatDot { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-thumb { background: #C8FF00; border-radius: 4px; }
        a { color: #C8FF00; text-decoration: none; }
      `}</style>

      {/* ── TOP NAV ─────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 60 ? "rgba(6,6,6,0.95)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(200,255,0,0.1)" : "none",
        transition: "all 0.3s ease",
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontStyle: "italic", color: "#fff" }}>gargi</span>
          <span style={{ background: "#C8FF00", color: "#000", fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Editions</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Summer '25</span>
        </div>

        {/* desktop nav */}
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          {NAV_SECTIONS.slice(0, 6).map(s => (
            <a key={s.id} href={`#${s.id}`}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
                color: activeSection === s.id ? "#C8FF00" : "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em", transition: "color 0.2s",
              }}
              onClick={() => setActiveSection(s.id)}
            >{s.label}</a>
          ))}
        </div>

        <a href="https://gargi.ai" style={{
          background: "#C8FF00", color: "#000", fontFamily: "'Space Mono', monospace",
          fontSize: "0.72rem", fontWeight: 700, padding: "8px 18px", borderRadius: "8px",
          letterSpacing: "0.05em",
        }}>Get Started →</a>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "120px 5% 80px",
      }}>
        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(#C8FF00 1px, transparent 1px), linear-gradient(90deg, #C8FF00 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,255,0,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "8%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ transform: `translateY(${heroOffset}px)`, textAlign: "center", position: "relative", zIndex: 1, maxWidth: "900px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(200,255,0,0.08)", border: "1px solid rgba(200,255,0,0.2)",
            borderRadius: "99px", padding: "6px 16px", marginBottom: "32px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C8FF00", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: "#C8FF00", letterSpacing: "0.1em" }}>SUMMER '25 EDITION — THE INTELLIGENCE EDITION</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            lineHeight: 1.05, color: "#fff", marginBottom: "24px",
            fontStyle: "italic",
          }}>
            The<br />
            <span style={{ color: "#C8FF00" }}>Intelligence</span><br />
            Edition
          </h1>

          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
            color: "rgba(255,255,255,0.5)", lineHeight: 1.9, marginBottom: "40px",
          }}>
            A new world of AI-powered growth.<br />40+ proprietary innovations for Indian founders.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#brain" style={{
              background: "#C8FF00", color: "#000", fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem", fontWeight: 700, padding: "14px 32px", borderRadius: "10px",
              letterSpacing: "0.05em",
            }}>Explore Innovations ↓</a>
            <a href="https://gargi.ai" style={{
              background: "transparent", color: "#fff", fontFamily: "'Space Mono', monospace",
              fontSize: "0.8rem", padding: "14px 32px", borderRadius: "10px", letterSpacing: "0.05em",
              border: "1px solid rgba(255,255,255,0.2)",
            }}>Book a Demo</a>
          </div>
        </div>

        {/* Floating dots */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${20 + i * 14}%`, left: `${5 + i * 18}%`,
            width: "4px", height: "4px", borderRadius: "50%", background: "#C8FF00",
            opacity: 0.3 + i * 0.08,
            animation: `floatDot ${2 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }} />
        ))}
      </section>

      {/* ── TICKER ──────────────────────────────── */}
      <Ticker />

      {/* ── STATS BAR ───────────────────────────── */}
      <section style={{
        padding: "64px 5%", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0",
      }}>
        {[
          { value: "40+", label: "AI Innovations" },
          { value: "₹1Cr+", label: "Client Revenue Generated" },
          { value: "8", label: "Proprietary Frameworks" },
          { value: "3×", label: "Avg. Growth Multiplier" },
          { value: "50+", label: "Indian SMBs Served" },
        ].map((s, i) => <StatBlock key={i} {...s} delay={i * 0.08} />)}
      </section>

      {/* ── SECTION NAV ─────────────────────────── */}
      <div style={{
        position: "sticky", top: "64px", zIndex: 90,
        background: "rgba(6,6,6,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(200,255,0,0.08)",
        padding: "0 5%", overflowX: "auto",
        display: "flex", gap: "0",
      }}>
        {NAV_SECTIONS.map(s => (
          <a key={s.id} href={`#${s.id}`}
            onClick={() => setActiveSection(s.id)}
            style={{
              fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
              color: activeSection === s.id ? "#C8FF00" : "rgba(255,255,255,0.4)",
              padding: "16px 20px", whiteSpace: "nowrap", letterSpacing: "0.05em",
              borderBottom: activeSection === s.id ? "2px solid #C8FF00" : "2px solid transparent",
              transition: "all 0.2s", display: "block",
            }}
          >{s.label}</a>
        ))}
      </div>

      {/* ── GARGI BRAIN ─────────────────────────── */}
      <section id="brain" style={{ padding: "96px 5%" }}>
        <SectionHeader
          number="01" label="Gargi Brain"
          title="Your AI growth partner, obsessed with your numbers."
          description="Gargi Brain is the proprietary intelligence layer powering every decision. It ingests your data, maps market signals, and delivers proactive recommendations — before you even think to ask."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "16px" }}>
          <FeatureCard icon="🧠" title="Predictive Revenue Signals" tag="New" subtitle="Get weekly revenue forecasts based on funnel velocity, seasonality, and competitor movement — delivered as actionable playbooks." gradient="linear-gradient(135deg, #0d1a00 0%, #0f0f0f 100%)" delay={0} />
          <FeatureCard icon="📊" title="Smart Business Pulse" subtitle="Gargi Brain surfaces the 3 most critical actions for your business every Monday morning — no dashboard diving needed." gradient="linear-gradient(135deg, #111 0%, #0d0d00 100%)" delay={0.08} />
          <FeatureCard icon="⚡" title="Auto-Workflow Builder" tag="Beta" subtitle="Describe any growth workflow in plain language. Gargi builds it, tests it, and deploys it — in under 10 minutes." gradient="linear-gradient(135deg, #0a0a0a 0%, #141400 100%)" delay={0.16} />
        </div>

        <HScrollCards items={["Generate a Q4 content calendar", "Analyze competitor ad strategy", "Build a lead nurture sequence", "Forecast next month's CAC", "Identify top churn signals"]} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          <FeatureCard icon="🎯" title="Audience Segmentation AI" subtitle="Build hyper-specific customer segments using behavioral + intent signals. Go beyond demographics." delay={0} />
          <FeatureCard icon="📈" title="Custom Growth Reports" subtitle="Gargi Brain generates visual, board-ready reports from your raw data — shareable in one click." tag="Live" delay={0.08} />
          <FeatureCard icon="🔮" title="Market Intelligence Feed" subtitle="Daily brief of what your industry is doing, what's working in competitor ads, and where opportunity gaps exist." delay={0.16} />
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────── */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,255,0,0.15), transparent)", margin: "0 5%" }} />

      {/* ── AGENTIC ─────────────────────────────── */}
      <section id="agentic" style={{ padding: "96px 5%" }}>
        <SectionHeader
          number="02" label="Agentic Systems"
          title="AI agents that execute, not just advise."
          description="Our agentic layer takes strategy off whiteboards and into execution. Autonomous agents handle outreach, content, analytics, and optimization — while you focus on building."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {[
            { icon: "🤖", title: "Autonomous Lead Agent", tag: "New", subtitle: "Identifies, qualifies, and warms leads across LinkedIn, email, and WhatsApp — without human intervention." },
            { icon: "✍️", title: "Content Execution Agent", subtitle: "From brief to published — writes, edits, formats, schedules across all channels in one pipeline." },
            { icon: "💬", title: "Conversational Commerce Agent", tag: "Beta", subtitle: "WhatsApp & Instagram DM agents that handle FAQs, close warm leads, and upsell — 24/7." },
            { icon: "🔄", title: "Retargeting Automation Agent", subtitle: "Monitors pixel signals and auto-launches retargeting sequences based on behavioral triggers." },
          ].map((c, i) => <FeatureCard key={i} {...c} delay={i * 0.08} />)}
        </div>
      </section>

      {/* ── GROWTH ENGINE ───────────────────────── */}
      <section id="growth" style={{ padding: "96px 5%", background: "rgba(200,255,0,0.02)" }}>
        <SectionHeader
          number="03" label="Growth Engine"
          title="The GARGI GROWTH STACK™"
          description="Our proprietary 8-layer framework used across every client engagement. Systematized growth — not guesswork. Built for Indian SMBs, tested at scale."
        />

        <Reveal>
          <div style={{
            background: "linear-gradient(135deg, #0d1a00 0%, #111 100%)",
            border: "1px solid rgba(200,255,0,0.2)", borderRadius: "20px",
            padding: "40px", marginBottom: "24px",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
              {[
                ["01", "Signal Mapping", "Identify where buyers actually exist"],
                ["02", "Funnel Architecture", "Engineer conversion infrastructure"],
                ["03", "Content Moat", "Build authority nobody can copy"],
                ["04", "Paid Amplification", "Scale what's already working"],
                ["05", "Retention Layer", "LTV optimization & churn defense"],
                ["06", "Data Intelligence", "Measurement that drives decisions"],
                ["07", "Community Flywheel", "Turn customers into growth engines"],
                ["08", "AI Automation", "Replace repetition with systems"],
              ].map(([num, title, desc]) => (
                <div key={num} style={{ borderLeft: "2px solid rgba(200,255,0,0.3)", paddingLeft: "16px" }}>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "#C8FF00", marginBottom: "4px" }}>Layer {num}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", color: "#fff", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── BRAND AI ────────────────────────────── */}
      <section id="brand" style={{ padding: "96px 5%" }}>
        <SectionHeader
          number="04" label="Brand AI"
          title="Visual identity. AI-accelerated."
          description="Gargi's Brand AI generates, tests, and evolves your brand assets using real market feedback — ensuring your brand doesn't just look good, but converts."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {[
            { icon: "🎨", title: "AI Brand Kit Generator", tag: "New", subtitle: "Complete brand identity — logo variants, color systems, typography — generated and tested in 48 hours." },
            { icon: "📸", title: "Campaign Creative Engine", subtitle: "Input your brief. Get 20 ad variants, 5 video scripts, and 10 email subjects — ready to test." },
            { icon: "🌐", title: "Landing Page Intelligence", subtitle: "AI-built, conversion-optimized landing pages that self-improve based on visitor behavior." },
            { icon: "✉️", title: "Email Design AI", subtitle: "Beautiful, on-brand emails generated from a one-line prompt. Personalized by segment." },
          ].map((c, i) => <FeatureCard key={i} {...c} delay={i * 0.08} />)}
        </div>
      </section>

      {/* ── ANALYTICS ───────────────────────────── */}
      <section id="analytics" style={{ padding: "96px 5%", background: "rgba(200,255,0,0.02)" }}>
        <SectionHeader
          number="05" label="Analytics"
          title="Clarity from chaos. Intelligence at scale."
          description="Real-time dashboards, attribution modeling, and AI-narrated insights. Know exactly what's working — and what to do next."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <FeatureCard icon="📉" title="Attribution Intelligence" tag="Live" subtitle="Multi-touch attribution across every channel — understand true ROI, not last-click lies." gradient="linear-gradient(135deg, #0a0a00 0%, #0f0f0f 100%)" delay={0} />
          <FeatureCard icon="🗺️" title="Funnel Heat Maps" subtitle="See exactly where users drop off. AI suggests fixes. You approve. Done." delay={0.08} />
          <FeatureCard icon="📡" title="Competitive Intelligence Dashboard" subtitle="Track competitor ad spend, creative trends, and positioning shifts — updated daily." delay={0.16} />
          <FeatureCard icon="🔔" title="Anomaly Alerts" tag="Beta" subtitle="Get Slack/WhatsApp alerts the moment a metric goes sideways — with root cause analysis." gradient="linear-gradient(135deg, #111 0%, #0d0d00 100%)" delay={0.24} />
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────── */}
      <section id="content" style={{ padding: "96px 5%" }}>
        <SectionHeader
          number="06" label="Content"
          title="Thought leadership, systematized."
          description="Gargi's content engine doesn't just create — it builds category authority. Every piece is engineered for search, social proof, and founder positioning."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {[
            { icon: "📝", title: "Founder Narrative Builder", tag: "New", subtitle: "Craft your Forbes-ready founder story with AI — positioning, proof points, and PR hooks included." },
            { icon: "🎙️", title: "Podcast-to-Content Pipeline", subtitle: "One long-form conversation → 30 LinkedIn posts, 10 shorts, 5 blog articles, 3 email sequences." },
            { icon: "🔍", title: "SEO Authority Engine", subtitle: "Topical authority maps + AI content briefs → ranked articles that compound over time." },
            { icon: "📣", title: "PR Pitch Generator", subtitle: "AI-crafted pitches for Economic Times, YourStory, Inc42, and Forbes — personalized per editor." },
            { icon: "🎬", title: "Short-Form Video Scripts", subtitle: "Viral-optimized hooks and scripts for Instagram Reels and YouTube Shorts — at volume." },
            { icon: "🗞️", title: "Case Study Architect", tag: "Live", subtitle: "Transform client results into globally compelling case studies — ready for awards and applications." },
          ].map((c, i) => <FeatureCard key={i} {...c} delay={i * 0.06} />)}
        </div>
      </section>

      {/* ── RETAINERS ───────────────────────────── */}
      <section id="retainers" style={{ padding: "96px 5%", background: "rgba(200,255,0,0.02)" }}>
        <SectionHeader
          number="07" label="Retainers"
          title="Scalable AI retainers for Indian SMBs."
          description="Hybrid retainer models that combine AI infrastructure + human strategy. Designed for ₹10L–₹2Cr/year businesses. Recurring, predictable, transformational."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {[
            {
              name: "Gargi Starter", price: "₹25K/mo", tag: "Most Popular",
              features: ["Gargi Brain access", "Monthly growth report", "2 content pillars", "Ad management up to ₹5L"],
              color: "rgba(200,255,0,0.08)",
            },
            {
              name: "Gargi Growth", price: "₹60K/mo", tag: "Best Value",
              features: ["Full stack access", "Weekly strategy calls", "Agentic content pipeline", "Performance ads + SEO", "Custom analytics dashboard"],
              color: "rgba(200,255,0,0.12)",
            },
            {
              name: "Gargi Scale", price: "₹1.2L/mo", tag: "Enterprise",
              features: ["Dedicated AI team", "Proprietary framework deployment", "PR + thought leadership", "Board-ready reporting", "Founder positioning"],
              color: "rgba(200,255,0,0.06)",
            },
          ].map((plan, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                background: plan.color, border: "1px solid rgba(200,255,0,0.2)",
                borderRadius: "16px", padding: "32px", position: "relative",
              }}>
                {plan.tag && <span style={{
                  position: "absolute", top: "16px", right: "16px",
                  background: "#C8FF00", color: "#000", fontSize: "0.6rem",
                  fontFamily: "'Space Mono', monospace", fontWeight: 700,
                  padding: "3px 10px", borderRadius: "99px",
                }}>{plan.tag}</span>}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#fff", marginBottom: "4px" }}>{plan.name}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.5rem", color: "#C8FF00", marginBottom: "20px", fontWeight: 700 }}>{plan.price}</div>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                    <span style={{ color: "#C8FF00", marginTop: "1px" }}>✓</span>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
                <a href="https://gargi.ai" style={{
                  display: "block", marginTop: "24px", textAlign: "center",
                  background: "#C8FF00", color: "#000", fontFamily: "'Space Mono', monospace",
                  fontSize: "0.72rem", fontWeight: 700, padding: "12px", borderRadius: "8px",
                }}>Get Started →</a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FOUNDERS ────────────────────────────── */}
      <section id="founders" style={{ padding: "96px 5%" }}>
        <SectionHeader
          number="08" label="Founders"
          title="Built for ambitious Indian founders."
          description="Gargi.ai was built by a young founder who understands the constraints, ambitions, and speed of Indian entrepreneurship. This isn't a Western playbook — it's yours."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {[
            { icon: "🏆", title: "Forbes 30U30 Track", tag: "New", subtitle: "We help founders build the impact narrative, media presence, and innovation footprint required for Forbes recognition." },
            { icon: "🎓", title: "Master's AI/ML Profile Builder", subtitle: "Structured case studies, research contributions, and founder narrative — crafted for top global university admissions." },
            { icon: "🌍", title: "Global Recognition System", subtitle: "Position your Indian work for international awards, conferences, and publications that matter to top schools." },
            { icon: "📖", title: "Thought Leadership Platform", subtitle: "Weekly LinkedIn presence, guest columns, and speaking opportunities — built for category authority." },
          ].map((c, i) => <FeatureCard key={i} {...c} delay={i * 0.08} />)}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section style={{
        padding: "120px 5%", textAlign: "center", position: "relative", overflow: "hidden",
        borderTop: "1px solid rgba(200,255,0,0.1)",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(200,255,0,0.05) 0%, transparent 70%)" }} />
        <Reveal>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-block", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
              color: "#C8FF00", border: "1px solid rgba(200,255,0,0.3)", borderRadius: "99px",
              padding: "6px 16px", marginBottom: "24px", letterSpacing: "0.1em",
            }}>START BUILDING</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#fff", fontStyle: "italic", lineHeight: 1.1, marginBottom: "24px",
            }}>
              Ready for the<br /><span style={{ color: "#C8FF00" }}>Intelligence Era?</span>
            </h2>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "0 auto 40px", lineHeight: 1.8 }}>
              Join 50+ Indian founders who've turned Gargi into their unfair growth advantage.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://gargi.ai" style={{
                background: "#C8FF00", color: "#000", fontFamily: "'Space Mono', monospace",
                fontSize: "0.85rem", fontWeight: 700, padding: "16px 40px", borderRadius: "10px",
              }}>Book Strategy Call →</a>
              <a href="https://gargi.ai" style={{
                background: "transparent", color: "#fff", fontFamily: "'Space Mono', monospace",
                fontSize: "0.85rem", padding: "16px 40px", borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}>View Case Studies</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer style={{
        padding: "40px 5%", borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontStyle: "italic", color: "#fff" }}>gargi.ai</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>© 2025 Gargi.ai</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="https://gargi.ai" style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{l}</a>
          ))}
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)" }}>
          Summer '25 Edition — The Intelligence Edition
        </div>
      </footer>
    </div>
  );
}
