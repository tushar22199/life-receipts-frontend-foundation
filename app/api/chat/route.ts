import { groq } from '@ai-sdk/groq'
import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream, type UIMessage } from 'ai'

export const maxDuration = 30
const MAX_MESSAGES = 30
const MAX_MESSAGE_LENGTH = 4000
const MODEL = 'openai/gpt-oss-20b'

function isValidMessage(message: unknown): message is UIMessage {
  if (!message || typeof message !== 'object') return false
  const candidate = message as { role?: unknown; parts?: unknown }
  if (!['user', 'assistant', 'system'].includes(String(candidate.role))) return false
  if (!Array.isArray(candidate.parts)) return false
  return candidate.parts.every((part) => part && typeof part === 'object' && 'type' in part && (part as { type?: unknown }).type === 'text' && typeof (part as { text?: unknown }).text === 'string' && ((part as { text: string }).text.length <= MAX_MESSAGE_LENGTH))
}

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) return Response.json({ error: 'The archive assistant is not configured. Add GROQ_API_KEY on the server and retry.' }, { status: 503 })
    const body = await request.json() as { messages?: unknown }
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > MAX_MESSAGES || !body.messages.every(isValidMessage)) {
      return Response.json({ error: `Send between 1 and ${MAX_MESSAGES} valid messages.` }, { status: 400 })
    }

    const result = streamText({
      model: groq(MODEL),
      instructions: 'You are the LIFE//RECEIPTS archive assistant. Be concise, thoughtful, and transparent. You can help users interpret the idea of a digital life archive, identify patterns in their records, and reflect on connected moments. Do not claim to have accessed private records unless they are included in the conversation.',
      messages: await convertToModelMessages(body.messages),
      abortSignal: request.signal,
      maxOutputTokens: 900,
    })

    return createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) })
  } catch (error) {
    if (request.signal.aborted) return new Response(null, { status: 499 })
    console.error('[v0] Chat route failed:', error instanceof Error ? error.message : 'unknown error')
    return Response.json({ error: 'The archive assistant is unavailable. Please retry.' }, { status: 502 })
  }
}
