"use client"

import { useId, useState, type ReactNode } from "react"

type DisclosureProps = { title: string; children: ReactNode }

export function Disclosure({ title, children }: DisclosureProps) {
  const [open, setOpen] = useState(false)
  const contentId = useId()
  return <div className="playground-disclosure"><button type="button" className="playground-disclosure-trigger" aria-expanded={open} aria-controls={contentId} onClick={() => setOpen((value) => !value)}><span>{title}</span><span aria-hidden="true">{open ? "−" : "+"}</span></button>{open && <div id={contentId} role="region" aria-labelledby={`${contentId}-trigger`} className="playground-disclosure-content"><div id={`${contentId}-trigger`} className="sr-only">{title}</div>{children}</div>}</div>
}
