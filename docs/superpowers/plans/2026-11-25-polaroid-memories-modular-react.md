# Polaroid Memories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the single-file prototype `polaroid_memories.html` into a clean, modular React 19 + TypeScript application with identical visuals, interactions, and Web Audio effects.

**Architecture:** Decompose HTML/CSS/JS into typed data, procedural audio utilities, focused React components, and a single centralized App state container with vanilla CSS import.

**Tech Stack:** React 19, TypeScript, Vite, Web Audio API, Vanilla CSS.

**Spec:** `docs/superpowers/specs/2026-11-25-polaroid-memories-modular-react-design.md`

## Global Constraints
- Zero added npm dependencies.
- Proportional CSS `--u` units and responsive landscape/portrait media queries preserved intact.
- Procedural Web Audio API sound effects work without external audio files.
- Modals handle keyboard accessibility (ESC to close, Enter/Space to flip cards).
- TypeScript compiles cleanly with `npm run build`.

## Review Focus
1. User clicks shutter rapidly while film is currently ejecting/developing -> Action must be ignored until cycle finishes (`isBusy` guard).
2. User clicks on audio toggle -> Audio state reflects muted/unmuted and stops triggering sounds when muted.
3. User opens Polaroid flip modal -> Card displays correct image, caption, back note, and flip animation operates in 3D.
4. User edits demo text in EditorModal -> New recipient name, sender, sticky note, and letter body immediately update throughout the UI.
5. All 4 photos ejected -> Film counter displays `00`, LED turns red (`empty`), and letter reward envelope is revealed.

---

### Task 1: HTML Setup & TypeScript Types

**Files:**
- Modify: `index.html`
- Create: `src/types.ts`

**Interfaces:**
- Produces: `Memory`, `GiftConfig`, `ActiveModal` types

- [ ] **Step 1: Update `index.html` with Google Fonts and title**
  - Add preconnects and Google Fonts link (`Caveat`, `Inter`, `JetBrains Mono`, `Newsreader`).
  - Update page `<title>` to `GiftKuy.id — Polaroid Memories`.

- [ ] **Step 2: Create `src/types.ts`**
  ```typescript
  export interface Memory {
    id: number;
    image: string;
    caption: string;
    date: string;
    backNote: string;
    tilt: number;
  }

  export interface GiftConfig {
    recipient: string;
    sender: string;
    stickyNote: string;
    letterDate: string;
    letterBody: string;
  }

  export type ActiveModal = 'polaroid' | 'letter' | 'editor' | null;
  ```

- [ ] **Step 3: Verify TypeScript passes**
  Run: `npm run build`

---

### Task 2: Data Extraction

**Files:**
- Create: `src/data/memories.ts`

**Interfaces:**
- Consumes: `Memory`, `GiftConfig` from `src/types.ts`
- Produces: `DEFAULT_CONFIG: GiftConfig`, `MEMORIES: Memory[]`

- [ ] **Step 1: Extract `DEFAULT_CONFIG` and `MEMORIES` into `src/data/memories.ts`**
  - Copy default recipient "Nadya", sender "Raka", sticky note, letter date, and letter body from `polaroid_memories.html`.
  - Copy the 4 memory records with their exact base64 image strings, captions, dates, backNotes, and tilt degrees.

- [ ] **Step 2: Verify export types and compilation**
  Run: `npm run build`

---

### Task 3: Procedural Web Audio Synthesis

**Files:**
- Create: `src/audio/soundEffects.ts`

**Interfaces:**
- Produces: `playShutterAndMotorSfx(soundEnabled: boolean): void`, `playPaperFlipSfx(soundEnabled: boolean): void`

- [ ] **Step 1: Implement audio context singleton and sound synthesizers in `src/audio/soundEffects.ts`**
  - Synthesize shutter click (bandpass filtered noise burst at 1800Hz) and motor whir (sawtooth oscillator ramping between 112Hz, 128Hz, and 98Hz with lowpass filter at 420Hz).
  - Synthesize paper rustle (highpass filtered noise at 1400Hz).
  - Respect `soundEnabled` flag; safely resume suspended AudioContext on user interaction.

