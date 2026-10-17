# FE-05 accessibility notes

## Source files inspected

- Hand-built dialog: `playground/components/ModalDialog.tsx`
- Hand-built tabs: `playground/components/Tabs.tsx`
- Hand-built disclosure: `playground/components/Disclosure.tsx`
- Generated dialog: `components/ui/dialog.tsx`
- Generated tabs: `components/ui/tabs.tsx`

## Concrete differences

1. **Dialog focus and background behavior.** The hand-built dialog owns its focus trap with a document-level `keydown` listener and locks `document.body.style.overflow` while open. The generated `components/ui/dialog.tsx` delegates focus trapping, Escape handling, dismissal, scroll locking, and modal behavior to `@base-ui/react/dialog` through `DialogPrimitive.Root` and `DialogPrimitive.Popup`. This matters because the primitive centralizes edge cases such as focus restoration, nested dialogs, pointer dismissal, and portal lifecycle instead of requiring every consumer to maintain them.

2. **Dialog structure and IDs.** The hand-built dialog hard-codes `custom-dialog-title` and `custom-dialog-description`, so rendering two instances at once would create duplicate IDs. The generated source composes `DialogTitle` and `DialogDescription` around Base UI parts, which provides instance-safe primitive behavior and lets consumers omit or visually hide supporting text without changing the dialog implementation.

3. **Tabs state and keyboard behavior.** The hand-built `playground/components/Tabs.tsx` manually owns the active index, roving `tabIndex`, IDs, and Arrow/Home/End behavior. The generated `components/ui/tabs.tsx` delegates those behaviors to `@base-ui/react/tabs`; its wrappers primarily add styling and data attributes. This improves maintainability and covers primitive-level interaction details such as orientation and controlled/uncontrolled state.

4. **Disclosure scope.** The hand-built disclosure unmounts collapsed content, which guarantees hidden content cannot be tabbed into, but it does not provide animation or a reusable primitive API. The installed shadcn set does not include a disclosure component in this assignment; a production implementation would typically use the project's primitive strategy rather than treating the custom implementation as a complete replacement for every disclosure edge case.
