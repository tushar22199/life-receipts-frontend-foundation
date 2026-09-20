# LIFE//RECEIPTS 🧾

> **Your Life, In Receipts**

LIFE//RECEIPTS is an interactive data-story experience that turns raw digital activity into something you can explore like a game.

Instead of presenting life as a simple chronological timeline, the experience moves through four layers:

**RAW DATA → INSIGHTS → CONNECTIONS → STORY**

It combines music listening, household activity, and transaction records into an interactive archive where users can explore individual receipts, discover measurable relationships, identify recurring patterns, and experience automatically generated story chapters.

---

## 🎮 Experience

LIFE//RECEIPTS is designed like a late-1990s / early-2000s console game menu rather than a conventional analytics dashboard.

The interface uses:

- Silver and white interface panels
- Indigo selection states
- Angular / beveled controls
- Technical HUD elements
- Game-style navigation
- Keyboard interaction
- Responsive layouts
- A nostalgic Japanese-console-inspired visual language

The goal is to make exploring data feel like navigating a digital memory archive.

---

# ✦ Core Features

## 01 — Story Mode

**Question:** What does the data tell us?

Story Mode transforms measurable activity patterns into interactive chapters.

It identifies candidate moments from:

- Activity bursts
- Strong connection clusters
- Repeated patterns
- Dense activity periods
- Cross-source temporal overlap

Each chapter can be explored moment-by-moment.

Users can:

- Navigate through moments
- Inspect the underlying receipts
- Explore connections
- Replay chapters
- Return to the story archive

The system avoids inventing emotional or biographical conclusions that are not supported by the data.

---

## 02 — Journey Mode

**Question:** How can I experience the archive as a journey?

Journey Mode provides a game-like entry point into the Story Mode experience.

It turns the underlying activity archive into an exploratory sequence rather than a static report.

---

## 03 — Receipt Archive

**Question:** What actually happened?

The Receipt Archive provides direct access to the underlying records.

Supported sources:

- 🎵 Spotify listening history
- 🏠 Household transactions
- 💳 Transaction records

Features include:

- Source filtering
- Search
- Receipt filtering
- Pagination
- Receipt details
- Keyboard navigation
- Responsive layouts
- Connection exploration

The application works with the real supplied datasets rather than fabricated demo records.

---

## 04 — Connect the Dots

**Question:** What belongs together?

Connect the Dots uses measurable relationships between receipts to discover connections.

Signals can include:

- Temporal proximity
- Same artist
- Same track
- Shared categories
- Keyword overlap
- Geographic proximity
- Activity clustering

Connections are scored using the existing connection engine and displayed with concrete explanations rather than unsupported personal interpretations.

For example:

> Same artist • 12 minutes apart

The system also groups repeated Spotify activity to avoid flooding the interface with duplicate-looking relationships.

---

## 05 — Pattern Lab

**Question:** What keeps happening?

Pattern Lab turns the raw archive into an exploratory pattern-discovery interface.

It includes views such as:

- Activity Rhythm
- Listening DNA
- Spending DNA
- Activity Bursts
- Repeated Behavior
- Unusual Activity

The goal is to move from individual receipts toward measurable patterns across the larger dataset.

---

## 06 — Settings

A lightweight preferences screen provides:

- Reduced Motion
- Visual Density
- Keyboard Help
- Reset Preferences

Preferences persist locally using `localStorage`.

The application does not require an account or backend for these settings.

---

# 📊 Data

LIFE//RECEIPTS currently works with three logical datasets.

### Spotify History

Approximately **149,860 listening records** spanning **2013–2024**.

Example fields include:

- Timestamp
- Platform
- Track
- Artist
- Album
- Playback duration
- Skip state
- Start/end reason

### Household Transactions

Approximately **2,461 records** spanning **2015–2018**.

Example fields include:

- Date
- Mode
- Category
- Subcategory
- Note
- Amount
- Income/Expense
- Currency

### India Transactions

Approximately **10,267 records** spanning **2022–2024**.

The application uses privacy-safe analytical fields such as:

- Transaction date/time
- Merchant
- Category
- Amount
- City
- State
- Geographic coordinates
- Fraud flag

The total archive contains approximately:

**162,588 records**

---

# 🔐 Privacy

The application intentionally avoids exposing sensitive personal fields from the transaction dataset.

The following fields are not displayed, searched, or used in the user-facing experience:

- Credit card numbers
- First/last names
- Street addresses
- Dates of birth
- Customer IDs

Archive search operates only on explicitly declared safe fields rather than searching every property in a transaction record.

No authentication system or personal account is required.

---

# ⚙️ Technical Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React**
- **Vercel**
- **pnpm**

The application is frontend-only.

Dataset processing and exploration happen within the application without requiring a custom backend.

---

# 🏗️ Architecture

The application is organized around several major experiences:

```text
                    ┌──────────────────┐
                    │    MAIN MENU     │
                    └────────┬─────────┘
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
       ▼                     ▼                     ▼
 RECEIPT ARCHIVE       CONNECT THE DOTS       PATTERN LAB
       │                     │                     │
       └─────────────────────┼─────────────────────┘
                             │
                             ▼
                       STORY MODE
                             │
                             ▼
                         CHAPTERS
