"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Play, Sparkles, Music, Video, Upload, CheckCircle, Star, Zap, Heart, Share2, Clock, Shield, ArrowRight, ChevronDown } from "lucide-react";

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

function FloatingStar({ className, delay, style }: { className?: string; delay: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`absolute animate-star-float ${className || ""}`}
      style={{ animationDelay: delay, zIndex: 1, ...style }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.82 19.02L12 16.09L7.18 19.02L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="0.5"/>
      </svg>
    </div>
  );
}

function SparkleDot({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute animate-sparkle ${className || ""}`} style={style}>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <circle cx="4" cy="4" r="4" fill="#fbbf24"/>
      </svg>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#0d0b1e" }}>
      {/* Navbar */}
      <nav className="glass" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L19 12L27 13L21 19L23 27L16 23L9 27L11 19L5 13L13 12L16 4Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="1"/>
            </svg>
            <span className="font-display" style={{ fontSize: 22, color: "#f8fafc", letterSpacing: "-0.5px" }}>TinyStarAI</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
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
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 80 }}>
        <StarField />
        <FloatingStar className="animate-star-float" delay="0s" style={{ top: "15%", left: "8%", animationDuration: "4s" } as React.CSSProperties} />
        <FloatingStar className="animate-star-float" delay="1.2s" style={{ top: "25%", right: "12%", animationDuration: "5s" } as React.CSSProperties} />
        <FloatingStar className="animate-star-float" delay="2.5s" style={{ top: "60%", left: "5%", animationDuration: "3.5s" } as React.CSSProperties} />
        <FloatingStar className="animate-star-float" delay="0.8s" style={{ top: "70%", right: "8%", animationDuration: "4.5s" } as React.CSSProperties} />
        <FloatingStar className="animate-star-float" delay="1.8s" style={{ top: "40%", left: "15%", animationDuration: "6s" } as React.CSSProperties} />
        <SparkleDot className="" style={{ top: "20%", left: "25%", animationDelay: "0.5s", animationDuration: "3s" } as React.CSSProperties} />
        <SparkleDot className="" style={{ top: "35%", right: "20%", animationDelay: "1s", animationDuration: "2.5s" } as React.CSSProperties} />
        <SparkleDot className="" style={{ top: "55%", left: "10%", animationDelay: "1.5s", animationDuration: "4s" } as React.CSSProperties} />
        <SparkleDot className="" style={{ top: "80%", right: "15%", animationDelay: "2s", animationDuration: "3s" } as React.CSSProperties} />
        <SparkleDot className="" style={{ top: "12%", right: "30%", animationDelay: "0.3s", animationDuration: "2.8s" } as React.CSSProperties} />
        <SparkleDot className="" style={{ top: "45%", left: "3%", animationDelay: "2.2s", animationDuration: "3.5s" } as React.CSSProperties} />

        {/* Radial gradient glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vw", height: "80vh", background: "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 800, padding: "0 24px" }}>
          <div className="animate-slide-up" style={{ opacity: 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: 50, padding: "8px 20px", marginBottom: 24 }}>
              <Sparkles size={16} color="#a78bfa" />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#a78bfa" }}>Powered by AI Magic ✨</span>
            </div>
          </div>

          <h1 className="animate-slide-up delay-200 font-display" style={{ opacity: 0, fontSize: "clamp(40px, 8vw, 72px)", lineHeight: 1.1, marginBottom: 24, background: "linear-gradient(135deg, #f8fafc 0%, #a78bfa 50%, #fbbf24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1px" }}>
            Your Kid Stars in Their Own Music Video
          </h1>

          <p className="animate-slide-up delay-300" style={{ opacity: 0, fontSize: "clamp(16px, 2.5vw, 20px)", color: "#94a3b8", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6 }}>
            Upload a photo. Enter their name. In 20 minutes, receive a fully personalized, 
            animated music video starring your little one — with a song written just for them.
          </p>

          <div className="animate-slide-up delay-400" style={{ opacity: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <Link href="/create">
              <button className="btn-gold animate-glow-pulse" style={{ fontSize: 18, padding: "16px 40px" }}>
                <Sparkles size={20} /> Create Their Video — $25
              </button>
            </Link>
            <span style={{ fontSize: 13, color: "#64748b" }}>No subscription required · Download in minutes</span>
          </div>

          <div className="animate-slide-up delay-600" style={{ opacity: 0, marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <ChevronDown size={20} color="#64748b" className="animate-float" />
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section style={{ background: "rgba(26,23,48,0.8)", borderTop: "1px solid rgba(167,139,250,0.1)", borderBottom: "1px solid rgba(167,139,250,0.1)", padding: "24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {[
            { icon: "⭐", text: "4.9/5 from 500+ parents" },
            { icon: "🎵", text: "1,200+ videos created" },
            { icon: "⏱️", text: "Ready in ~20 minutes" },
            { icon: "🎁", text: "The perfect birthday gift" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#94a3b8" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 className="font-display animate-slide-up" style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: 16 }}>
            Three Steps to <span style={{ color: "#fbbf24" }}>Stardom</span>
          </h2>
          <p className="animate-slide-up delay-200" style={{ opacity: 0, fontSize: 18, color: "#94a3b8", maxWidth: 500, margin: "0 auto" }}>
            From photo to premiere in about 20 minutes. Pure magic, zero complexity.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
          {[
            {
              step: "01",
              icon: <Upload size={32} color="#a78bfa" />,
              title: "Upload Their Photo",
              desc: "Pick a favorite photo of your child. Any pose, any vibe — our AI handles the rest.",
              color: "#7c3aed",
            },
            {
              step: "02",
              icon: <Sparkles size={32} color="#fbbf24" />,
              title: "AI Creates the Magic",
              desc: "We cartoonize the photo, write an original song featuring their name and interests, generate the music, and animate scenes.",
              color: "#f59e0b",
            },
            {
              step: "03",
              icon: <Play size={32} color="#34d399" />,
              title: "Download & Share",
              desc: "Receive a 60-90 second music video. Post it, gift it, watch them light up.",
              color: "#34d399",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="card animate-slide-up"
              style={{
                opacity: 0,
                animationDelay: `${i * 150}ms`,
                position: "relative",
                overflow: "hidden",
                animation: `slide-up 0.6s ease-out ${i * 150}ms forwards`,
              }}
            >
              <div style={{ position: "absolute", top: -20, right: -20, fontSize: 100, fontWeight: 800, color: item.color, opacity: 0.05, fontFamily: "'Fredoka One', cursive" }}>
                {item.step}
              </div>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: `${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, color: "#f8fafc" }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example Preview */}
      <section style={{ padding: "80px 24px", background: "rgba(26,23,48,0.5)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 12 }}>
              What You <span style={{ color: "#fbbf24" }}>Receive</span>
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 16 }}>A fully produced mini-music video, built around your child</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {[
              { emoji: "🎨", title: "Cartoonized Photo", desc: "AI transforms their photo into a vibrant cartoon character" },
              { emoji: "🎵", title: "Original Song", desc: "Unique lyrics featuring their name and favorite things" },
              { emoji: "🎬", title: "6-8 Animated Scenes", desc: "Each verse gets its own animated visual scene" },
              { emoji: "🏆", title: "60-90 Second Video", desc: "Perfect length for sharing, saving, and rewatching" },
              { emoji: "📥", title: "HD Download", desc: "Full quality MP4 to keep forever" },
              { emoji: "🌟", title: "Share-Worthy Quality", desc: "TikTok, Instagram, YouTube Shorts — ready to post" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px", borderRadius: 16, background: "rgba(13,11,30,0.5)", border: "1px solid rgba(167,139,250,0.1)" }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "#f8fafc" }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.15, marginBottom: 24 }}>
              Why Parents <span style={{ color: "#fbbf24" }}>Love</span> It
            </h2>
            {[
              { icon: <Heart size={20} color="#f87171" />, text: "100% personalized — their name in every chorus" },
              { icon: <Zap size={20} color="#fbbf24" />, text: "Ready in ~20 minutes while you make dinner" },
              { icon: <Video size={20} color="#a78bfa" />, text: "Cinematic quality with animated cartoon visuals" },
              { icon: <Star size={20} color="#fbbf24" />, text: "Every video is a unique original creation" },
              { icon: <Shield size={20} color="#34d399" />, text: "Your photo is never stored or shared" },
              { icon: <Clock size={20} color="#60a5fa" />, text: "Order anytime — rush delivery available" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(26,23,48,0.8)", border: "1px solid rgba(167,139,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, color: "#e2e8f0" }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Demo card preview */}
          <div style={{ position: "relative" }}>
            <div style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", borderRadius: 24, padding: 32, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: "rgba(251,191,36,0.3)", borderRadius: "50%", filter: "blur(40px)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, background: "rgba(167,139,250,0.3)", borderRadius: "50%", filter: "blur(30px)" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 60, height: 60, borderRadius: 12, background: "linear-gradient(135deg, #fbbf24, #f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: "0 4px 20px rgba(251,191,36,0.4)" }}>
                    👧🏻
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: "white" }}>Emma's Star Adventure</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Processing... 87%</div>
                  </div>
                </div>

                <div style={{ background: "rgba(13,11,30,0.6)", borderRadius: 16, padding: 16 }}>
                  <div style={{ display: "grid", gap: 10 }}>
                    {[
                      { label: "Cartoonize", done: true },
                      { label: "Write Song", done: true },
                      { label: "Generate Music", done: true },
                      { label: "Create Scenes", done: false, active: true },
                      { label: "Stitch Video", done: false },
                    ].map((step, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {step.done ? (
                          <CheckCircle size={16} color="#fbbf24" />
                        ) : step.active ? (
                          <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #a78bfa", borderTopColor: "transparent", animation: "spin-slow 1s linear infinite" }} />
                        ) : (
                          <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(167,139,250,0.3)" }} />
                        )}
                        <span style={{ fontSize: 13, fontWeight: 600, color: step.done ? "#fbbf24" : step.active ? "#a78bfa" : "#64748b" }}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                  <button disabled style={{ flex: 1, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", cursor: "not-allowed" }}>
                    <Share2 size={14} style={{ display: "inline", marginRight: 4 }} /> Share Preview
                  </button>
                  <button disabled style={{ flex: 1, background: "rgba(251,191,36,0.2)", border: "none", borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 600, color: "rgba(251,191,36,0.5)", cursor: "not-allowed" }}>
                    <Play size={14} style={{ display: "inline", marginRight: 4 }} /> Download
                  </button>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div style={{ position: "absolute", top: -16, right: -16, background: "#fbbf24", color: "#0d0b1e", fontWeight: 800, fontSize: 13, padding: "8px 16px", borderRadius: 50, boxShadow: "0 4px 20px rgba(251,191,36,0.4)", animation: "float 3s ease-in-out infinite" }}>
              ✨ Almost Ready!
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section" style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 48px)", marginBottom: 12 }}>
            One Price. <span style={{ color: "#fbbf24" }}>One Magical Gift.</span>
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 16 }}>No subscriptions. No hidden fees. Just an unforgettable memory.</p>
        </div>

        <div className="card animate-scale-in" style={{ textAlign: "center", padding: 48, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "linear-gradient(90deg, #7c3aed, #fbbf24, #7c3aed)", backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite" }} />

          <div style={{ fontSize: 64, marginBottom: 8 }}>🎬</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#a78bfa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>Personalized Music Video</div>

          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8, marginBottom: 32 }}>
            <span className="font-display" style={{ fontSize: 72, color: "#fbbf24" }}>$25</span>
            <span style={{ color: "#64748b", fontSize: 18 }}>per video</span>
          </div>

          <div style={{ display: "grid", gap: 12, marginBottom: 32, textAlign: "left", maxWidth: 320, margin: "0 auto 32px" }}>
            {[
              "Cartoonized character version of their photo",
              "Original AI-written song with their name",
              "Full instrumental track (up to 5 minutes)",
              "6-8 animated music video scenes",
              "60-90 second HD MP4 download",
              "Share-ready for any social platform",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle size={18} color="#34d399" />
                <span style={{ fontSize: 15, color: "#e2e8f0" }}>{item}</span>
              </div>
            ))}
          </div>

          <Link href="/create">
            <button className="btn-gold" style={{ width: "100%", fontSize: 18, padding: "18px", justifyContent: "center" }}>
              <Sparkles size={20} /> Create Emma's Video — $25
            </button>
          </Link>
          <p style={{ marginTop: 16, fontSize: 13, color: "#64748b" }}>Usually ready in ~20 minutes · Rush available at checkout</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2 className="font-display" style={{ fontSize: 36, textAlign: "center", marginBottom: 40 }}>
          Common Questions
        </h2>
        <div style={{ display: "grid", gap: 12 }}>
          {[
            {
              q: "What age range works best?",
              a: "Ages 3-12 absolutely love it. The cartoon style works great for any photo — baby pictures, school photos, candid shots all look magical."
            },
            {
              q: "How long does it take?",
              a: "Most videos are ready in 15-30 minutes. During peak times it might take up to an hour. You'll get an email when it's done!"
            },
            {
              q: "What photo should I upload?",
              a: "Any clear photo where the child's face is visible works great. Full body, headshot, candid — our AI adapts. Avoid heavily filtered photos."
            },
            {
              q: "Can I get a rush order?",
              a: "Yes! At checkout you can select priority processing. We'll have it ready in under 2 hours for a small extra fee."
            },
            {
              q: "What interests can I include?",
              a: "Anything! Dinosaurs, space, unicorns, sports, music, art, animals, superheroes — just tell us what they love and we'll weave it into the song."
            },
            {
              q: "Is my photo kept private?",
              a: "100%. Your photo is used only to generate your video and is never stored, shared, or used for any other purpose. Deleted immediately after processing."
            },
          ].map((item, i) => (
            <details key={i} className="card" style={{ cursor: "pointer", padding: 20 }}>
              <summary style={{ fontWeight: 700, fontSize: 16, color: "#f8fafc", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {item.q}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, transition: "transform 0.2s" }}>
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </summary>
              <p style={{ marginTop: 12, fontSize: 14, color: "#94a3b8", lineHeight: 1.7, paddingTop: 12, borderTop: "1px solid rgba(167,139,250,0.1)" }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
          <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 52px)", marginBottom: 20, lineHeight: 1.1 }}>
            Give Them a Video<br />They'll Never Forget
          </h2>
          <p style={{ fontSize: 18, color: "#94a3b8", marginBottom: 36, maxWidth: 450, margin: "0 auto 36px" }}>
            Birthdays, holidays, or just because — this is the gift that makes them the star.
          </p>
          <Link href="/create">
            <button className="btn-gold animate-glow-pulse" style={{ fontSize: 18, padding: "18px 48px" }}>
              <Sparkles size={20} /> Start Creating — $25
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(167,139,250,0.1)", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L19 12L27 13L21 19L23 27L16 23L9 27L11 19L5 13L13 12L16 4Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="1"/>
            </svg>
            <span className="font-display" style={{ fontSize: 18, color: "#f8fafc" }}>TinyStarAI</span>
          </div>
          <p style={{ fontSize: 13, color: "#64748b" }}>
            © 2026 TinyStarAI · Made with ✨ for kids everywhere
          </p>
        </div>
      </footer>
    </div>
  );
}
