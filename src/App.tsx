import React, { useState, useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
}

interface Advisor {
  name: string;
  role: string;
  initials: string;
}

interface ExpertiseItem {
  icon: string;
  title: string;
  description: string;
}

interface StatItem {
  number: string;
  label: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Advisory", href: "#advisory" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

const ADVISORS: Advisor[] = [
  { name: "Hanan Sakr", role: "Climate Policies & ESG Framework", initials: "HS" },
  { name: "Menassie Tadesse", role: "Change Management & Strategy", initials: "MT" },
  { name: "Tim Fox", role: "Macroeconomics & Interest Rates", initials: "TF" },
  { name: "Karla Dorsch", role: "Managing Director", initials: "KD" },
];

const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    icon: "🌐",
    title: "International Relations",
    description:
      "Policy advice on trade, diplomacy, and foreign relations to boost India's global leadership.",
  },
  {
    icon: "📊",
    title: "Strategic Advisory",
    description:
      "Connecting India with world leaders, businesses, and influencers for cross-border growth.",
  },
  {
    icon: "💼",
    title: "Investment Promotion",
    description:
      "Facilitating partnerships in technology, infrastructure, healthcare, and renewable energy.",
  },
  {
    icon: "🤝",
    title: "Global Networking",
    description:
      "Hosting exclusive roundtables and conferences to share insights on global challenges.",
  },
  {
    icon: "🏛️",
    title: "Public-Private Collaboration",
    description:
      "Fostering government-corporate partnerships for economic and social development.",
  },
  {
    icon: "🔍",
    title: "Market Intelligence",
    description:
      "Real-time geopolitical and risk intelligence to guide strategic decision-making.",
  },
];

const STATS: StatItem[] = [
  { number: "50+", label: "Global Advisors" },
  { number: "30+", label: "Countries Reached" },
  { number: "200+", label: "Partnerships Forged" },
  { number: "10+", label: "Years of Excellence" },
];

// ── Utility hook: intersection observer for scroll-in animations ───────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Sub-components ─────────────────────────────────────────────────────────

// Navbar
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #e8edf5" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "0 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 70,
      }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "linear-gradient(135deg, #1a56db, #0ea5e9)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: 0.5 }}>WS</span>
          </div>
          <span style={{
            fontFamily: "'Georgia', serif",
            fontWeight: 700, fontSize: 17,
            color: scrolled ? "#0f172a" : "#0f172a",
            letterSpacing: 0.3,
          }}>
            WS Consortium
          </span>
        </a>

        {/* Desktop Nav */}
        <ul style={{
          display: "flex", gap: 32, listStyle: "none",
          margin: 0, padding: 0,
        }} className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a href={item.href} style={{
                textDecoration: "none",
                fontSize: 14, fontWeight: 500,
                color: "#374151",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#1a56db")}
                onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#contact" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#1a56db", color: "#fff",
          padding: "9px 20px", borderRadius: 8,
          textDecoration: "none", fontSize: 14, fontWeight: 600,
          transition: "background 0.2s, transform 0.15s",
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#1447c0";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "#1a56db";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Join Us
        </a>
      </div>
    </nav>
  );
};

