"use client"

import { useId, useState, type KeyboardEvent } from "react"

type Tab = { label: string; content: string }
type TabsProps = { tabs: Tab[] }

export function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let next = active
    if (event.key === "ArrowRight") next = (active + 1) % tabs.length
    else if (event.key === "ArrowLeft") next = (active - 1 + tabs.length) % tabs.length
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = tabs.length - 1
    else return
    event.preventDefault()
    setActive(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }
  const activeTab = tabs[active]
  return <div className="playground-tabs">
    <div role="tablist" aria-label="Playground topics" className="playground-tablist">
      {tabs.map((tab, index) => <button key={tab.label} id={`${baseId}-tab-${index}`} type="button" role="tab" aria-selected={active === index} aria-controls={`${baseId}-panel-${index}`} tabIndex={active === index ? 0 : -1} className="playground-tab" onClick={() => setActive(index)} onKeyDown={onKeyDown}>{tab.label}</button>)}
    </div>
    <div id={`${baseId}-panel-${active}`} role="tabpanel" aria-labelledby={`${baseId}-tab-${active}`} tabIndex={0} className="playground-panel"><h3>{activeTab.label}</h3><p>{activeTab.content}</p></div>
  </div>
}
