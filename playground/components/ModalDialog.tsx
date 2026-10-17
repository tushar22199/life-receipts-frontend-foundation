"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type ModalDialogProps = { title: string; description: string; children?: ReactNode }

function getFocusable(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  ))
}

export function ModalDialog({ title, description, children }: ModalDialogProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const first = getFocusable(dialog)[0]
    first?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); return }
      if (event.key !== "Tab") return
      const focusable = getFocusable(dialog)
      if (!focusable.length) { event.preventDefault(); return }
      const firstItem = focusable[0]
      const lastItem = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === firstItem) { event.preventDefault(); lastItem.focus() }
      else if (!event.shiftKey && document.activeElement === lastItem) { event.preventDefault(); firstItem.focus() }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = previousOverflow }
  }, [open])

  useEffect(() => {
    if (!open) triggerRef.current?.focus()
  }, [open])

  return <>
    <button ref={triggerRef} type="button" className="playground-button" onClick={() => setOpen(true)}>Open modal</button>
    {open && <div className="playground-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
      <div ref={dialogRef} className="playground-modal" role="dialog" aria-modal="true" aria-labelledby="custom-dialog-title" aria-describedby="custom-dialog-description">
        <h3 id="custom-dialog-title">{title}</h3>
        <p id="custom-dialog-description">{description}</p>
        {children}
        <div className="playground-actions"><button type="button" className="playground-button" onClick={() => setOpen(false)}>Close modal</button><button type="button" className="playground-button secondary">Secondary action</button></div>
      </div>
    </div>}
  </>
}
