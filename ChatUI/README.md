# AuraChat — Chat UI Assignment

## Description
AuraChat is a modern, responsive AI chat interface built with HTML, CSS, JavaScript, jQuery, and Bootstrap 5.
It mimics the design style of Claude / ChatGPT with a clean dark/light theme, smooth animations,
typing indicators, suggestion cards, sidebar history, and full mobile responsiveness.

## How to Run
1. **Unzip** the submission folder.
2. Open `index.html` in any modern browser (Chrome, Firefox, Safari, Edge).
3. No server required — it's fully static.

## File Structure
```
YourName_ChatUI/
├── index.html          ← Main HTML file
├── css/
│   └── style.css       ← All custom styles (CSS variables, animations, responsive)
├── js/
│   └── chat.js         ← All JavaScript/jQuery functionality
├── screenshots/
│   ├── desktop.png
│   ├── tablet.png
│   └── mobile.png
└── README.md           ← This file
```

## Features Implemented

### Task 1 — HTML Structure (25 pts)
- Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<aside>`)
- Bootstrap 5, Font Awesome, Google Fonts linked
- Welcome screen with 4 suggestion cards in grid layout
- Input area with textarea, attach button (paperclip), send button

### Task 2 — CSS Styling (35 pts)
- CSS custom properties (colors, spacing, shadows, transitions)
- User messages: right-aligned, distinct background
- AI messages: left-aligned, different background
- Circular avatars with gradient backgrounds
- Focus state with accent color glow on input
- Keyframe animations: `fadeInUp`, `slideInUp`, `bounce`, `pulseGlow`
- Typing indicator with 3 bouncing dots
- Hover effects on cards and buttons

### Task 3 — JavaScript & jQuery (25 pts)
- `addMessage(text, sender)` — creates & appends message HTML with timestamp
- `scrollToBottom()` — auto-scrolls chat
- Send button enabled/disabled based on input
- Enter → send; Shift+Enter → new line
- Input cleared after send; auto-resize textarea
- Array of 10 mock AI responses
- `sendMessage()` flow: shows typing indicator → 1–2s delay → hides indicator → shows response
- Welcome screen hidden after first message

### Task 4 — Sidebar & Mobile (15 pts)
- Sidebar: 260px fixed, New Chat button, scrollable history, user profile
- Hamburger menu (hidden on desktop, shown on mobile)
- Slide-in sidebar with overlay on mobile
- Responsive at all sizes (320px → 1920px)
- Suggestion cards stack vertically on mobile

### Bonus Features
- ✅ Dark / Light mode toggle (smooth CSS transition) — 4 pts
- ✅ Custom scrollbar styling — 2 pts

## Technologies Used
- HTML5 (semantic markup)
- CSS3 (Flexbox, Grid, Custom Properties, Keyframe Animations)
- JavaScript (ES6)
- jQuery 3.7.1
- Bootstrap 5.3.3
- Font Awesome 6.5.1
- Google Fonts: Syne + DM Sans

## Browser Tested
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
