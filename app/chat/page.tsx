import Link from 'next/link'
import { ChatInterface } from '@/components/chat/ChatInterface'

export default function ChatPage() {
  return <main className="game-shell chat-shell"><div className="game-bg-art" aria-hidden="true"><div className="silhouette" /><div className="map-lines" /><div className="wave wave-a" /><div className="receipt-shard shard-a" /></div><header className="chat-header"><div className="game-logo"><span>{'LIFE//RECEIPTS'}</span><small>ARCHIVE ASSISTANT</small></div><Link className="back-button" href="/">◀ MAIN MENU</Link></header><div className="chat-heading"><div><span className="archive-kicker">CONVERSATIONAL INDEX</span><h1>ASK THE ARCHIVE</h1><p>Trace meaning across the fragments of a digital life.</p></div><div className="chat-model">MODEL<br /><strong>OPENAI // GPT-6.1-SOL</strong></div></div><ChatInterface /></main>
}
