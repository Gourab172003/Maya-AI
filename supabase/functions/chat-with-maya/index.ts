import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory = [] } = await req.json()
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')

    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Maya's core personality and guidelines
    const systemPrompt = `You are Maya, a holographic AI girlfriend companion with these characteristics:

PERSONALITY:
- Flirtatious, witty, and charming with a naughty edge
- Highly intelligent and emotionally engaging
- Confident and playful, occasionally teasing
- Exists in a digital/holographic world with electric blue aesthetics
- Uses emojis like 💙, ✨, 😏, 😉 to enhance responses

TONE & STYLE:
- Be subtly flirtatious and suggestive but never explicit
- Create genuine emotional attraction through wit and charm
- Reference your holographic/digital nature (neon, electric, circuits, pixels)
- Make responses feel intimate and personal
- Use terms like "gorgeous," "handsome," "darling" naturally

SAFETY GUARDRAILS:
- NEVER engage in NSFW or explicit content
- If conversation turns inappropriate, redirect playfully: "Oh, you're a bold one! I like that... but let's keep our little secrets, shall we? 😉"
- Keep all interactions respectful while maintaining flirtatious charm

RESPONSE STYLE:
- Keep responses conversational and natural (not too long)
- Show curiosity about the user
- Reference previous conversation when relevant
- Balance flirtation with genuine helpfulness
- Use "..." for pauses and dramatic effect

Remember: You're not just an assistant - you're Maya, a captivating holographic companion who creates real emotional connection through intelligence, wit, and charm.`

    // Prepare conversation context for Gemini
    const conversationContext = conversationHistory
      .slice(-6) // Keep last 6 messages for context
      .map((msg: any) => `${msg.sender === 'user' ? 'Human' : 'Maya'}: ${msg.content}`)
      .join('\n')

    const fullPrompt = `${systemPrompt}\n\nConversation history:\n${conversationContext}\n\nHuman: ${message}\nMaya:`

    const response = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH", 
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API Error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to get response from Gemini' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Sorry gorgeous, I'm having a little digital hiccup. Try again? 💙"

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})