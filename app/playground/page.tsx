import type { Metadata } from "next"
import { AccessiblePlayground } from "@/playground/AccessiblePlayground"

export const metadata: Metadata = { title: "Accessibility Lab — LIFE//RECEIPTS", description: "Accessible component fundamentals playground." }

export default function PlaygroundPage() { return <AccessiblePlayground /> }
