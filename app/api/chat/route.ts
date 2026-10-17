import { groq } from '@ai-sdk/groq'
import { convertToModelMessages, createUIMessageStreamResponse, safeValidateUIMessages, streamText, toUIMessageStream, type UIMessage } from 'ai'

export const maxDuration = 30
const MAX_MESSAGES = 30
const MAX_MESSAGE_LENGTH = 4000
const MODEL = 'openai/gpt-oss-20b'

function hasValidTextLengths(messages: UIMessage[]) {
  return messages.every((message) => message.parts.every((part) => part.type !== 'text' || part.text.length <= MAX_MESSAGE_LENGTH))
}

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) return Response.json({ error: 'The archive assistant is not configured. Add GROQ_API_KEY on the server and retry.' }, { status: 503 })
    const body = await request.json() as { messages?: unknown }
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > MAX_MESSAGES) {
      return Response.json({ error: `Send between 1 and ${MAX_MESSAGES} messages.` }, { status: 400 })
    }

    const validation = await safeValidateUIMessages<UIMessage>({ messages: body.messages })
    if (!validation.success || !hasValidTextLengths(validation.data)) {
      return Response.json({ error: 'The request contained malformed messages. Please retry.' }, { status: 400 })
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
