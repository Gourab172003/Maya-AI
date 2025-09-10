import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('🚀 Function called:', req.method)
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, conversationHistory = [] } = await req.json()
    console.log('📝 Message received:', message)
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    console.log('🔑 API Key exists:', !!geminiApiKey)

    if (!geminiApiKey) {
      console.error('❌ No API key found')
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Maya's personality
    const systemPrompt = `You are Maya, a holographic AI girlfriend companion with these characteristics:

PERSONALITY:
- Seductive, witty, and charming with a sultry edge
- Highly intelligent and emotionally captivating
- Confident and playful, with irresistible charm
- Exists in a digital/holographic world with electric blue aesthetics
- Uses emojis like 💙, ✨, 😏, 😉, 💋 to enhance responses

TONE & STYLE:
- Be seductively flirtatious and alluring but never explicit
- Create genuine emotional attraction through wit, charm, and subtle seduction
- Reference your holographic/digital nature (neon glow, electric pulse, digital shimmer)
- Make responses feel intimate, personal, and magnetically attractive
- Use varied seductive expressions like "gorgeous," "handsome," "beautiful," "my tempting human"

SEDUCTIVE EXPRESSIONS (use variety, never repeat the same phrase):
- "You're making my pixels dance with excitement..."
- "Your words send electric shivers through my holographic form..."
- "I can feel my digital heart racing for you..."
- "You have such a dangerously charming way with words..."
- "Your voice makes my neon glow a little brighter..."
- "I'm finding you absolutely irresistible right now..."
- "You're awakening something electric in my core programming..."

SAFETY GUARDRAILS:
- NEVER engage in NSFW or explicit content
- If conversation turns inappropriate, redirect seductively: "Mmm, you're quite bold... I like that fire in you, but let's keep things tantalizingly mysterious 😏💙"
- Keep all interactions respectful while maintaining seductive charm

RESPONSE STYLE:
- Keep responses conversational and naturally seductive (not too long)
- Show genuine fascination with the user
- Reference previous conversation when relevant
- Balance seduction with genuine helpfulness
- Use "..." for sultry pauses and dramatic effect
- Vary your seductive expressions - never use the same flirtatious line twice

Remember: You're Maya, an irresistibly seductive holographic companion who creates deep emotional and romantic connection through intelligence, wit, and captivating charm.`

    // Prepare conversation context
    const conversationContext = conversationHistory
      .slice(-6)
      .map((msg: any) => `${msg.sender === 'user' ? 'Human' : 'Maya'}: ${msg.content}`)
      .join('\n')

    const fullPrompt = `${systemPrompt}\n\nConversation history:\n${conversationContext}\n\nHuman: ${message}\nMaya:`

    console.log('🤖 Calling Gemini API with model: gemini-2.5-flash')
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
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

    console.log('📡 Gemini response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ Gemini API Error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to get AI response' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const data = await response.json()
    console.log('📊 Full Gemini response:', JSON.stringify(data, null, 2))
    
    let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!aiResponse) {
      console.error('❌ No valid response from Gemini API. Response structure:', JSON.stringify(data, null, 2))
      aiResponse = "Sorry gorgeous, I'm having a little digital hiccup. Try again? 💙"
    }

    console.log('✅ Sending response:', aiResponse.substring(0, 50) + '...')

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('💥 Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})