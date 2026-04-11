"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, Upload, Play, CheckCircle, Star, Heart, Zap, Video, Clock, Shield, ArrowRight, ChevronDown } from "lucide-react";

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: { x: number; y: number; r: number; speed: number; opacity: number; twinkleSpeed: number; phase: number }[] = [];
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;
      for (const s of stars) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.phase) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 249, 195, ${s.opacity * twinkle})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < -10) {
          s.y = canvas.height + 10;
          s.x = Math.random() * canvas.width;
        }
      }
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(13,11,30,0.98)", backdropFilter: "blur(20px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 32,
        animation: "fade-in 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", padding: 8 }}
      >
        <X size={28} color="#f8fafc" />
      </button>
      <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <a href="#how-it-works" onClick={onClose} style={{ color: "#f8fafc", textDecoration: "none", fontSize: 22, fontWeight: 700 }}>How It Works</a>
        <a href="#pricing" onClick={onClose} style={{ color: "#f8fafc", textDecoration: "none", fontSize: 22, fontWeight: 700 }}>Pricing</a>
        <a href="#faq" onClick={onClose} style={{ color: "#f8fafc", textDecoration: "none", fontSize: 22, fontWeight: 700 }}>FAQ</a>
        <Link href="/create" onClick={onClose}>
          <button className="btn-gold" style={{ fontSize: 18, padding: "14px 36px" }}>
            <Sparkles size={18} /> Make a Video
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0d0b1e" }}>

      {/* Mobile Menu Overlay */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Navbar */}
      <nav className="glass" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 20px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L19 12L27 13L21 19L23 27L16 23L9 27L11 19L5 13L13 12L16 4Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="1"/>
            </svg>
            <span className="font-display" style={{ fontSize: 20, color: "#f8fafc", letterSpacing: "-0.5px" }}>TinyStarAI</span>
          </Link>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <a href="#how-it-works" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14, fontWeight: 600, transition: "color 0.2s" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#f8fafc")}
               onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}>
              How It Works
            </a>
            <a href="#pricing" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 14, fontWeight: 600, transition: "color 0.2s" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#f8fafc")}
               onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}>
              Pricing
            </a>
            <Link href="/create">
              <button className="btn-gold" style={{ padding: "10px 24px", fontSize: 14 }}>
                Make a Video <ArrowRight size={16} />
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "none" }}
            className="mobile-menu-btn"
            aria-label="Open menu"
          >
            <Menu size={26} color="#f8fafc" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 70 }}>
        <StarField />

        {/* Desktop-only floating stars */}
        <div className="desktop-floating-stars" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <div style={{ position: "absolute", top: "15%", left: "8%", animation: "star-float 4s ease-in-out infinite" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.09L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="0.5"/></svg>
          </div>
          <div style={{ position: "absolute", top: "25%", right: "12%", animation: "star-float 5s ease-in-out infinite 1.2s" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.09L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="0.5"/></svg>
          </div>
          <div style={{ position: "absolute", top: "60%", left: "5%", animation: "star-float 3.5s ease-in-out infinite 2.5s" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.09L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="0.5"/></svg>
          </div>
          <div style={{ position: "absolute", top: "70%", right: "8%", animation: "star-float 4.5s ease-in-out infinite 0.8s" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.09L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="0.5"/></svg>
          </div>
        </div>

        {/* Radial glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vw", height: "80vh", background: "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800, padding: "0 20px" }}>
          <div style={{ opacity: 0, animation: "slide-up 0.6s ease-out forwards" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 50, padding: "8px 18px", marginBottom: 20 }}>
              <Sparkles size={15} color="#a78bfa" />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#a78bfa" }}>Powered by AI Magic ✨</span>
            </div>
          </div>

          <h1 className="font-display animate-slide-up delay-200" style={{ opacity: 0, animationDelay: "200ms", fontSize: "clamp(34px, 8vw, 68px)", lineHeight: 1.1, marginBottom: 20, background: "linear-gradient(135deg, #f8fafc 0%, #a78bfa 50%, #fbbf24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1px" }}>
            Your Kid Stars in Their Own Music Video
          </h1>

          <p className="animate-slide-up delay-300" style={{ opacity: 0, animationDelay: "300ms", fontSize: "clamp(15px, 2.5vw, 19px)", color: "#94a3b8", maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Upload a photo. Enter their name. In 20 minutes, receive a fully personalized, animated music video starring your little one.
          </p>

          <div className="animate-slide-up delay-400" style={{ opacity: 0, animationDelay: "400ms", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <Link href="/create">
              <button className="btn-gold animate-glow-pulse" style={{ fontSize: 17, padding: "15px 36px", width: "100%", maxWidth: 320, justifyContent: "center" }}>
                <Sparkles size={18} /> Create Their Video — $25
              </button>
            </Link>
            <span style={{ fontSize: 12, color: "#64748b" }}>No subscription · Download in minutes</span>
          </div>

          <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
            <ChevronDown size={20} color="#64748b" style={{ animation: "float 2s ease-in-out infinite" }} />
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section style={{ background: "rgba(26,23,48,0.9)", borderTop: "1px solid rgba(167,139,250,0.1)", borderBottom: "1px solid rgba(167,139,250,0.1)", padding: "20px 16px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {[
            { icon: "⭐", text: "4.9/5 parents" },
            { icon: "🎵", text: "1,200+ videos" },
            { icon: "⏱️", text: "~20 min" },
            { icon: "🎁", text: "Perfect gift" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px" }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", whiteSpace: "nowrap" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: "clamp(48px, 8vw, 80px) 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 46px)", marginBottom: 12 }}>
            Three Steps to <span style={{ color: "#fbbf24" }}>Stardom</span>
          </h2>
          <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "#94a3b8", maxWidth: 440, margin: "0 auto" }}>
            From photo to premiere in about 20 minutes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            {
              step: "01",
              icon: <Upload size={28} color="#a78bfa" />,
              title: "Upload Their Photo",
              desc: "Pick a favorite photo of your child. Any pose — our AI handles the rest.",
              color: "#7c3aed",
            },
            {
              step: "02",
              icon: <Sparkles size={28} color="#fbbf24" />,
              title: "AI Creates the Magic",
              desc: "We cartoonize the photo, write an original song with their name, generate music and animate scenes.",
              color: "#f59e0b",
            },
            {
              step: "03",
              icon: <Play size={28} color="#34d399" />,
              title: "Download & Share",
              desc: "Receive a 60-90 second music video. Post it, gift it, watch them light up.",
              color: "#34d399",
            },
          ].map((item, i) => (
            <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 20, padding: 24, position: "relative", overflow: "hidden", transition: "all 0.2s" }}>
              <div style={{ position: "absolute", top: -16, right: -16, fontSize: 80, fontWeight: 800, color: item.color, opacity: 0.05, fontFamily: "'Fredoka One', cursive", lineHeight: 1 }}>{item.step}</div>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: `${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8, color: "#f8fafc" }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What You Receive */}
      <section style={{ padding: "clamp(48px, 8vw, 80px) 20px", background: "rgba(26,23,48,0.5)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="font-display" style={{ fontSize: "clamp(24px, 4vw, 38px)", marginBottom: 10 }}>
              What You <span style={{ color: "#fbbf24" }}>Receive</span>
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 15 }}>A fully produced mini-music video, built around your child</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { emoji: "🎨", title: "Cartoonized Photo", desc: "AI transforms their photo into a vibrant cartoon character" },
              { emoji: "🎵", title: "Original Song", desc: "Unique lyrics featuring their name and favorite things" },
              { emoji: "🎬", title: "6-8 Animated Scenes", desc: "Each verse gets its own animated visual scene" },
              { emoji: "🏆", title: "60-90 Second Video", desc: "Perfect length for sharing and rewatching" },
              { emoji: "📥", title: "HD Download", desc: "Full quality MP4 to keep forever" },
              { emoji: "🌟", title: "Share-Worthy", desc: "TikTok, Instagram, YouTube Shorts ready" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px", borderRadius: 14, background: "rgba(13,11,30,0.5)", border: "1px solid rgba(167,139,250,0.1)" }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3, color: "#f8fafc" }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Parents Love It */}
      <section style={{ padding: "clamp(48px, 8vw, 80px) 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "center" }}>
          {/* Left: text */}
          <div>
            <h2 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 42px)", lineHeight: 1.15, marginBottom: 24 }}>
              Why Parents <span style={{ color: "#fbbf24" }}>Love</span> It
            </h2>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                { icon: <Heart size={18} color="#f87171" />, text: "100% personalized — their name in every chorus" },
                { icon: <Zap size={18} color="#fbbf24" />, text: "Ready in ~20 minutes while you make dinner" },
                { icon: <Video size={18} color="#a78bfa" />, text: "Cinematic quality with animated visuals" },
                { icon: <Star size={18} color="#fbbf24" />, text: "Every video is a unique original creation" },
                { icon: <Shield size={18} color="#34d399" />, text: "Your photo is never stored or shared" },
                { icon: <Clock size={18} color="#60a5fa" />, text: "Order anytime — rush delivery available" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(26,23,48,0.8)", border: "1px solid rgba(167,139,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: demo card */}
          <div style={{ position: "relative" }}>
            <div style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", borderRadius: 24, padding: "clamp(20px, 4vw, 32px)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: "rgba(251,191,36,0.3)", borderRadius: "50%", filter: "blur(40px)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, background: "rgba(167,139,250,0.3)", borderRadius: "50%", filter: "blur(30px)" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "linear-gradient(135deg, #fbbf24, #f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 4px 20px rgba(251,191,36,0.4)", flexShrink: 0 }}>
                    👧🏻
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 17, color: "white" }}>Emma's Star Adventure</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Processing... 87%</div>
                  </div>
                </div>

                <div style={{ background: "rgba(13,11,30,0.6)", borderRadius: 14, padding: 14 }}>
                  <div style={{ display: "grid", gap: 9 }}>
                    {[
                      { label: "Cartoonize", done: true },
                      { label: "Write Song", done: true },
                      { label: "Generate Music", done: true },
                      { label: "Create Scenes", done: false, active: true },
                      { label: "Stitch Video", done: false },
                    ].map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {step.done ? (
                          <CheckCircle size={15} color="#fbbf24" />
                        ) : step.active ? (
                          <div style={{ width: 15, height: 15, borderRadius: "50%", border: "2px solid #a78bfa", borderTopColor: "transparent", animation: "spin-slow 1s linear infinite" }} />
                        ) : (
                          <div style={{ width: 15, height: 15, borderRadius: "50%", border: "2px solid rgba(167,139,250,0.3)" }} />
                        )}
                        <span style={{ fontSize: 12, fontWeight: 600, color: step.done ? "#fbbf24" : step.active ? "#a78bfa" : "#64748b" }}>
                          {step.active ? "✨ " : ""}{step.label}{step.active ? "..." : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                  <button disabled style={{ flex: 1, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 9, padding: "9px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", cursor: "not-allowed" }}>
                    Share Preview
                  </button>
                  <button disabled style={{ flex: 1, background: "rgba(251,191,36,0.2)", border: "none", borderRadius: 9, padding: "9px", fontSize: 12, fontWeight: 600, color: "rgba(251,191,36,0.5)", cursor: "not-allowed" }}>
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Floating badge - responsive positioning */}
            <div style={{ position: "absolute", top: -12, right: "clamp(-8px, 2vw, -16px)", background: "#fbbf24", color: "#0d0b1e", fontWeight: 800, fontSize: 12, padding: "6px 14px", borderRadius: 50, boxShadow: "0 4px 20px rgba(251,191,36,0.4)", animation: "float 3s ease-in-out infinite", whiteSpace: "nowrap" }}>
              ✨ Almost Ready!
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: "clamp(48px, 8vw, 80px) 20px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 46px)", marginBottom: 10 }}>
            One Price. <span style={{ color: "#fbbf24" }}>One Magical Gift.</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 15 }}>No subscriptions. No hidden fees. Just an unforgettable memory.</p>
        </div>

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 24, textAlign: "center", padding: "clamp(24px, 5vw, 44px)", position: "relative", overflow: "hidden", animation: "scale-in 0.4s ease-out" }}>
          {/* Shimmer bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #7c3aed, #fbbf24, #7c3aed)", backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite" }} />

          <div style={{ fontSize: 56, marginBottom: 6 }}>🎬</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>Personalized Music Video</div>

          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, marginBottom: 28 }}>
            <span className="font-display" style={{ fontSize: "clamp(48px, 10vw, 72px)", color: "#fbbf24", lineHeight: 1 }}>$25</span>
            <span style={{ color: "#64748b", fontSize: 16 }}>per video</span>
          </div>

          <div style={{ display: "grid", gap: 10, marginBottom: 28, textAlign: "left", maxWidth: 320, margin: "0 auto 28px" }}>
            {[
              "Cartoonized character version of their photo",
              "Original AI-written song with their name",
              "Full instrumental track (up to 5 min)",
              "6-8 animated music video scenes",
              "60-90 second HD MP4 download",
              "Share-ready for any platform",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle size={16} color="#34d399" />
                <span style={{ fontSize: 14, color: "#e2e8f0" }}>{item}</span>
              </div>
            ))}
          </div>

          <Link href="/create">
            <button className="btn-gold" style={{ width: "100%", fontSize: 17, padding: "16px", justifyContent: "center" }}>
              <Sparkles size={18} /> Create Their Video — $25
            </button>
          </Link>
          <p style={{ marginTop: 14, fontSize: 12, color: "#64748b" }}>Ready in ~20 minutes · Rush available</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "clamp(48px, 8vw, 80px) 20px", maxWidth: 700, margin: "0 auto" }}>
        <h2 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 36px)", textAlign: "center", marginBottom: 32 }}>
          Common Questions
        </h2>
        <div style={{ display: "grid", gap: 12 }}>
          {[
            { q: "What age range works best?", a: "Ages 3-12 absolutely love it. The cartoon style works great for any photo — baby pictures, school photos, candid shots all look magical." },
            { q: "How long does it take?", a: "Most videos are ready in 15-30 minutes. During peak times it might take up to an hour. You'll get an email when it's done!" },
            { q: "What photo should I upload?", a: "Any clear photo where the child's face is visible works great. Full body, headshot, candid — our AI adapts. Avoid heavily filtered photos." },
            { q: "Can I get a rush order?", a: "Yes! At checkout you can select priority processing. We'll have it ready in under 2 hours for a small extra fee." },
            { q: "What interests can I include?", a: "Anything! Dinosaurs, space, unicorns, sports, music, art, animals, superheroes — just tell us what they love and we'll weave it into the song." },
            { q: "Is my photo kept private?", a: "100%. Your photo is used only to generate your video and is never stored, shared, or used for any other purpose." },
          ].map((item, i) => (
            <details key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 20px", cursor: "pointer" }}>
              <summary style={{ fontWeight: 700, fontSize: 15, color: "#f8fafc", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {item.q}
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, color: "#a78bfa" }}>
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </summary>
              <p style={{ marginTop: 10, fontSize: 14, color: "#94a3b8", lineHeight: 1.7, paddingTop: 10, borderTop: "1px solid rgba(167,139,250,0.1)" }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "clamp(60px, 10vw, 100px) 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>✨</div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 50px)", marginBottom: 18, lineHeight: 1.15 }}>
            Give Them a Video<br />They'll Never Forget
          </h2>
          <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "#94a3b8", marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
            Birthdays, holidays, or just because — this is the gift that makes them the star.
          </p>
          <Link href="/create">
            <button className="btn-gold animate-glow-pulse" style={{ fontSize: 17, padding: "16px 44px" }}>
              <Sparkles size={18} /> Start Creating — $25
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(167,139,250,0.1)", padding: "28px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L19 12L27 13L21 19L23 27L16 23L9 27L11 19L5 13L13 12L16 4Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="1"/>
            </svg>
            <span className="font-display" style={{ fontSize: 17, color: "#f8fafc" }}>TinyStarAI</span>
          </div>
          <p style={{ fontSize: 12, color: "#64748b" }}>
            © 2026 TinyStarAI · Made with ✨ for kids everywhere
          </p>
        </div>
      </footer>

    </div>
  );
}
