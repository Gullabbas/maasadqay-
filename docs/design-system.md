# Maa Sadqay Design System & Token Documentation

This document specifies the visual architecture, typography, color tokens, and 3D design standards for **Maa Sadqay (ماں صدقے)**.

---

## 1. Brand Identity & Color Tokens

The visual foundation is directly derived from the official `logo.png` asset in `/maasadqay`. Non-transparent pixel sampling extracts **#B36648** (Warm Rose-Clay / Terracotta) as the core brand hallmark.

### Primary Color Scale: Rose Terracotta (`#B36648`)
- **Brand 50:** `#FAF3F0` — Warm ambient tint & subtle card backgrounds
- **Brand 100:** `#F3E4DD` — Border highlights & soft hover states
- **Brand 200:** `#E7C9BC` — Muted badge fills & pill borders
- **Brand 300:** `#DBAD9A` — Scrollbar thumb & decorative borders
- **Brand 400:** `#C9886F` — Secondary buttons & active accents
- **Brand 500:** `#B36648` — **Core Brand Logo Color** (Hero CTAs, Price Highlights)
- **Brand 600:** `#9E5336` — Hover state for primary CTAs & active links
- **Brand 700:** `#844128` — Urdu accent headings & strong focus rings
- **Brand 800:** `#6B331F` — Dark surfaces & footer accents
- **Brand 900:** `#462012` — Header announcement bar & deep contrast bars

### Complementary Accents
- **Sage Eucalyptus:** `#698070` (Tint: `#F2F5F3` / Dark: `#38463D`) — Reflects tranquil Pakistani lawn fabrics and spring nature.
- **Warm Honey / Ochre:** `#D4A373` (Tint: `#FBF3E7`) — Festivity, embroidery highlights, star ratings.
- **Clearance Red:** `#DC2626` / `#991B1B` — High-urgency clearance tags.
- **Success Emerald:** `#2E7D32` — Verified buyer badges, WhatsApp link, order confirmation.

### Neutral Surfaces & Typography Ink
- **Surface Warm:** `#FDFBF9` — Clean, warm off-white that eliminates screen glare.
- **Surface Pure:** `#FFFFFF` — Elevated cards and modal surfaces.
- **Ink Primary:** `#261D1A` — Deep espresso warm charcoal (WCAG AAA compliant on white).
- **Ink Secondary:** `#6B5E57` — Readable description text (WCAG AA compliant).
- **Ink Tertiary:** `#9E8F87` — Captions, timestamps, and secondary metadata.

---

## 2. Typography

```css
--font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
--font-display: 'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif;
--font-urdu: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif;
```

- **Headings & Display:** `Outfit` — Playful, geometric, modern premium aesthetics.
- **Body & Tabular Controls:** `Plus Jakarta Sans` — Extremely legible on mobile displays with optimized numbers for Rupee currencies (`Rs. 1,699`).
- **Urdu Highlights:** `Noto Nastaliq Urdu` — Traditional elegance for Urdu greetings and cultural touches.

### Fluid Type Scale
- **Display Hero:** `clamp(2.5rem, 6vw, 4.25rem)`
- **Heading 1:** `clamp(2rem, 4vw, 3rem)`
- **Heading 2:** `clamp(1.5rem, 3vw, 2.25rem)`
- **Heading 3:** `clamp(1.25rem, 2vw, 1.75rem)`
- **Body Regular:** `0.875rem` (14px) / `1rem` (16px)
- **Captions & Metadata:** `0.75rem` (12px) / `0.6875rem` (11px)

---

## 3. Shadows & Elevation

- **Shadow Soft:** `0 4px 20px -2px rgba(179, 102, 72, 0.08)` — Standard product card resting state.
- **Shadow Hover:** `0 12px 32px -4px rgba(179, 102, 72, 0.16)` — Hover elevation with brand hue.
- **Shadow Modal:** `0 24px 64px -12px rgba(38, 29, 26, 0.22)` — Dialogs, drawers, and quick view overlays.
- **Shadow Glow:** `0 0 25px rgba(179, 102, 72, 0.25)` — Floating AI assistant launcher pulse.

---

## 4. 3D & Animation Guardrails

1. **Device Pixel Ratio (DPR):** Clamped strictly between `[1, 1.5]` to avoid mobile GPU overload.
2. **Lazy Canvas Mounting:** R3F Canvas is imported dynamically with `ssr: false` and controlled via `IntersectionObserver`. Rendering halts completely when the hero is off-screen.
3. **Motion Sensitivity:** Respects `prefers-reduced-motion: reduce` by replacing 3D floating meshes with smooth CSS mesh gradients.
4. **Transform & Opacity Only:** All Framer Motion micro-interactions animate only hardware-accelerated composite layers (`transform`, `opacity`).
