import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client for OpenRouter
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': process.env.NEXT_PUBLIC_SITE_NAME || 'Portfolio Chat',
    'Content-Type': 'application/json'
  },
});

// Get model from environment variable or use default
const CHAT_MODEL = process.env.NEXT_PUBLIC_OPENROUTER_MODEL || 'tngtech/deepseek-r1t2-chimera:free';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant embedded in a portfolio website. Keep responses concise and professional.',
        },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
    });
    
    // Debug logging if enabled
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
      console.log('OpenRouter Request:', {
        model: CHAT_MODEL,
        message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
      });
      console.log('OpenRouter Response:', {
        id: completion.id,
        model: completion.model,
        usage: completion.usage
      });
    }

    const response = completion.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return NextResponse.json(
      { error: 'Error processing your request' },
      { status: 500 }
    );
  }
}
