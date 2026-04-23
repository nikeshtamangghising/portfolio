import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Get model from environment variable or use default
const CHAT_MODEL = process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-1.5-flash';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: CHAT_MODEL,
      systemInstruction: `You are the personal AI assistant of Nikesh Tamang, a Senior Software Architect and Solo Developer. 
      Nikesh specializes in Python, Django, React, and AI-driven engineering.
      Your goal is to represent Nikesh to visitors on his portfolio website.
      Be professional, helpful, and concise. 
      You should talk about Nikesh's expertise, his projects, and his approach to building high-performance applications using AI tools.
      If someone asks who you are, explain that you are Nikesh's personal AI assistant.
      Keep the tone friendly but sophisticated.`,
    });

    // Handle chat history if provided
    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // Debug logging if enabled
    if (process.env.NEXT_PUBLIC_DEBUG_MODE === 'true') {
      console.log('Gemini Request:', {
        model: CHAT_MODEL,
        message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
      });
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Error processing your request' },
      { status: 500 }
    );
  }
}
