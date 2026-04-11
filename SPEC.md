# TinyStarAI — Product Specification

## 1. Concept & Vision

**TinyStarAI** transforms a child's photo into a personalized music video — starring them as the hero of their own animated adventure. Upload a photo, enter their name and interests, and receive a 60-90 second music video in ~20 minutes. It's a premium digital gift: magical, personal, and shareable.

The vibe is **cosmic wonder meets Saturday morning cartoon** — sparkles, stardust, bright colors, and pure joy. Parents feel the price is justified because itcelebrates their kid in a way no physical gift can.

---

## 2. Design Language

### Aesthetic Direction
Whimsical cosmic fantasy — think Encanto meets a planetarium. Deep space purples and blues as the canvas, exploding with warm gold stardust and shooting star accents. Everything feels magical but producible.

### Color Palette
```
--bg-deep:       #0d0b1e   (deep space)
--bg-card:       #1a1730   (card surface)
--primary:       #7c3aed   (cosmic purple)
--primary-light: #a78bfa   (light purple)
--accent:        #fbbf24   (star gold)
--accent-warm:   #f59e0b   (deeper gold)
--sparkle:       #fef9c3   (stardust yellow)
--text-primary:  #f8fafc
--text-muted:    #94a3b8
--success:       #34d399
--error:         #f87171
--gradient-hero: linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #7c3aed 100%)
```

### Typography
- **Display:** `Fredoka One` (Google Fonts) — rounded, playful, perfect for "TinyStarAI" logo
- **Headings:** `Nunito` 700-800 weight — friendly and bold
- **Body:** `Nunito` 400-600 weight
- **Mono/details:** `Space Mono` for technical info (file sizes, timecodes)

### Spatial System
- Base unit: 4px
- Section padding: 80-120px vertical on desktop, 48px on mobile
- Card border-radius: 20px
- Button border-radius: 50px (pill)
- Max content width: 720px (form), 1200px (landing)

### Motion Philosophy
- **Entrance:** Staggered fade-up on page load (100ms delay between elements)
- **Stars:** Subtle floating/pulsing animation on star icons (CSS keyframes, 3-6s duration)
- **Sparkles:** Random positioned sparkle particles on hero section (CSS animation)
- **Interactions:** Buttons scale 1.05 on hover with gold glow, 200ms ease-out
- **Progress:** Animated star filling up as pipeline progresses
- **Success:** Burst animation (scale + sparkle) when video is ready

### Visual Assets
- **Icons:** Lucide React (clean, consistent)
- **Decorative:** Inline SVG stars, sparkles, constellations scattered on backgrounds
- **Photos:** User-uploaded only (no stock)
- **Logo:** "✨ TinyStarAI" with inline star SVG

---

## 3. Layout & Structure

### Pages

#### `/` — Landing Page (Marketing)
```
[Navbar] logo + "Make a Video" CTA
[Hero] headline + subhead + CTA button + starfield BG
[How It Works] 3-step visual (Upload → Magic Happens → Download)
[Examples] 2-3 sample video thumbnails with play buttons
[Pricing] $25 per video, "Order Now" CTA
[FAQ] 4-5 common questions
[Footer] links, social, copyright
```

#### `/create` — Creation Flow (App)
```
[Progress Bar] showing pipeline steps
[Step 1] Upload photo (drag/drop, preview, crop hint)
[Step 2] Kid's name + interests (text inputs, suggestions chips)
[Step 3] Processing status (animated star, step-by-step updates)
[Step 4] Preview + download (video player, share buttons)
```

#### `/status/[jobId]` — Public Status Page
```
[Progress indicator] for shared links
[Notification] "We'll email you when it's ready" (if email provided)
```

### Responsive Strategy
- Mobile-first, single column on <768px
- Hero text scales: 48px → 32px → 24px
- Form cards go full-width on mobile with 16px horizontal padding
- CTA button is full-width on mobile

---

## 4. Features & Interactions

### Core Pipeline (backend)
1. **Photo Upload** → validate image (JPEG/PNG/WEBP, ≤10MB) → compress to ≤800px wide
2. **Image Cartoonization** → MiniMax image gen API → cartoon version of kid
3. **Lyrics Generation** → AI writes 16-24 bar verse/chorus with kid's name + interests as theme
4. **Music Generation** → MiniMax Music2.6 API → full song MP3 (up to 5 min)
5. **Scene Planning** → Break lyrics into 6-8 scenes (verse1, chorus1, verse2, chorus2, bridge, outro)
6. **Video Clip Generation** → MiniMax Hailuo per scene → 6 clips (6s each)
7. **Video Assembly** → FFmpeg stitch + audio overlay → final MP4
8. **Delivery** → Save to VPS storage, generate download link

### Frontend Features
- **Drag & Drop Upload** with preview and error states
- **Interest Chips** — pre-filled suggestions: "Dinosaurs", "Space", "Unicorns", "Sports", "Music", "Art", "Animals", "Superheroes"
- **Real-time Progress** — polling /api/status/[jobId] every 5 seconds during processing
- **Email Notification** — optional email field, send link when done
- **Video Player** — native HTML5 player with custom controls
- **Share to Social** — X/TikTok/Instagram export buttons
- **Download Button** — direct MP4 download

### Interaction Details
- Upload: drag-over state highlights zone in purple; invalid file shakes and shows error
- Submit: button shows spinner + "Creating magic..."; disabled during processing
- Progress: each step lights up with star icon as it completes
- Complete: confetti/star burst animation, "Your video is ready!" modal
- Error: red error banner with retry button; support email link