// Hero Section
const Hero: React.FC = () => (
  <section id="home" style={{
    minHeight: "100vh",
    background: "linear-gradient(160deg, #f0f7ff 0%, #e8f2fe 40%, #fff 100%)",
    display: "flex", alignItems: "center",
    padding: "120px 2rem 80px",
    position: "relative", overflow: "hidden",
  }}>
    {/* Decorative circles */}
    <div style={{
      position: "absolute", top: "10%", right: "-5%",
      width: 500, height: 500, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(26,86,219,0.06) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />
    <div style={{
      position: "absolute", bottom: "5%", left: "-8%",
      width: 400, height: 400, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#eff6ff", border: "1px solid #bfdbfe",
            borderRadius: 100, padding: "5px 14px",
            marginBottom: 24,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1a56db", display: "inline-block" }} />
            <span style={{ fontSize: 13, color: "#1e40af", fontWeight: 500 }}>
              Inspired by India's 2047 Vision
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
            fontWeight: 700, lineHeight: 1.15,
            color: "#0f172a", margin: "0 0 20px",
          }}>
            Shaping India's Rise as a{" "}
            <span style={{
              background: "linear-gradient(90deg, #1a56db, #0ea5e9)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Global Superpower
            </span>
          </h1>

          <p style={{
            fontSize: 17, lineHeight: 1.75, color: "#4b5563",
            margin: "0 0 36px", maxWidth: 500,
          }}>
            WS Consortium Forum drives India's growth through high-level international
            engagements, exclusive partnerships, and strategic connections with Board members,
            CEOs, and government ministers.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#membership" style={{
              background: "#1a56db", color: "#fff",
              padding: "13px 28px", borderRadius: 10,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              transition: "all 0.2s",
              boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#1447c0";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#1a56db";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Explore Membership
            </a>
            <a href="#about" style={{
              background: "#fff", color: "#1a56db",
              padding: "13px 28px", borderRadius: 10,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              border: "1.5px solid #bfdbfe",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1a56db";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#bfdbfe";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right — Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{
              background: "#fff",
              border: "1px solid #e8edf5",
              borderRadius: 16, padding: "28px 24px",
              textAlign: "center",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(26,86,219,0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{
                fontSize: 38, fontWeight: 700,
                background: "linear-gradient(135deg, #1a56db, #0ea5e9)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                marginBottom: 6,
              }}>
                {stat.number}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// About Section
const About: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section id="about" ref={ref} style={{
      padding: "100px 2rem", background: "#fff",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-30px)",
            transition: "all 0.7s ease",
          }}>
            <SectionLabel text="Who We Are" />
            <h2 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 700, color: "#0f172a", margin: "12px 0 20px", lineHeight: 1.2,
            }}>
              A Catalyst for Global Collaboration
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4b5563", marginBottom: 20 }}>
              At WS Consortium Forum, we go beyond traditional advisory services — we act as a
              catalyst for collaboration among corporations, governments, investors, and public leaders.
              Our mission is to foster partnerships that drive global economic growth and strengthen
              diplomatic relations.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4b5563", marginBottom: 32 }}>
              What sets us apart is our early involvement — providing strategic guidance before the
              RFP phase. We help leaders navigate complex transformations through visioning, market
              opportunities, and streamlined decisions.
            </p>
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { label: "Integrity", icon: "✦" },
                { label: "Transparency", icon: "◈" },
                { label: "Innovation", icon: "◎" },
              ].map(val => (
                <div key={val.label} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: 20, color: "#1a56db" }}>{val.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{val.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Values cards */}
          <div style={{
            display: "grid", gap: 16,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(30px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            {[
              { title: "Global Connectivity", desc: "Cross-border partnerships and international collaboration platforms.", color: "#eff6ff", border: "#bfdbfe", accent: "#1a56db" },
              { title: "Strategic Foresight", desc: "Helping leaders stay ahead of global trends and make informed decisions.", color: "#f0fdf4", border: "#bbf7d0", accent: "#16a34a" },
              { title: "Diplomatic Collaboration", desc: "Building diplomatic relationships to create favorable climate for investment.", color: "#fef9ec", border: "#fde68a", accent: "#d97706" },
            ].map(card => (
              <div key={card.title} style={{
                background: card.color, border: `1px solid ${card.border}`,
                borderRadius: 12, padding: "20px 24px",
                transition: "transform 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateX(4px)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateX(0)"}
              >
                <h4 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", margin: "0 0 6px" }}>{card.title}</h4>
                <p style={{ fontSize: 14, color: "#6b7280", margin: 0, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Expertise Section
const Expertise: React.FC = () => {
  const { ref, inView } = useInView();
  return (
    <section id="advisory" ref={ref} style={{
      padding: "100px 2rem",
      background: "linear-gradient(180deg, #f8faff 0%, #fff 100%)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel text="Our Expertise" />
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 700, color: "#0f172a", margin: "12px auto 16px",
          }}>
            What We Do Best
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Six core areas where WS Consortium creates transformative impact for leaders and nations.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.6s ease",
        }}>
          {EXPERTISE_ITEMS.map((item, i) => (
            <div key={item.title} style={{
              background: "#fff",
              border: "1px solid #e8edf5",
              borderRadius: 16, padding: "28px 24px",
              transition: "all 0.25s ease",
              cursor: "default",
              animationDelay: `${i * 80}ms`,
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#93c5fd";
                el.style.transform = "translateY(-5px)";
                el.style.boxShadow = "0 12px 32px rgba(26,86,219,0.1)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#e8edf5";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: "#eff6ff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, marginBottom: 16,
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", margin: "0 0 10px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Advisory Team
const Advisory: React.FC = () => {
  const { ref, inView } = useInView();
  const COLORS = ["#eff6ff", "#f0fdf4", "#fef9ec", "#fdf2f8"];
  const TEXT_COLORS = ["#1a56db", "#16a34a", "#d97706", "#9333ea"];

  return (
    <section ref={ref} style={{ padding: "100px 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel text="Advisory Board" />
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 700, color: "#0f172a", margin: "12px 0 0",
          }}>
            Advisory for True Transformation
          </h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.6s ease",
        }}>
          {ADVISORS.map((advisor, i) => (
            <div key={advisor.name} style={{
              border: "1px solid #e8edf5",
              borderRadius: 16, padding: "28px 20px",
              textAlign: "center",
              transition: "all 0.25s",
              cursor: "default",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-5px)";
                el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
                el.style.borderColor = "#bfdbfe";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "#e8edf5";
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: COLORS[i % COLORS.length],
                border: `2px solid ${TEXT_COLORS[i % TEXT_COLORS.length]}22`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
                fontSize: 18, fontWeight: 700,
                color: TEXT_COLORS[i % TEXT_COLORS.length],
              }}>
                {advisor.initials}
              </div>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", margin: "0 0 6px" }}>
                {advisor.name}
              </h4>
              <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
                {advisor.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Membership Section
const Membership: React.FC = () => {
  const { ref, inView } = useInView();
  const plans = [
    {
      name: "Individual",
      price: "$1,500",
      period: "/year",
      desc: "For professionals seeking exclusive resources and networking opportunities.",
      features: ["Exclusive content access", "Networking events", "Monthly newsletters", "One-on-one consultations", "Special webinars", "Business introductions"],
      highlight: false,
    },
    {
      name: "SME Corporate",
      price: "$4,500",
      period: "/year",
      desc: "For small to medium enterprises looking for global market engagement.",
      features: ["All Individual benefits", "Exclusive SME events", "Personalized services", "Cross-border introductions", "Policy briefings", "Priority support"],
      highlight: true,
    },
    {
      name: "Large Corporate",
      price: "$9,000",
      period: "/year",
      desc: "For large corporations seeking government-level access and partnerships.",
      features: ["All SME benefits", "Government event access", "Ministerial meetings", "Boardroom intelligence", "Geopolitical briefings", "Dedicated account manager"],
      highlight: false,
    },
  ];

  return (
    <section id="membership" ref={ref} style={{
      padding: "100px 2rem",
      background: "linear-gradient(180deg, #f8faff 0%, #eff6ff 100%)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SectionLabel text="Membership" />
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 700, color: "#0f172a", margin: "12px 0 16px",
          }}>
            Join the WS Consortium Network
          </h2>
          <p style={{ fontSize: 16, color: "#6b7280", maxWidth: 480, margin: "0 auto" }}>
            Choose the membership that aligns with your goals and unlock exclusive access to global opportunities.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.6s ease",
        }}>
          {plans.map(plan => (
            <div key={plan.name} style={{
              background: "#fff",
              border: plan.highlight ? "2px solid #1a56db" : "1px solid #e8edf5",
              borderRadius: 20, padding: "36px 28px",
              position: "relative",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = "0 16px 48px rgba(26,86,219,0.13)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "#1a56db", color: "#fff",
                  fontSize: 12, fontWeight: 600, padding: "4px 14px",
                  borderRadius: 100,
                }}>
                  Most Popular
                </div>
              )}
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>{plan.name}</h3>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px", lineHeight: 1.5 }}>{plan.desc}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                <span style={{
                  fontSize: 38, fontWeight: 700,
                  color: plan.highlight ? "#1a56db" : "#0f172a",
                }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: "#9ca3af" }}>{plan.period}</span>
              </div>
              <ul style={{ listStyle: "none", margin: "0 0 28px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#374151" }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: "50%",
                      background: plan.highlight ? "#eff6ff" : "#f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: plan.highlight ? "#1a56db" : "#64748b",
                      flexShrink: 0,
                    }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" style={{
                display: "block", textAlign: "center",
                background: plan.highlight ? "#1a56db" : "transparent",
                color: plan.highlight ? "#fff" : "#1a56db",
                border: `1.5px solid ${plan.highlight ? "#1a56db" : "#bfdbfe"}`,
                padding: "11px", borderRadius: 10,
                textDecoration: "none", fontSize: 14, fontWeight: 600,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  if (!plan.highlight) {
                    el.style.background = "#eff6ff";
                    el.style.borderColor = "#1a56db";
                  } else {
                    el.style.background = "#1447c0";
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  if (!plan.highlight) {
                    el.style.background = "transparent";
                    el.style.borderColor = "#bfdbfe";
                  } else {
                    el.style.background = "#1a56db";
                  }
                }}
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", membership: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  return (
    <section id="contact" style={{ padding: "100px 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
          {/* Left info */}
          <div>
            <SectionLabel text="Get In Touch" />
            <h2 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 700, color: "#0f172a", margin: "12px 0 16px",
            }}>
              Let's Build Something Together
            </h2>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.75, marginBottom: 40 }}>
              Whether you're an investor, business leader, or government official, WS Consortium
              Forum offers the perfect platform to engage with top-level stakeholders and drive meaningful change.
            </p>

            {[
              { icon: "📧", label: "Email", value: "info@wsconsortium.com" },
              { icon: "📞", label: "Phone", value: "+91 9041856756" },
              { icon: "📍", label: "Office", value: "Cyber City, DLF Phase III, Tower 9A, Gurugram 122002" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: "#eff6ff", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, color: "#374151" }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right form */}
          <div style={{
            background: "#f8faff",
            border: "1px solid #e8edf5",
            borderRadius: 20, padding: "40px",
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: "0 0 10px" }}>
                  Application Received!
                </h3>
                <p style={{ fontSize: 15, color: "#6b7280" }}>
                  Our team will reach out to you shortly.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>
                  Membership Application
                </h3>
                {[
                  { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                  { name: "email", label: "Email Address", type: "email", placeholder: "you@company.com" },
                  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type} name={field.name}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      style={{
                        width: "100%", padding: "11px 14px",
                        border: "1px solid #e8edf5", borderRadius: 10,
                        fontSize: 14, color: "#0f172a",
                        background: "#fff", outline: "none",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#1a56db")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#e8edf5")}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                    Membership Type
                  </label>
                  <select name="membership" value={form.membership} onChange={handleChange} style={{
                    width: "100%", padding: "11px 14px",
                    border: "1px solid #e8edf5", borderRadius: 10,
                    fontSize: 14, color: "#0f172a",
                    background: "#fff", outline: "none", boxSizing: "border-box",
                  }}>
                    <option value="">Select membership type</option>
                    <option value="individual">Individual — $1,500/year</option>
                    <option value="sme">SME Corporate — $4,500/year</option>
                    <option value="corporate">Large Corporate — $9,000/year</option>
                  </select>
                </div>
                <button onClick={handleSubmit} style={{
                  background: "#1a56db", color: "#fff",
                  border: "none", padding: "13px",
                  borderRadius: 10, fontSize: 15, fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s, transform 0.15s",
                  marginTop: 4,
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "#1447c0";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "#1a56db";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Submit Application
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer: React.FC = () => (
  <footer style={{
    background: "#0f172a",
    padding: "60px 2rem 32px",
    color: "#fff",
  }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              background: "linear-gradient(135deg, #1a56db, #0ea5e9)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>WS</span>
            </div>
            <span style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 17 }}>WS Consortium</span>
          </div>
          <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, maxWidth: 280 }}>
            Fostering global collaborations, connecting leaders and businesses to drive economic growth
            and create impactful partnerships across key sectors.
          </p>
        </div>
        {[
          { title: "Quick Links", links: ["Home", "About Us", "Advisory", "Intelligence", "Membership"] },
          { title: "Services", links: ["International Relations", "Strategic Advisory", "Investment Promotion", "Market Intelligence"] },
          { title: "Contact", links: ["info@wsconsortium.com", "+91 9041856756", "Gurugram, India"] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 16, margin: "0 0 16px" }}>
              {col.title}
            </h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map(link => (
                <li key={link}>
                  <span style={{ fontSize: 13, color: "#94a3b8", cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#60a5fa"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#94a3b8"}
                  >
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        borderTop: "1px solid #1e293b", paddingTop: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 13, color: "#64748b" }}>© 2024 WS Consortium. All Rights Reserved.</span>
        <span style={{ fontSize: 13, color: "#64748b" }}>Gurugram, India</span>
      </div>
    </div>
  </footer>
);

// Section label pill
const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <span style={{
    display: "inline-block",
    background: "#eff6ff", color: "#1e40af",
    fontSize: 12, fontWeight: 600,
    padding: "4px 12px", borderRadius: 100,
    border: "1px solid #bfdbfe",
    letterSpacing: 0.5, textTransform: "uppercase",
  }}>
    {text}
  </span>
);

// ── App Root ───────────────────────────────────────────────────────────────
const App: React.FC = () => (
  <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", overflowX: "hidden" }}>
    <Navbar />
    <Hero />
    <About />
    <Expertise />
    <Advisory />
    <Membership />
    <Contact />
    <Footer />
  </div>
);

export default App;
