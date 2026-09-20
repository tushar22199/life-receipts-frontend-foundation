'use client'

import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Menu, Search, Sparkles, X } from 'lucide-react'

const navItems = ['Overview', 'Journey', 'Connections', 'Patterns', 'Story']
const statLabels = ['Records analyzed', 'Years covered', 'Connections found', 'Chapters discovered']
const chapterLabels = ['Chapter 01', 'Chapter 02', 'Chapter 03']

function SectionKicker({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">{children}</p>
}

function PlaceholderMark() {
  return <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Awaiting data</span>
}

function PulseVisual() {
  return (
    <div className="pulse-visual" aria-label="Empty life pulse visualization">
      <div className="pulse-axis pulse-axis-top" />
      <div className="pulse-axis pulse-axis-bottom" />
      <div className="pulse-line pulse-line-one" />
      <div className="pulse-line pulse-line-two" />
      <div className="pulse-line pulse-line-three" />
      <div className="pulse-center"><span /></div>
      <div className="pulse-label pulse-label-left">Past</div>
      <div className="pulse-label pulse-label-right">Present</div>
      <div className="pulse-empty-copy">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">01 / 01</span>
        <p>Your digital history is waiting to be decoded.</p>
      </div>
    </div>
  )
}

function NetworkVisual() {
  const nodes = [
    ['node-a', 'MUSIC'], ['node-b', 'PLACES'], ['node-c', 'PURCHASES'],
    ['node-d', 'PHOTOS'], ['node-e', 'MESSAGES'], ['node-f', 'SEARCHES'], ['node-g', 'EVENTS'],
  ]
  return (
    <div className="network-visual" aria-label="Empty network visualization placeholder">
      <svg className="network-lines" viewBox="0 0 640 340" preserveAspectRatio="none" aria-hidden="true">
        <path d="M320 169 L94 76 M320 169 L186 270 M320 169 L530 76 M320 169 L494 270 M320 169 L78 205 M320 169 L562 195" />
        <path d="M94 76 L186 270 M530 76 L494 270 M78 205 L562 195" opacity=".35" />
      </svg>
      {nodes.map(([className, label]) => <div key={className} className={`network-node ${className}`}><i /><span>{label}</span></div>)}
      <div className="network-core"><Sparkles aria-hidden="true" /><span>YOUR<br />LIFE</span></div>
      <div className="network-note">A map of the moments<br />that shaped you.</div>
    </div>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <main className="archive-shell">
      <header className="site-header">
        <a className="wordmark" href="#overview" aria-label="Life Receipts home">LIFE<span>//</span>RECEIPTS</a>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <button className="search-trigger" onClick={() => setSearchOpen(!searchOpen)} aria-label="Toggle global search" aria-expanded={searchOpen}><Search aria-hidden="true" /><span>Search</span><kbd>⌘ K</kbd></button>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>
      {searchOpen && <div className="search-panel"><Search aria-hidden="true" /><input autoFocus placeholder="Search your receipts..." aria-label="Search your receipts" /><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button></div>}

      <section id="overview" className="hero archive-section">
        <div className="hero-index font-mono">00 / 05</div>
        <div className="hero-copy">
          <SectionKicker>Personal digital archive / v.01</SectionKicker>
          <h1>Your life,<br /><em>in receipts.</em></h1>
          <p className="hero-subtitle">Thousands of tiny moments.<br />Connected into something larger.</p>
        </div>
        <div className="hero-aside"><ArrowDownRight aria-hidden="true" /><span>Scroll to explore<br />the archive</span></div>
      </section>

      <section className="stats-grid" aria-label="Archive statistics placeholders">
        {statLabels.map((label, index) => <div className="stat-item" key={label}><span className="stat-number">—</span><div><p>{label}</p><PlaceholderMark /></div><span className="stat-index">0{index + 1}</span></div>)}
      </section>

      <section id="journey" className="archive-section content-section">
        <div className="section-heading"><div><SectionKicker>01 / The pulse</SectionKicker><h2>Life <em>pulse.</em></h2></div><p className="section-intro">A living trace of your digital<br className="hidden md:block" /> existence, across time.</p></div>
        <PulseVisual />
      </section>

      <section id="patterns" className="archive-section content-section split-section">
        <div><SectionKicker>02 / Initial findings</SectionKicker><h2>What we <em>found.</em></h2><div className="empty-message"><span className="empty-rule" /><p>Insights will appear once<br />your receipts are analyzed.</p></div></div>
        <div className="stamp">DATA<br />PENDING</div>
      </section>

      <section className="archive-section content-section" aria-labelledby="chapters-title">
        <div className="section-heading"><div><SectionKicker>03 / The narrative</SectionKicker><h2 id="chapters-title">Life <em>chapters.</em></h2></div><PlaceholderMark /></div>
        <div className="chapters-grid">{chapterLabels.map((chapter, index) => <article className="chapter-card" key={chapter}><span className="chapter-number">0{index + 1}</span><div className="chapter-placeholder"><div className="chapter-orbit" /><span>{chapter}</span><PlaceholderMark /></div><p>Placeholder chapter</p><ArrowUpRight aria-hidden="true" /></article>)}</div>
      </section>

      <section id="connections" className="archive-section content-section connect-section">
        <div className="section-heading"><div><SectionKicker>04 / The constellation</SectionKicker><h2>Connect the <em>dots.</em></h2></div><p className="section-intro">The invisible threads between<br />the things you leave behind.</p></div>
        <NetworkVisual />
      </section>

      <section id="story" className="story-cta archive-section"><SectionKicker>05 / The complete picture</SectionKicker><h2>Enter <em>story mode.</em></h2><p>Turn the fragments into something you can feel.</p><a href="#overview" className="story-button">Begin the reconstruction <ArrowUpRight aria-hidden="true" /></a></section>
      <footer className="site-footer"><span>LIFE//RECEIPTS</span><span>YOUR LIFE, DECODED.</span><span>FRONTEND FOUNDATION / 2026</span></footer>
    </main>
  )
}

// The attached reference image depicts a Dissidia Final Fantasy PSP menu: a pale, translucent game UI with stacked navigation rows and two handheld consoles.
// It is not used as an application asset; the archive aesthetic above is intentionally distinct.

