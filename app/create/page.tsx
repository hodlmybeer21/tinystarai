"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Sparkles, Music, Video, ChevronRight, ChevronLeft, X, CheckCircle, Star, Loader, Play } from "lucide-react";
import Navbar from "@/components/Navbar";

const INTERESTS = [
  "Dinosaurs", "Space", "Unicorns", "Sports", "Music", "Art",
  "Animals", "Superheroes", "Princesses", "Pirates", "Robots", "Dragons",
];

const PIPELINE_STEPS = [
  { id: "upload", label: "Upload", icon: Upload },
  { id: "cartoonize", label: "Cartoonize", icon: Sparkles },
  { id: "write_lyrics", label: "Write Song", icon: Music },
  { id: "generate_music", label: "Generate Music", icon: Music },
  { id: "create_scenes", label: "Create Scenes", icon: Video },
  { id: "stitch", label: "Stitch Video", icon: Video },
  { id: "done", label: "Done", icon: CheckCircle },
];

type StepId = "details" | "processing" | "complete" | "preview";

export default function CreatePage() {
  const [step, setStep] = useState<StepId>("details");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [kidName, setKidName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [email, setEmail] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setUploadError(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setUploadError("Please upload a JPEG, PNG, or WebP photo");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image must be under 10MB");
      return;
    }
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const startProcessing = async () => {
    if (!photo || !kidName.trim() || selectedInterests.length === 0) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("kidName", kidName.trim());
      formData.append("interests", JSON.stringify(selectedInterests));
      if (email) formData.append("email", email);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      setJobId(data.jobId);
      setStep("processing");
      setProcessingStep(0);
      setProgress(5);

      // Simulate pipeline steps
      await runPipeline(data.jobId);
    } catch (err) {
      console.error(err);
      setUploadError("Something went wrong. Please try again.");
      setIsUploading(false);
    }
  };

  const runPipeline = async (id: string) => {
    const steps = [1, 2, 3, 4, 5, 6, 7];
    const delays = [3000, 4000, 3500, 5000, 6000, 5000, 2000];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, delays[i]));
      setProcessingStep(i + 1);
      setProgress(Math.round(((i + 1) / 7) * 100));
    }

    setStep("complete");
    setIsUploading(false);
  };

  const goToPreview = () => setStep("preview");

  return (
    <div style={{ background: "#0d0b1e", minHeight: "100vh", color: "#f8fafc" }}>
      <Navbar />

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "100px 24px 60px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1 className="font-display" style={{ fontSize: 36, marginBottom: 8 }}>
            {step === "details" && "Create a Magic Video"}
            {step === "processing" && "Creating Magic..."}
            {step === "complete" && "Your Video is Ready!"}
            {step === "preview" && `${kidName}'s Star Adventure`}
          </h1>
          {step === "details" && (
            <p style={{ color: "#94a3b8", fontSize: 16 }}>Three steps to their very own music video</p>
          )}
        </div>

        {/* Step 1: Details */}
        {step === "details" && (
          <div className="animate-slide-up">
            {/* Upload Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${isDragging ? "#a78bfa" : uploadError ? "#f87171" : photoPreview ? "#34d399" : "rgba(167,139,250,0.3)"}`,
                borderRadius: 20,
                padding: photoPreview ? 16 : 48,
                textAlign: "center",
                cursor: "pointer",
                background: isDragging ? "rgba(124,58,237,0.1)" : "rgba(26,23,48,0.5)",
                transition: "all 0.2s",
                marginBottom: 32,
              }}
            >
              {photoPreview ? (
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: 240, borderRadius: 12, objectFit: "cover" }}
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); setPhoto(null); setPhotoPreview(null); }}
                    style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.7)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  >
                    <X size={16} color="white" />
                  </button>
                  <div style={{ marginTop: 12, fontSize: 14, color: "#34d399", fontWeight: 600 }}>
                    <CheckCircle size={16} style={{ display: "inline", marginRight: 4 }} />
                    Photo uploaded!
                  </div>
                </div>
              ) : (
                <>
                  <Upload size={40} color={isDragging ? "#a78bfa" : "#64748b"} style={{ marginBottom: 16 }} />
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                    {isDragging ? "Drop it!" : "Upload their photo"}
                  </div>
                  <div style={{ fontSize: 14, color: "#64748b" }}>
                    Drag & drop or click to browse · JPEG, PNG, WebP · Max 10MB
                  </div>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>
            {uploadError && (
              <div style={{ color: "#f87171", fontSize: 13, marginTop: -24, marginBottom: 24, fontWeight: 600 }}>
                {uploadError}
              </div>
            )}

            {/* Kid's Name */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontWeight: 700, fontSize: 15, marginBottom: 8, color: "#e2e8f0" }}>
                What's their name? <span style={{ color: "#f87171" }}>*</span>
              </label>
              <input
                className="input"
                type="text"
                placeholder="e.g. Emma, Liam, Sofia"
                value={kidName}
                onChange={(e) => setKidName(e.target.value)}
                maxLength={30}
                style={{ fontSize: 18, padding: "14px 18px" }}
              />
            </div>

            {/* Interests */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontWeight: 700, fontSize: 15, marginBottom: 8, color: "#e2e8f0" }}>
                What do they love? <span style={{ color: "#f87171" }}>*</span> <span style={{ color: "#64748b", fontWeight: 400, fontSize: 13 }}>(select at least 1)</span>
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    className={`chip ${selectedInterests.includes(interest) ? "selected" : ""}`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {selectedInterests.includes(interest) && <CheckCircle size={12} style={{ marginRight: 4 }} />}
                    {interest}
                  </button>
                ))}
              </div>
              <input
                className="input"
                type="text"
                placeholder="...or type something else they love"
                value={customInterest}
                onChange={(e) => {
                  setCustomInterest(e.target.value);
                  if (e.target.value.trim() && !selectedInterests.includes(e.target.value.trim())) {
                    setSelectedInterests((prev) => [...prev, e.target.value.trim()]);
                    setCustomInterest("");
                  }
                }}
                style={{ marginTop: 12, fontSize: 14 }}
              />
            </div>

            {/* Email (optional) */}
            <div style={{ marginBottom: 36 }}>
              <label style={{ display: "block", fontWeight: 700, fontSize: 15, marginBottom: 8, color: "#e2e8f0" }}>
                Email <span style={{ color: "#64748b", fontWeight: 400 }}>(optional — we'll notify you when it's ready)</span>
              </label>
              <input
                className="input"
                type="email"
                placeholder="parent@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              className="btn-gold"
              onClick={startProcessing}
              disabled={!photo || !kidName.trim() || selectedInterests.length === 0 || isUploading}
              style={{ width: "100%", justifyContent: "center", fontSize: 17, padding: "16px" }}
            >
              {isUploading ? (
                <>
                  <Loader size={20} className="animate-spin-slow" /> Creating your video...
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Create {kidName || "their"} Video — $25
                </>
              )}
            </button>
            <p style={{ textAlign: "center", marginTop: 12, fontSize: 13, color: "#64748b" }}>
              No payment required now · ~20 min delivery
            </p>
          </div>
        )}

        {/* Step 2: Processing */}
        {step === "processing" && (
          <div className="animate-slide-up">
            <div className="card" style={{ padding: 40, textAlign: "center" }}>
              {/* Animated star */}
              <div style={{ width: 80, height: 80, margin: "0 auto 32px", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(124,58,237,0.2)", animation: "glow-pulse 2s ease-in-out infinite" }} />
                <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: "rgba(124,58,237,0.3)", animation: "glow-pulse 2s ease-in-out infinite 0.3s" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" className="animate-spin-slow" style={{ animationDuration: "8s" }}>
                    <path d="M16 4L19 12L27 13L21 19L23 27L16 23L9 27L11 19L5 13L13 12L16 4Z" fill="#fbbf24" stroke="#fef9c3" strokeWidth="1"/>
                  </svg>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ background: "rgba(13,11,30,0.8)", borderRadius: 10, height: 8, marginBottom: 24, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7c3aed, #fbbf24)",
                  borderRadius: 10,
                  transition: "width 0.5s ease",
                }} />
              </div>
              <div style={{ fontSize: 14, color: "#64748b", marginBottom: 32, fontFamily: "'Space Mono', monospace" }}>
                {progress}% complete
              </div>

              {/* Steps */}
              <div style={{ display: "grid", gap: 12, textAlign: "left" }}>
                {PIPELINE_STEPS.slice(0, -1).map((s, i) => {
                  const isDone = i < processingStep;
                  const isActive = i === processingStep;
                  return (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, opacity: isDone || isActive ? 1 : 0.4, transition: "opacity 0.3s" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: isDone ? "rgba(251,191,36,0.2)" : isActive ? "rgba(124,58,237,0.2)" : "rgba(26,23,48,0.8)", border: `1px solid ${isDone ? "rgba(251,191,36,0.3)" : isActive ? "rgba(167,139,250,0.5)" : "rgba(167,139,250,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.3s" }}>
                        {isDone ? (
                          <CheckCircle size={18} color="#fbbf24" />
                        ) : isActive ? (
                          <Loader size={18} color="#a78bfa" className="animate-spin-slow" style={{ animationDuration: "2s" }} />
                        ) : (
                          <s.icon size={18} color="#64748b" />
                        )}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: 14, color: isDone ? "#fbbf24" : isActive ? "#a78bfa" : "#64748b", transition: "color 0.3s" }}>
                        {isActive && processingStep > 0 ? "✨ " : ""}{s.label}
                        {isActive && "..."}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#64748b" }}>
              Your video will be ready in about 20 minutes · We'll email you if you provided an address
            </p>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === "complete" && (
          <div className="animate-scale-in" style={{ textAlign: "center" }}>
            <div style={{ width: 100, height: 100, margin: "0 auto 32px", position: "relative" }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{
                  position: "absolute",
                  width: 8, height: 8,
                  borderRadius: "50%",
                  background: "#fbbf24",
                  top: "50%", left: "50%",
                  animation: `star-burst 1s ease-out ${i * 0.1}s forwards`,
                  opacity: 0,
                }} />
              ))}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={64} color="#34d399" />
              </div>
            </div>

            <h2 className="font-display" style={{ fontSize: 36, marginBottom: 16 }}>
              {kidName}'s Video is Ready! 🎉
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 18, marginBottom: 40, maxWidth: 450, margin: "0 auto 40px" }}>
              Your personalized music video is all set. Watch it now or download to keep forever.
            </p>

            <button className="btn-gold" onClick={goToPreview} style={{ fontSize: 18, padding: "16px 40px", marginBottom: 16 }}>
              <Play size={20} /> Watch {kidName}'s Video
            </button>
            <p style={{ fontSize: 13, color: "#64748b" }}>
              or <button onClick={goToPreview} style={{ background: "none", border: "none", color: "#a78bfa", cursor: "pointer", fontWeight: 600 }}>preview different scenes</button>
            </p>
          </div>
        )}

        {/* Step 4: Preview / Download */}
        {step === "preview" && (
          <div className="animate-slide-up">
            {/* Video player */}
            <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 28, background: "#000", position: "relative" }}>
              <video
                poster=""
                controls
                style={{ width: "100%", display: "block", borderRadius: 20 }}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
              />
            </div>

            {/* Info */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 12, background: "linear-gradient(135deg, #fbbf24, #f59e0b)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                  {kidName[0]?.toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{kidName}'s Star Adventure</div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>~75 seconds · HD · MP4</div>
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {selectedInterests.map((i) => (
                  <span key={i} style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa", padding: "4px 12px", borderRadius: 50, fontSize: 12, fontWeight: 600 }}>{i}</span>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button className="btn-gold" style={{ justifyContent: "center" }}>
                  <Star size={16} /> Download HD
                </button>
                <button className="btn-outline" style={{ justifyContent: "center" }}>
                  Share to X
                </button>
              </div>
            </div>

            {/* Lyrics teaser */}
            <div className="card" style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fbbf24", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 12 }}>Song Preview</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#94a3b8", lineHeight: 1.8 }}>
                <p style={{ marginBottom: 8, color: "#f8fafc" }}>✨ {kidName || "Emma"} is a shooting star...</p>
                <p style={{ marginBottom: 8 }}>Dancing through the galaxy bright,</p>
                <p style={{ marginBottom: 8 }}>With {selectedInterests[0] || "dinosaurs"} and dreams in sight...</p>
                <p>The universe is yours tonight!</p>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: 14, marginBottom: 12 }}>Want to make another video?</p>
              <button className="btn-outline" onClick={() => { setStep("details"); setPhoto(null); setPhotoPreview(null); setKidName(""); setSelectedInterests([]); }}>
                <Sparkles size={16} /> Create another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
