# 🎨 Terpene Flashcards - UI/UX Architecture

## Design Philosophy

### **Single Focus Mode**
- Only show what's relevant to the current task
- Minimize cognitive load
- Hide distractions during study

### **Smooth Transitions**
- Fade-in/fade-out between views
- Magic move animations for state changes
- No jarring visual jumps

### **Progressive Disclosure**
- Stats auto-minimize during study (after 3s)
- Click to expand when needed
- Context-aware component display

### **Mobile-First Responsive**
- Beautiful on phone, tablet, desktop
- Touch-friendly targets (48px minimum)
- Readable typography at all sizes

---

## View State Architecture

```
┌─────────────────────────────────────────────┐
│          MODE_SELECT (Home)                 │
│  - Choose study mode                        │
│  - View reference/achievements buttons      │
│  - NO stats displayed (clean start)         │
└─────────────────────────────────────────────┘
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
┌───────────────────┐   ┌───────────────────┐
│   STUDY VIEW      │   │  REFERENCE VIEW   │
│ - Flashcards      │   │  - All terpenes   │
│ - Stats minimized │   │  - High terp list │
│   after 3s        │   │  - Back button    │
│ - Back button     │   └───────────────────┘
└───────────────────┘            ↓
        ↓              ┌───────────────────┐
        ↓              │ ACHIEVEMENTS VIEW │
        ↓              │  - Progress       │
        ↓              │  - Unlocked       │
        ↓              │  - Back button    │
        ↓              └───────────────────┘
        ↓
    [goBack]
```

---

## Component Hierarchy

```
App (State Container)
├── Header (Always visible)
├── GameStatsPanel (Conditional - hidden on MODE_SELECT)
│   ├── LevelProgress
│   ├── SessionStats
│   └── StreakDisplay
└── ViewContainer (Smooth transitions)
    ├── ModeSelector (GRID layout, not list)
    ├── FlashcardView (Hero element)
    ├── ReferenceView (Full screen takeover)
    └── AchievementsView (Gallery layout)

Floating Notifications (Portal-style)
├── AchievementPopup
└── XPGainNotification
```

---

## Key UX Improvements

### 1. **Stats Panel - Contextual & Minimizable**
```jsx
- Default: Expanded with all stats visible
- After 3s in STUDY mode: Auto-minimizes to compact bar
- Click to toggle expand/minimize
- Hidden completely on MODE_SELECT view
```

### 2. **Mode Selector - Card Grid (Not Buttons)**
```jsx
- Visual cards with icons
- Hover: Lift + shadow
- Active: Gradient fill
- Mobile: Stack vertically
```

### 3. **Flashcard - Hero Element**
```jsx
- Large, centered, breathing room
- 3D flip animation
- Smooth hover lift
- Clear flip indicator
```

### 4. **View Transitions**
```jsx
- Fade out current view
- Fade in new view
- translateY for depth
- 0.4s cubic-bezier timing
```

### 5. **Responsive Breakpoints**
```css
Desktop:  > 768px  (Grid layouts, side-by-side)
Tablet:   768px    (Adjusted grids)
Mobile:   < 480px  (Single column, stacked)
```

---

## Animation System

### Micro-interactions
- **Button hover**: translateY(-2px) + shadow
- **Card hover**: translateY(-4px) + glow
- **Active state**: Scale(0.98)

### Transitions
- **Fast**: 0.2s (hover states)
- **Base**: 0.3s (toggles, simple state changes)
- **Smooth**: 0.4s cubic-bezier (view changes, complex animations)

### Special Effects
- **XP Gain**: Float up + scale + fade
- **Achievement**: Slide in from right + pulse
- **Streak Fire**: Continuous glow animation
- **Level Up**: Scale pulse + shimmer

---

## Color System (CSS Variables)

```css
--primary-gradient: #667eea → #764ba2
--success-gradient: #56ab2f → #a8e063
--gold-gradient:    #FFD700 → #FFA500
--fire-gradient:    #FF6B6B → #FF8E53

--shadow-sm: 0 2px 8px rgba(0,0,0,0.1)
--shadow-md: 0 4px 16px rgba(0,0,0,0.15)
--shadow-lg: 0 8px 32px rgba(0,0,0,0.2)
```

---

## Performance Considerations

### CSS
- Use `transform` and `opacity` for animations (GPU-accelerated)
- `will-change` for elements that animate frequently
- `backdrop-filter` for glassmorphism (with fallback)

### React
- Conditional rendering (not display:none)
- useCallback for event handlers
- useMemo for expensive calculations
- Lazy load views if needed

---

## Accessibility

- **Keyboard Navigation**: All buttons/cards focusable
- **ARIA Labels**: Screen reader friendly
- **Focus States**: Visible outlines
- **Color Contrast**: WCAG AA compliant
- **Touch Targets**: Minimum 48x48px
- **Reduced Motion**: Respect `prefers-reduced-motion`

---

## File Structure

```
src/
├── App-new.css                 # New architected styles
├── App-refactored.js           # New component with view state
├── components/
│   ├── refactored/             # New architectural components
│   │   ├── GameStatsPanel.js   # Collapsible stats
│   │   ├── ModeSelectorNew.js  # Card grid
│   │   ├── FlashcardView.js    # Hero flashcard
│   │   ├── ReferenceView.js    # Full takeover
│   │   └── AchievementsView.js # Gallery
│   └── [existing components]
├── utils/
│   ├── gameLogic.js
│   └── storage.js
└── data/
    ├── terpenes.json
    └── highTerpProducts.json
```

---

## Migration Plan

1. ✅ Create new CSS architecture
2. ✅ Create refactored App.js with view states
3. ⏳ Build new component: GameStatsPanel
4. ⏳ Build new component: ModeSelectorNew
5. ⏳ Build new component: FlashcardView
6. ⏳ Build new component: ReferenceView
7. ⏳ Build new component: AchievementsView
8. ⏳ Test all views and transitions
9. ⏳ Replace old App.js with new one
10. ⏳ Delete old CSS and components

---

## Design Inspiration

- **Duolingo**: Gamification, progress tracking
- **Anki**: Flashcard simplicity
- **Stripe Dashboard**: Clean stats panels
- **iOS Design**: Smooth transitions, clear hierarchy
- **Material Design**: Elevation, responsive grids

---

**Next Steps**: Complete the refactored components and test the new architecture!