- [ ] **Step 2: Verify build**
  Run: `npm run build`

---

### Task 4: Modular CSS Extraction

**Files:**
- Create: `src/styles/polaroid.css`
- Modify: `src/index.css` (or remove boilerplate from `src/App.css`)

**Interfaces:**
- Produces: Styling classes for stage, sunbeam, grain, camera, eject bay, desk, letter, modals, 3D flip card, and buttons.

- [ ] **Step 1: Copy and clean CSS from `polaroid_memories.html` into `src/styles/polaroid.css`**
  - Include `:root` variables, portrait media queries, stage backdrop, sunbeam, grain, flash overlays, camera body, lens, viewfinder, eject bay, 3D card flips, letter sheets, editor form, and buttons.
  - Clear out default Vite starter styles from `src/App.css` and `src/index.css`.

- [ ] **Step 2: Verify build**
  Run: `npm run build`

---

### Task 5: Static & Supportive Components

**Files:**
- Create: `src/components/Atmosphere.tsx`
- Create: `src/components/TopBar.tsx`
- Create: `src/components/HeroHeader.tsx`
- Create: `src/components/BrandFooter.tsx`
- Create: `src/components/Toast.tsx`

**Interfaces:**
- `Atmosphere`: `{ flashState: 'idle' | 'firing' | 'fading' }`
- `TopBar`: `{ soundEnabled: boolean, onToggleSound: () => void, onOpenEditor: () => void }`
- `HeroHeader`: `{ recipient: string }`
- `BrandFooter`: `{ onOpenEditor: () => void }`
- `Toast`: `{ message: string | null }`

- [ ] **Step 1: Implement `Atmosphere.tsx`**
  - Renders sunbeam, grain, and flash overlay with dynamic classes (`firing`, `fading`).

- [ ] **Step 2: Implement `TopBar.tsx`**
  - Renders "Edit Demo" button and "Suara Aktif / Suara Mati" toggle pill.

- [ ] **Step 3: Implement `HeroHeader.tsx`**
  - Renders eyebrow text and dynamic heading `untuk {recipient}`.

- [ ] **Step 4: Implement `BrandFooter.tsx`**
  - Renders footer tagline, brand headline, and demo customizer CTA button.

- [ ] **Step 5: Implement `Toast.tsx`**
  - Renders toast with `.show` class when `message` is non-null.

- [ ] **Step 6: Verify build**
  Run: `npm run build`

---

### Task 6: Camera & Ejection Components

**Files:**
- Create: `src/components/PolaroidCamera.tsx`
- Create: `src/components/EjectBay.tsx`

**Interfaces:**
- `PolaroidCamera`: `{ stickyNote: string, remainingCount: number, isBusy: boolean, onShutter: () => void, isRecoil: boolean, flashGlow: boolean }`
- `EjectBay`: `{ isEjecting: boolean, isDeveloped: boolean, currentMemory: Memory | null, onClick: () => void }`

- [ ] **Step 1: Implement `EjectBay.tsx`**
  - Renders `.eject-bay` with `.ejecting` class, developed image frame, and caption.
  - Clicking on the emerging card opens preview modal if already developed.

- [ ] **Step 2: Implement `PolaroidCamera.tsx`**
  - Renders camera body with sticky note, rainbow stripe, viewfinder, flash unit, LED indicator (`charging` / `empty`), film counter (`04` to `00`), lens, and shutter button with pulse ring.
  - Embeds `EjectBay` in slot housing.
  - Displays dynamic status hint text below the camera.

- [ ] **Step 3: Verify build**
  Run: `npm run build`

---

### Task 7: Desk Prints & Letter Reward

**Files:**
- Create: `src/components/PrintsGrid.tsx`
- Create: `src/components/LetterReward.tsx`

