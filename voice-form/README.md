# VoiceForm (वाक्-फॉर्म / குரல் படிவம்)
### Voice-Based Citizen Form Filling Web Application

> **A modern, accessible, conversational voice form-filling portal** designed for users with typing difficulties, low digital literacy, or visual impairments, specifically tailored for Indian citizens with support for **Indian English (`en-IN`)** and an extensible architecture for **Tamil (`ta-IN`)** and **Hindi (`hi-IN`)**.

---

## 1. Project Overview & Architecture

VoiceForm empowers any citizen to fill complex forms purely by speaking. The application uses the browser's native **Web Speech API (`SpeechRecognition`)** and **Web Speech Synthesis (`speechSynthesis`)**, without requiring Python backends, framework overhead, or paid cloud APIs for the prototype.

```text
       ┌────────────────────────┐
       │   OPEN APPLICATION     │
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │  CONVERSATIONAL PROMPT │ ◄── Speaks question aloud ("What is your full name?")
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │   USER SPEAKS PHRASE   │ ◄── "My name is Abinaya"
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │   SPEECH RECOGNITION   │ ◄── Web Speech API (en-IN)
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │   NATURAL PARSER       │ ◄── Strips prefixes, converts "at/dot", maps digits & dates
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │  CONFIRMATION SYSTEM   │ ◄── "You entered: Abinaya. Is this correct? (Yes/No)"
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │  FILL FORM & ADVANCE   │ ◄── Populates input, updates progress, steps to next
       └───────────┬────────────┘
                   ▼
       ┌────────────────────────┐
       │   REVIEW & SUBMISSION  │ ◄── Displays verified summary, receipt acknowledgement
       └────────────────────────┘
```

---

## 2. Directory Structure

```text
voice-form/
│
├── index.html          # Semantic, accessible HTML5 citizen portal
├── style.css           # Modern Indian e-Governance UI, high contrast, responsive
├── script.js           # Modular VoiceEngine, NLP Parser, State Machine, UI Manager
├── README.md           # Comprehensive technical & user documentation
└── assets/
    └── icons/          # Vector SVG icons (mic, speaker, keyboard, shield, check, etc.)
        ├── mic.svg
        ├── speaker.svg
        ├── shield.svg
        └── keyboard.svg
```

---

## 3. Quick Start & Setup

The application is 100% client-side with zero external build steps or dependencies.

### Option A: Open directly in any Web Browser
Simply double-click or open `voice-form/index.html` (or `index.html` at the project root) in Google Chrome, Microsoft Edge, or Chromium-based browsers.

### Option B: Run via a Local HTTP Server (Recommended for Microphone Permissions)
Browsers enforce strict microphone security rules on origins. To run with a local server:

```bash
# Using Python:
python -m http.server 8000

# Open in your browser:
http://localhost:8000/voice-form/
```

---

## 4. Voice Command Reference Guide

Users do **not** need to memorize robotic commands. VoiceForm uses fuzzy pattern matching and natural language understanding:

