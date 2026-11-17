# 👑 Happy Princess Day Surprise Website ❤️
### Dedicated Especially to Dhanshree

A complete, beautiful, romantic, interactive surprise website designed for **Princess Day (November 18)**. Recreating the 7 original pages from the Princess Day card deck with rich interactive web components, illustrations, ambient animations, continuous background music, a real scannable QR code, and a heartfelt Page 8 grand finale.

---

## 🌟 The 8 Interactive Pages

1. **Page 1: IT'S PRINCESS DAY**
   - Enchanting purple and deep violet night garden.
   - Glowing crescent moon, stars, swinging fairytale lanterns, and drifting fireflies.
   - **Real Scannable QR Code** (auto-adapts to your live website URL).
   - Shimmering **ENTER THE ROYAL GARDEN** button that starts the background music and unlocks the surprise journey.

2. **Page 2: HAPPY PRINCESS DAY**
   - Pastel pink aesthetic with delicate floral accents.
   - High-fidelity **Hello Kitty Princess** illustration with a sparkling golden tiara, pink gown, and pearls.
   - "Happy Princess Day" and "To My Sweetheart 💕" romantic greeting card.

3. **Page 3: GIFTS FOR MY PRINCESS**
   - Elegant greeting card layout with ribbon-wrapped gift boxes.
   - 4 Interactive Unwrapping Gift Boxes:
     - 🍫 **Sweet Delights:** Lifetime supply of chocolates & cozy moments.
     - 🌸 **Infinite Pampering:** Unlimited care, listening, and gentle devotion.
     - 🌟 **Warmest Safe Haven:** A constant reassuring hand to hold.
     - 💖 **Pure Devotion:** Undivided loyalty and wholehearted love.

4. **Page 4: THE MISSING CROWN**
   - Royal lavender & gold shimmer atmosphere.
   - Ornate golden princess tiara with central heart ruby and sapphires.
   - Interactive **"Place The Crown Where It Belongs ✨"** button: watch the crown glide smoothly onto the princess throne with a burst of golden sparkles, revealing the heartwarming truth that her kindness and smile are her true crown.

5. **Page 5: JUST FOR YOU (Royal Note)**
   - Vintage royal parchment scroll with gold filigree and cute kitten scribe.
   - Interactive wax seal stamp that unfolds the official love letter.
   - Deeply touching personal letter from Prince Devanshu to Dhanshree.

6. **Page 6: ROYAL SURPRISES**
   - Cute kitten holding a blooming red rose flower.
   - Header: *From: Your Prince 🤴 | To: Sweetheart Dhanshree 👸 | Date: November 18*.
   - 4 Claimable Royal Coupons (100 Warm Hugs, Dream Dinner Date, Sweet Treats Delivery, Princess Rules The Day).
   - Tapping "Claim Coupon" triggers an official red **Approved ✓** stamp animation and festive confetti!

7. **Page 7: MY PRINCESS FOREVER & ALWAYS**
   - Grand royal ballroom under starlight with golden tiaras and romantic vows.
   - "Every love story is beautiful, but ours is my favorite fairy tale."
   - Glowing CTA button unlocking the secret finale.

8. **Page 8: SPECIAL EXTRA PAGE – GRAND FINALE**
   - Heading: **I LOVE YOU DHANSHREE ❤️**
   - Message: *“You are my favourite person, today, tomorrow and forever. You make my world more beautiful. ❤️”*
   - Large 3D pulsating ruby jewel heart.
   - Floating rose petals, stardust canvas, and celebration confetti.
   - Interactive **Send Extra Love 💕** tap counter with heart particle bursts.
   - **REPLAY SURPRISE ↺** button that smoothly loops back to Page 1 without interrupting the soundtrack.

---

## 🎵 How to Add the Background Song

**Song Name:** *Dil Kaa Jo Haal Hai*  
**Singer:** *Abhijeet Bhattacharya*

1. Acquire your legally usable MP3 file of the song.
2. Rename the file exactly to:
   ```
   dil-kaa-jo-haal-hai.mp3
   ```
3. Copy or move this file into the folder:
   ```
   assets/music/
   ```
   (Full path: `assets/music/dil-kaa-jo-haal-hai.mp3`)
4. That's it! When anyone taps **ENTER** on Page 1, the song starts playing and continues seamlessly as they navigate between Page 1 and Page 8.
   *(Note: If the file is not yet placed, an enchanting acoustic music-box synthesizer automatically plays so the site is never silent!)*

---

## 🚀 How to Run the Website Locally

You have three easy ways to run the website:

### Option 1: Double-Click
Simply double-click `start-server.bat` in this folder, and it will automatically open your default browser to `http://localhost:3000`.

### Option 2: Direct File Open
Double-click `index.html` in Windows Explorer. It opens instantly in Chrome, Edge, or Firefox.

### Option 3: Terminal
In PowerShell or Command Prompt, run:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 How to Publish Online for Free (Under 60 Seconds)

To share this surprise with Dhanshree on her phone via a link or QR code:

### Method A: Netlify Drop (Easiest & Fastest — No Coding Needed)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop this entire `prin` folder onto the webpage.
3. Netlify will publish it in 5 seconds and give you a live HTTPS link (e.g., `https://dhanshree-princess-day.netlify.app`).

### Method B: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside this directory and press Enter to deploy.

### Method C: GitHub Pages
1. Push this folder to a GitHub repository.
2. In Repository Settings > **Pages**, select branch `main` and save.

---

## 📱 How to Generate the Final Working QR Code

The QR Code on Page 1 is a **real, scannable QR Code** generated using pure client-side canvas:

1. **Automatic Detection:** Once your website is published on Netlify, Vercel, or GitHub Pages, the website automatically detects its live URL and creates a matching scannable QR code!
2. **Instant Configuration:** On Page 1, click **"Configure / Test Website URL"** below the QR code card. Type your published link (e.g., `https://your-site.netlify.app`) and click **Update QR Code**. It instantly regenerates the real QR code on screen!
3. **Scan Test:** Open the camera app on any Android or iPhone, point it at the QR code on Page 1, and it will immediately open your surprise website!

---

## 📁 File Structure

```
prin/
├── index.html                   # Main interactive website with all 8 pages
├── package.json                 # Project configuration
├── start-server.bat             # One-click launcher for Windows
├── README.md                    # Complete guide
├── css/
│   ├── style.css                # Base theme, typography, audio player & global styles
│   ├── animations.css           # Keyframes (lantern sway, heartbeat, slide transitions)
│   └── pages.css                # Custom visual styling for each of the 8 individual pages
├── js/
│   ├── config.js                # Easy customization of texts, names, and links
│   ├── qrcode.min.js            # Standalone client-side scannable QR code generator
│   ├── particles.js             # Canvas engine: falling rose petals, stardust & heart bursts
│   ├── audio-player.js          # Continuous audio player with fallback melody engine
│   └── app.js                   # Navigation router, swipe gestures & interactive card logic
└── assets/
    ├── music/
    │   └── README.txt           # Folder for dil-kaa-jo-haal-hai.mp3
    ├── images/
    │   ├── hello-kitty-princess.svg
    │   ├── royal-crown.svg
    │   ├── cute-cat-flower.svg
    │   ├── gifts-illustration.svg
    │   ├── lantern.svg
    │   ├── moon-stars.svg
    │   └── royal-scroll.svg
    └── icons/
        ├── play.svg
        ├── pause.svg
        ├── volume.svg
        ├── mute.svg
        └── replay.svg
```

---

*Made with love for Dhanshree on Princess Day! ❤️👑*
