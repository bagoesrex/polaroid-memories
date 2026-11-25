# Polaroid Memories — Modular React Architecture Design

## Intent & Overview
Migrate the single-file interactive prototype `polaroid_memories.html` into a modular React 19 + TypeScript application within the current Vite project, preserving 1:1 visual styling, procedural audio effects, interactive mechanics, and responsive design.

## Approaches Considered
1. **Single-file React component**: Quickest port, but leaves codebase as an unwieldy monolith and fails the modular requirement.
2. **External state management (Zustand/Redux) & CSS migration (Tailwind/CSS modules)**: Adds unnecessary dependencies, rewrites working styles, increases bundle size and complexity.
3. **Modular React + Standard Hooks + Imported Vanilla CSS (Chosen)**:
   - *Why chosen*: Clean single-responsibility components, zero added dependencies, keeps working CSS intact, natural state passing via props, easiest to maintain and extend.

## Goals
- Clean modular structure with single-responsibility components and clear file organization.
- Zero new external dependencies (use existing React, TypeScript, Vite, Web Audio API, and vanilla CSS).
- Fully functional features:
  - Interactive Polaroid camera with tactile recoil, flash, LED status, and film counter.
  - Procedural sound effects via Web Audio API (shutter click, motor whir, paper rustle).
  - Chemical film developing animation ejecting into the desk spread.
  - Interactive prints on desk with random tilt and click-to-flip inspection.
  - 3D card flip modal with custom handwritten notes and sender signoff.
  - Secret letter reward envelope unlocked upon completing all 4 shots.
  - Demo customization modal allowing live edits to recipient, sender, sticky note, and letter body.
  - Audio mute/unmute toggle and transient toast alerts.
- Responsive scaling using the unified `--u` CSS proportional unit.

## Non-Goals & Anti-Goals
- No backend server or persistent database required (state lives in memory with demo customization).
- No heavy state management libraries (Redux, Zustand) or styling libraries (Tailwind, CSS-in-JS); standard React hooks (`useState`, `useRef`, `useCallback`) and imported CSS provide minimal footprint and maximum performance.

## Structure & File Layout
```
src/
├── types.ts                    # Interfaces: Memory, GiftConfig, ModalType
├── data/
│   └── memories.ts             # Default configuration and base64 memory image cards
├── audio/
│   └── soundEffects.ts         # Procedural Web Audio API sound synthesis
├── styles/
│   └── polaroid.css            # Extracted & cleaned CSS (variables, desk, camera, 3D flips, modals)
├── components/
│   ├── Atmosphere.tsx          # Sunbeam, film grain, flash overlay
│   ├── TopBar.tsx              # Header with demo editor trigger and sound toggle
│   ├── HeroHeader.tsx          # Eyebrow count & dynamic recipient title
│   ├── PolaroidCamera.tsx      # Camera body, lens, viewfinder, LED, counter, sticky note, shutter button
│   ├── EjectBay.tsx            # Developing card emerging from slot
│   ├── PrintsGrid.tsx          # Desk polaroid card grid with tilt transforms
│   ├── LetterReward.tsx        # Folded envelope unlocked after all prints are taken
│   ├── PolaroidModal.tsx       # 3D interactive flip photo viewer modal
│   ├── LetterModal.tsx         # Unfolded personal letter sheet modal
│   ├── EditorModal.tsx         # Gift customization form modal
│   ├── BrandFooter.tsx         # GiftKuy branding and footer CTA
│   └── Toast.tsx               # Floating toast message notification
├── App.tsx                     # Main page orchestrator managing state
├── main.tsx                    # Entry point mounting <App />
└── index.html                  # Font imports (Caveat, Inter, JetBrains Mono, Newsreader) and page title
```

## Component State Flow
- `config`: `{ recipient, sender, stickyNote, letterDate, letterBody }` initialized from `DEFAULT_CONFIG`.
- `currentShot`: index of the next photo to shoot (0 to 4).
- `isBusy`: boolean flag while shutter animation and film developing (duration ~2.55s) are taking place.
- `soundEnabled`: boolean flag controlling Web Audio output.
- `activeModal`: `'polaroid' | 'letter' | 'editor' | null`.
- `selectedMemoryIndex`: index for photo inspection in `PolaroidModal`.
- `toastMessage`: string or null with auto-dismiss timer.

## Verification Plan
1. `npm run build` / `bun run build`: verify clean TypeScript compilation without errors.
2. Verify all interactive flows:
   - Shutter click triggers sound, recoil, flash, counter decrement, LED charging state, developing card, and card placement on desk.
   - Print click opens 3D flip card; flipping shows front/back correctly.
   - Letter opens after 4 shots.
   - Editor updates recipient name, sticky note, and letter body reactively.
   - Audio toggle mutes and unmutes procedural sounds.