| Target Field / Action | Example Spoken Phrases | Interpretation Result |
| :--- | :--- | :--- |
| **Full Name** | `"My name is Abinaya"`, `"Fill my name as Suresh Kumar"`, `"Abinaya"` | Populates `Full Name` with capitalized text |
| **Email Address** | `"My email is abinaya at gmail dot com"`, `"suresh at yahoo dot in"` | Converts `at` to `@` and `dot` to `.` &rarr; `abinaya@gmail.com` |
| **Phone Number** | `"My phone number is 9876543210"`, `"nine eight seven six five four three two one zero"` | Normalizes spoken digits & validates 10-digit Indian mobile format |
| **Date of Birth** | `"June 15 2006"`, `"15th August 1998"`, `"15 06 2006"` | Normalizes to HTML5 ISO date `2006-06-15` |
| **Gender (Radio)** | `"Female"`, `"My gender is female"`, `"Male"`, `"Other"` | Automatically checks corresponding radio card |
| **Country (Dropdown)**| `"Select India"`, `"India"`, `"United States"`, `"Australia"` | Matches dropdown item. *Rejects unlisted options explicitly* |
| **Skills (Checkboxes)**| `"Select Java and Cybersecurity"`, `"Web Development"` | Checks all spoken skills simultaneously |
| **Unselect Skill** | `"Unselect Java"`, `"Deselect Java"`, `"Remove Java"` | Unchecks specific skill without clearing others |
| **Address** | `"My address is 42 Gandhi Road Chennai Tamil Nadu"` | Populates residential address textarea |
| **Document Upload** | `"Upload my document"` | Triggers native browser system file picker |
| **Next Field** | `"Next"`, `"Next field"`, `"Go next"`, `"Move forward"` | Steps to next field in conversational sequence |
| **Previous Field** | `"Previous"`, `"Go back"`, `"Back"`, `"Previous field"` | Steps to preceding field |
| **Jump to Field** | `"Go to email"`, `"Go to phone"`, `"Go to address"` | Jumps directly to specified field |
| **Clear Field** | `"Clear this field"`, `"Clear field"`, `"Erase"` | Clears value of active field |
| **Repeat Question** | `"Repeat"`, `"Say again"`, `"Repeat question"` | Assistant re-speaks prompt question |
| **Confirmation** | `"Yes"`, `"Correct"`, `"Proceed"` / `"No"`, `"Change it"` | Confirms or re-prompts sensitive values |
| **Review Form** | `"Review my form"`, `"Review"`, `"Check form"` | Opens the summary verification modal |
| **Submit Form** | `"Submit form"`, `"Submit"` | Prompts final confirmation and submits application |

---

## 5. Testing Checklist (The 8 Mandatory Scenarios)

The UI includes a built-in **Voice Simulator & Scenario Runner** at the bottom of the page allowing instant verification with or without a live microphone:

- [x] **Test 1 — Full Name:**
  - *Spoken:* `"My name is Abinaya"`
  - *Result:* Field `Full Name` is populated with `"Abinaya"`.
- [x] **Test 2 — Email with Spoken Symbols:**
  - *Spoken:* `"My email is abinaya at gmail dot com"`
  - *Result:* `at` becomes `@`, `dot` becomes `.`, spaces removed &rarr; `"abinaya@gmail.com"`.
- [x] **Test 3 — Dropdown Selection & Strict Option Enforcement:**
  - *Spoken:* `"Select India"` &rarr; Country dropdown selects `"India"`.
  - *Spoken (Unlisted):* `"Select France"` &rarr; Displays & speaks: *"That option is not available. Please choose from the available options."* (Does **not** guess or select an incorrect country).
- [x] **Test 4 — Radio Button Selection:**
  - *Spoken:* `"Female"` or `"My gender is female"`
  - *Result:* Radio button for `Female` is checked.
- [x] **Test 5 — Multi-Checkbox Selection & Unselection:**
  - *Spoken:* `"Select Java and cybersecurity"` &rarr; Checks both `Java` and `Cybersecurity`.
  - *Spoken:* `"Unselect Java"` &rarr; Unchecks `Java` while keeping `Cybersecurity` checked.
- [x] **Test 6 — Voice Navigation:**
  - *Spoken:* `"Next"` &rarr; Advances to next field.
- [x] **Test 7 — Field Clearance:**
  - *Spoken:* `"Clear this field"` &rarr; Empties current field contents.
- [x] **Test 8 — Microphone Permission Denied:**
  - *Action:* Click **"Test 8: 🚫 Simulate Mic Denied"** or deny permission in browser.
  - *Result:* Clear, friendly guidance card appears. All form fields, keyboard inputs, touch selection, and review buttons remain 100% usable.

---

## 6. Accessibility & Indian Digital-Service UX

