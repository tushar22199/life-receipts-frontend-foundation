'use client'

import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Circle, Disc3, Music2, Play, Plus, Square, Triangle } from 'lucide-react'

const menuItems = [
  ['STORY MODE', 'Turn connected moments into an interactive story.'],
  ['JOURNEY MODE', 'Explore the digital journey and discover periods of unusual activity.'],
  ['RECEIPT ARCHIVE', 'Browse the individual fragments that make up the archive.'],
  ['CONNECT THE DOTS', 'Discover relationships between moments that appear unrelated.'],
  ['PATTERN LAB', 'Explore recurring activity, clusters and hidden patterns.'],
  ['SETTINGS', 'Configure the archive experience.'],
] as const

function HudClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const timer = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(timer) }, [])
  return <div className="hud-time"><span>TIME</span><strong>{now.toLocaleTimeString('en-GB', { hour12: false })}</strong><span>DATE</span><strong>{now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}</strong></div>
}

function ArchiveCore() {
  return <div className="core-stage" aria-label="Abstract digital memory core illustration">
    <div className="core-glow" /><div className="core-orbit orbit-one" /><div className="core-orbit orbit-two" /><div className="core-orbit orbit-three" />
    <div className="timeline-mark mark-a">2004</div><div className="timeline-mark mark-b">NOW</div>
    <div className="core-diamond"><span>MEMORY<br />CORE</span></div>
    <div className="core-layer layer-a" /><div className="core-layer layer-b" />
    <div className="core-node node-1" /><div className="core-node node-2" /><div className="core-node node-3" /><div className="core-node node-4" /><div className="core-node node-5" />
    <div className="core-fragment fragment-a">01 / REC</div><div className="core-fragment fragment-b">TXN_204</div><Music2 className="core-music" aria-hidden="true" />
    <span className="transaction-symbol">$</span><p className="core-caption">DIGITAL MEMORY CORE // STANDBY</p>
  </div>
}

function ArchiveStatus() {
  return <div className="archive-status"><div className="status-heading"><span>ARCHIVE STATUS</span><i aria-label="Dataset loading" /></div><div className="status-grid"><span>RECEIPTS</span><b>----</b><span>YEARS</span><b>----</b><span>CONNECTIONS</span><b>----</b><span>CHAPTERS</span><b>----</b></div></div>
}

export default function Page() {
  const [selected, setSelected] = useState(0)
  const [started, setStarted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const item = menuItems[selected]
  const progress = useMemo(() => `${String(selected + 1).padStart(2, '0')} / ${String(menuItems.length).padStart(2, '0')}`, [selected])
  const choose = (index: number) => { setSelected(index); setTransitioning(true); window.setTimeout(() => setTransitioning(false), 360) }
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'ArrowDown') { event.preventDefault(); choose((selected + 1) % menuItems.length) }; if (event.key === 'ArrowUp') { event.preventDefault(); choose((selected - 1 + menuItems.length) % menuItems.length) }; if (event.key === 'Enter') { event.preventDefault(); setStarted(true) } }; window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown) }, [selected])
  return <main className={`game-shell ${transitioning ? 'screen-transition' : ''}`}>
    <div className="game-bg-art" aria-hidden="true"><div className="silhouette" /><div className="map-lines" /><div className="wave wave-a" /><div className="wave wave-b" /><div className="receipt-shard shard-a" /><div className="receipt-shard shard-b" /><div className="photo-fragment photo-a" /><div className="photo-fragment photo-b" /></div>
    <header className="game-header"><div className="game-logo"><span>LIFE//RECEIPTS</span><small>DIGITAL LIFE ARCHIVE</small></div><div className="header-hud"><div className="hud-actions"><span><Triangle /> CUSTOMIZE</span><span><Square /> ARCHIVE</span></div><HudClock /><div className="online"><i /> STATUS&nbsp; ONLINE</div></div></header>
    <div className="game-layout"><section className="menu-column" aria-label="Main menu"><div className="menu-label"><span>MAIN MENU</span><b>{progress}</b></div><nav className="game-menu" aria-label="Archive modes">{menuItems.map(([label], index) => <button key={label} className={index === selected ? 'menu-item selected' : 'menu-item'} onMouseEnter={() => choose(index)} onFocus={() => choose(index)} onClick={() => setStarted(true)} aria-current={index === selected ? 'true' : undefined}><span className="menu-cursor" aria-hidden="true"><i /></span><span>{label}</span><small>{String(index + 1).padStart(2, '0')}</small></button>)}</nav><ArchiveStatus /></section><section className="visual-column"><ArchiveCore /><div className="description-panel" aria-live="polite"><div className="panel-mark"><Plus /></div><div><span className="panel-kicker">RECEIPT ARCHIVE // SELECTED</span><p key={item[0]}>{item[1]}</p></div><ChevronDown className="panel-arrow" aria-hidden="true" /></div></section></div>
    <footer className="game-footer"><div className="player-line"><span>PLAYER</span><strong>LIFE//RECEIPTS</strong></div><div className="controls"><span><Triangle /> SELECT</span><span><Circle /> BACK</span><span><Play /> START</span></div><div className="manual"><Disc3 /> MANUAL<br /><b>START</b></div></footer>
    {started && <div className="start-notice" role="dialog" aria-label={`${item[0]} screen`}><span className="notice-kicker">ARCHIVE MODULE // LOADING</span><strong>{item[0]}</strong><span>{item[1]}</span><button onClick={() => setStarted(false)}>CLOSE</button></div>}
  </main>
}
