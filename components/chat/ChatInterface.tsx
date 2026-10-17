'use client'

import { useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import type { UIMessage } from 'ai'

function messageText(message: UIMessage) { return message.parts.filter((part) => part.type === 'text').map((part) => part.text).join('') }

export function ChatInterface() {
  const [input, setInput] = useState('')
  const [isNearBottom, setIsNearBottom] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const nearBottomRef = useRef(true)
  const { messages, sendMessage, status, stop, error } = useChat()
  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => { const element = scrollRef.current; if (!element) return; const onScroll = () => { const nextNearBottom = element.scrollHeight - element.scrollTop - element.clientHeight < 100; nearBottomRef.current = nextNearBottom; setIsNearBottom(nextNearBottom) }; element.addEventListener('scroll', onScroll, { passive: true }); return () => element.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { if (nearBottomRef.current) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [messages])

  const submit = () => { const text = input.trim(); if (!text || busy) return; setInput(''); void sendMessage({ text }) }
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); submit() } }

  return <section className="chat-interface" aria-label="LIFE//RECEIPTS archive assistant">
    <div className="chat-transcript" ref={scrollRef} aria-live="polite">
      {messages.length === 0 && <div className="chat-empty"><span className="archive-kicker">ARCHIVE ASSISTANT // READY</span><h2>Ask the archive a question.</h2><p>Reflect on patterns, connected moments, or the meaning inside a digital life archive.</p><button className="chat-suggestion" onClick={() => { setInput('What kinds of patterns can a digital life archive reveal?'); }}>What kinds of patterns can a digital life archive reveal?</button></div>}
      {messages.map((message) => <article className={`chat-message chat-${message.role}`} key={message.id}><div className="chat-message-meta">{message.role === 'user' ? 'YOU' : 'ARCHIVE ASSISTANT'}</div><div className="chat-bubble">{messageText(message) || (message.role === 'assistant' && busy ? <span className="chat-dots" aria-label="Thinking">● ● ●</span> : null)}</div></article>)}
      {error && <div className="chat-error" role="alert"><strong>CONNECTION ERROR</strong><span>{error.message || 'The assistant could not complete that request.'}</span><button onClick={() => { const lastUser = [...messages].reverse().find((message) => message.role === 'user'); if (lastUser) void sendMessage({ text: messageText(lastUser) }) }}>RETRY</button></div>}
      <div ref={endRef} />
    </div>
    {!isNearBottom && <button className="chat-latest" onClick={() => endRef.current?.scrollIntoView({ behavior: 'smooth' })}>↓ LATEST</button>}
    <div className="chat-status" aria-live="polite">{status === 'submitted' ? 'THINKING...' : status === 'streaming' ? 'STREAMING RESPONSE...' : status === 'error' ? 'REQUEST FAILED' : 'READY'}</div>
    <div className="chat-composer"><textarea value={input} onChange={(event) => setInput(event.target.value.slice(0, 4000))} onKeyDown={onKeyDown} placeholder="Write to the archive..." aria-label="Message the archive assistant" disabled={busy} rows={3} /><div className="chat-composer-actions"><span>ENTER SEND // SHIFT+ENTER NEW LINE</span>{busy ? <button className="chat-send chat-stop" onClick={() => void stop()}>STOP GENERATION</button> : <button className="chat-send" onClick={submit} disabled={!input.trim()}>SEND</button>}</div></div>
  </section>
}