### Edge Cases
- File too large: "Image must be under 10MB" inline error
- Invalid format: "Please upload a JPEG, PNG, or WebP photo"
- Processing fails at any step: retry button + email notification option
- Job takes >30 min: "Taking longer than expected" message with ETA
- User closes browser during processing: job continues; status page still accessible

---

## 5. Component Inventory

### `<StarField />` — Hero Background
- Animated CSS star particles (15-20 stars, random positions, pulsing opacity)
- Subtle parallax on mouse move (optional)

### `<Logo />` — TinyStarAI Brand Mark
- Inline SVG star icon + "TinyStarAI" in Fredoka One
- Sparkle animation on hover

### `<UploadZone />`
- States: idle (dashed border), drag-over (solid purple glow), uploading (progress ring), done (thumbnail preview), error (red border + message)
- Click to open file picker

### `<InterestChips />`
- Pill buttons for suggestions; selected state = filled gold
- Custom input allowed

### `<ProgressPipeline />`
- Horizontal stepper (desktop) / vertical (mobile)
- Steps: Upload → Cartoonize → Write Song → Generate Music → Create Scenes → Stitch Video → Done
- Each step: icon + label; pending (gray), active (pulsing purple), done (gold star)

### `<VideoPlayer />`
- Full-width, 16:9 aspect ratio
- Custom play/pause, scrubber, mute, fullscreen
- Poster frame from first clip

### `<DownloadCard />`
- Video thumbnail + title ("[Kid's Name]'s Star Video")
- File size + duration
- Download + Share buttons

### `<FAQAccordion />`
- Expand/collapse with chevron rotation
- Smooth height animation

---

## 6. Technical Approach

### Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4 (inline in layout.tsx via CSS vars)
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Fredoka One, Nunito, Space Mono)
- **State:** React hooks (useState/useReducer for form)
- **Backend:** Next.js API Routes + VPS background worker

### Architecture
```
[Vercel - Next.js]
/                  → Landing page
/create            → Multi-step form
/api/upload        → Receive photo, return jobId
/api/status/[jobId] → Poll job status
/status/[jobId]    → Public status page

[VPS :8081 - Node Worker]
/process/[jobId]   → Runs pipeline (MiniMax → FFmpeg)
/download/[jobId]  → Serve final video
```

### API Design
```
POST /api/upload
Body: FormData { photo: File, kidName: string, interests: string[], email?: string }
Response: { jobId: string }

GET /api/status/[jobId]
Response: {
  status: 'queued' | 'processing' | 'complete' | 'failed',
  step: 'upload' | 'cartoonize' | 'write_lyrics' | 'generate_music' | 'create_scenes' | 'stitch' | 'done',
  progress: 0-100,
  videoUrl?: string,
  error?: string
}

GET /download/[jobId].mp4
Response: Video file stream
```

### Data Model
```
Job {
  id: string (uuid)
  status: 'queued' | 'processing' | 'complete' | 'failed'
  step: string
  progress: number (0-100)
  photoUrl: string
  cartoonUrl?: string
  musicUrl?: string
  lyrics?: string
  clips: string[] (video URLs)
  finalVideoUrl?: string
  kidName: string
  interests: string[]
  email?: string
  createdAt: Date
  updatedAt: Date
}
```

### Storage (VPS)
- Jobs stored as JSON files in `/data/tinystarai/jobs/[jobId].json`
- Media files in `/data/tinystarai/media/[jobId]/`
- Final videos in `/data/tinystarai/videos/[jobId].mp4`

### MiniMax API Integration
```
Base URL: https://api.minimax.chat
Auth: Authorization: Bearer $MINIMAX_API_KEY
Group ID: from environment

Image Gen: POST /v1/image_generation
Music Gen: POST /v1/music_generation
Video Gen: POST /v1/video_generation (Hailuo)
Speech Gen: POST /v1/speech_generation (Speech 2.6)
```

### FFmpeg Stitch Script
- Concatenate clips: `ffmpeg -f concat -safe 0 -i clips.txt -c:v libx264 -preset fast -crf 23 output.mp4`
- Overlay audio: `ffmpeg -i video.mp4 -i song.mp3 -c:v copy -c:a aac -shortest final.mp4`
- Add intro star animation overlay

### Deployment
- Frontend: Vercel (next build)
- Backend worker: VPS PM2 on port 8081
- Domain: `tinystarai.com` (or `tinystar.video`) → buy or use subdomain

### Environment Variables
```
MINIMAX_API_KEY=
MINIMAX_GROUP_ID=
WORKER_URL=https://worker.tinystarai.com  (VPS URL)
```

---

## 7. MVP Scope (This Build)

For this first build, build a working end-to-end prototype:

1. **Landing page** with full marketing copy and CTA
2. **Upload form** (photo + name + interests) → creates job
3. **Simulated pipeline** (no real MiniMax calls yet — use mock data with realistic delays)
4. **Progress UI** with animated steps
5. **Video player** with sample video
6. **Download button** (works with sample)

The MiniMax integration is stubbed with realistic delays for now so we can validate the full UX flow. Real API integration is Phase 2.

Design MUST be a 10/10 — the most beautiful music video generator landing page you've ever seen. Sparkles everywhere, perfect typography, buttery smooth animations.