Designed adhering to **WCAG 2.1 AA/AAA** standards:
1. **High Contrast Mode:** Instant toggle between standard GovTech theme and pure black/yellow high-contrast mode (`[data-high-contrast="true"]`).
2. **Text Resizer:** One-click font scaling: `A-` (14px), `A` (16px), and `A+` (18px) for elderly citizens or low-vision users.
3. **Large Click Targets:** All buttons, input fields, radio cards, and checkboxes have a minimum touch height of `48px` to `54px`.
4. **Live Screen Reader Announcements:** Dynamic updates use `aria-live="polite"` and `role="status"` live regions.
5. **Speech Synthesis Guidance:** Every step is spoken aloud with Indian English pronunciation (`en-IN`), with a topbar mute/unmute toggle.
6. **Dual Input (Voice + Manual):** Every field has a **"Type Instead"** action; voice is never mandatory.

---

## 7. Security & Privacy Model

* **Zero Server Audio Transmission:** Voice recognition executes within the browser's standard Web Speech sandboxed engine. Raw audio streams are never recorded, saved, or transmitted to any external server.
* **Pure Client-Side NLP:** Normalization of names, emails, phone numbers, and dates happens locally in JavaScript.
* **Zero Exposed API Keys:** Prototype avoids client-side API credentials.
* **Safe File Upload Handling:** In compliance with modern browser security specifications, saying *"Upload my document"* triggers the native system file dialog. The user explicitly selects their document, preventing unauthorized file system access.

---

## 8. Browser Compatibility

| Browser | Voice Recognition (`SpeechRecognition`) | Speech Synthesis (`speechSynthesis`) | Manual Form Fallback |
| :--- | :---: | :---: | :---: |
| **Google Chrome** (Desktop & Mobile) | Full Support | Full Support | Full Support |
| **Microsoft Edge** (Desktop & Mobile) | Full Support | Full Support | Full Support |
| **Samsung Internet** | Full Support | Full Support | Full Support |
| **Safari** (iOS 14.5+ & macOS) | Supported (`webkitSpeechRecognition`) | Supported | Full Support |
| **Mozilla Firefox** | Manual / Simulator Mode | Full Support | Full Support |

*Note: If opened in a browser without Web Speech support, VoiceForm displays an informative notification and allows complete manual form completion as well as the interactive Voice Simulator.*

---

## 9. Future Production Architecture (Scaling to Cloud STT)

For enterprise deployment across low-bandwidth rural networks and hundreds of Indian languages and regional dialects, the prototype can be augmented with a secure cloud backend:

```text
┌───────────────────────────────────────────────────────────┐
│                     FRONTEND CLIENT                       │
│  - React / Next.js or Vanilla Web App                      │
│  - Dual Input (Audio Capture + WebSockets + HTML Forms)    │
└─────────────────────────────┬─────────────────────────────┘
                              │ Secure WebSocket / HTTPS (PCM Audio Stream)
                              ▼
┌───────────────────────────────────────────────────────────┐
│                    NODE.JS / FASTAPI GATEWAY              │
│  - Citizen Authentication (DigiLocker / Aadhaar OTP / SMS)│
│  - Rate Limiting, Session Token Validation                │
└─────────────────────────────┬─────────────────────────────┘
                              │
          ┌───────────────────┴───────────────────┐
          ▼                                       ▼
┌────────────────────────────────┐   ┌────────────────────────────────┐
│      SPEECH-TO-TEXT ENGINE     │   │      INTENT & ENTITY ENGINE    │
│  - Google Cloud Speech-to-Text  │   │  - Multilingual LLM / Gemini   │
│    (Chirp v2: Hindi, Tamil,    │   │  - Specialized Entity Extractor│
│     Bengali, Telugu, Marathi)  │   │    (Names, PIN Codes, Dates)   │
│  - Azure Cognitive Speech      │   │  - JSON Schema Validation      │
│  - Amazon Transcribe           │   │                                │
└────────────────────────────────┘   └────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│                    DATABASE & SERVICES                    │
│  - PostgreSQL / MongoDB (Encrypted Application Store)     │
│  - Citizen SMS Notification (e-Pramaan / CDAC Gateway)    │
│  - Government Portal Workflow Submission (API)            │
└───────────────────────────────────────────────────────────┘
```

---

## 10. License

Built for public service enablement and accessibility. Open source and free to adapt.