**Interfaces:**
- `PrintsGrid`: `{ prints: Memory[], onSelectPrint: (index: number) => void }`
- `LetterReward`: `{ visible: boolean, recipient: string, onOpenLetter: () => void }`

- [ ] **Step 1: Implement `PrintsGrid.tsx`**
  - Renders grid of ejected prints with rotation `tilt` style, caption, flip badge, and click/keyboard listeners.

- [ ] **Step 2: Implement `LetterReward.tsx`**
  - Renders folded envelope revealed when all 4 shots are completed (`visible: true`), showing dynamic `untuk {recipient}` handwriting label.

- [ ] **Step 3: Verify build**
  Run: `npm run build`

---

### Task 8: Interactive Modals

**Files:**
- Create: `src/components/PolaroidModal.tsx`
- Create: `src/components/LetterModal.tsx`
- Create: `src/components/EditorModal.tsx`

**Interfaces:**
- `PolaroidModal`: `{ memory: Memory | null, index: number, sender: string, isOpen: boolean, onClose: () => void, onPlayFlipSound: () => void }`
- `LetterModal`: `{ isOpen: boolean, config: GiftConfig, onClose: () => void }`
- `EditorModal`: `{ isOpen: boolean, config: GiftConfig, onSave: (newConfig: GiftConfig) => void, onClose: () => void }`

- [ ] **Step 1: Implement `PolaroidModal.tsx`**
  - 3D flip card with front photo/caption/date and back index/note/signature.
  - Interactive flip triggered by clicking card or "Balik Foto" button, playing flip SFX.
  - Backdrop click and "Taruh Kembali" button close the modal.

- [ ] **Step 2: Implement `LetterModal.tsx`**
  - Renders unfolded stationery letter sheet with date, recipient salutation, formatted letter body, and sender signoff.
  - "Lipat Kembali" button and backdrop click close modal.

- [ ] **Step 3: Implement `EditorModal.tsx`**
  - Form with inputs for recipient, sender, sticky note, and letter body.
  - Form submission updates state and triggers toast notification.

- [ ] **Step 4: Verify build**
  Run: `npm run build`

---

### Task 9: App Integration & Orchestration

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Coordinates all state:
  - `config: GiftConfig`
  - `currentShot: number`
  - `isBusy: boolean`
  - `soundEnabled: boolean`
  - `activeModal: ActiveModal`
  - `selectedPrintIndex: number | null`
  - `flashState: 'idle' | 'firing' | 'fading'`
  - `cameraRecoil: boolean`
  - `flashGlow: boolean`
  - `isDeveloped: boolean`
  - `toast: string | null`
  - Global `keydown` handler for Escape key.

- [ ] **Step 1: Implement `App.tsx`**
  - Wire shutter timing sequence:
    1. Check `isBusy` guard and remaining shot count.
    2. Set `isBusy = true`, trigger shutter/motor audio, camera recoil, flash glow, flash firing.
    3. At 90ms: clear recoil, glow, and set flash fading.
    4. At 420ms: set `isDeveloped = true`.
    5. At 2550ms: increment `currentShot`, place memory card into printed memories list, reset eject bay, clear `isBusy`.
  - Wire roll reset (`reloadRoll`) to allow replaying from shot 0.
  - Wire modal controls and toast auto-dismissal.

- [ ] **Step 2: Run Vite production build**
  Run: `npm run build`
  Expected: Clean build with zero TypeScript or packaging errors.

---

### Task 10: Verification & Quality Assurance

- [ ] **Step 1: Check build artifacts and run preview/dev server verification**
  Run: `npm run build`
- [ ] **Step 2: Smoke test interactive features**
  - Verify camera recoil, flash, developing photo, and count decrement.
  - Verify photo flip modal (3D rotation and back note).
  - Verify letter unlocks on 4th photo.
  - Verify editor customization updates UI.
  - Verify sound toggle.
