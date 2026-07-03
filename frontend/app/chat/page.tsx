'use client';

import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/shared/Header';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hello! I'm JARVIS, your AI travel planning assistant. I can help you plan your trip to Tokyo, suggest activities, optimize your itinerary, and answer any travel questions. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response - in production this would call the LangGraph backend
      setTimeout(() => {
        const responses: { [key: string]: string } = {
          'what should i do': 'Based on your 3-day itinerary, I recommend: Day 1 - Visit Senso-ji Temple and enjoy street food in Asakusa. Day 2 - Explore Shibuya Crossing and Meiji Shrine. Day 3 - Visit Tokyo Tower and experience local dining before your flight.',
          'recommend restaurants': 'I\'ve identified 12 top-rated restaurants within your budget. The Michelin-starred sushi restaurant on Dec 16 evening is highly recommended for an authentic experience.',
          'how much will this cost': 'Your current estimated budget breakdown is: Flights $800, Accommodation $600, Food $400, Activities $300, Transport $200. Total: $2,300. You have $540 remaining.',
          'any safety tips': 'Tokyo is very safe! Key tips: Use the excellent public transportation system, keep copies of your passport, inform your bank of travel dates, and have the US Embassy contact info saved.',
          'what\'s the weather': 'Dec 15-17 forecast: 50-55°F with possible rain on Dec 17. I\'ve already updated your packing list with weather-appropriate items.',
          'visa information': 'Good news! As a US citizen, you\'re exempt from visa requirements for up to 90 days. Just ensure your passport is valid for 6+ months and have your return ticket ready.',
        };

        const response = responses[input.toLowerCase()] || 'That\'s a great question! Based on your trip details, I recommend exploring the local neighborhoods and trying authentic Japanese cuisine. Would you like specific suggestions for activities or restaurants?';

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 flex flex-col">
        {/* Chat Header */}
        <div className="mb-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full glass border border-primary/30 mb-4">
            <span className="text-2xl mr-2">🤖</span>
            <span className="text-sm font-bold text-primary">JARVIS • AI Travel Assistant</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Ask Me Anything About Your <span className="text-primary">Tokyo Trip</span>
          </h1>
          <p className="text-foreground-muted">From itinerary optimization to local recommendations</p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 glass rounded-xl border border-border p-6 overflow-y-auto mb-6 max-h-[60vh]">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-md px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-background rounded-br-none'
                      : 'glass border border-border rounded-bl-none'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <p className="text-xs text-foreground-muted mb-2">🤖 JARVIS</p>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.isStreaming && <span className="ml-2 inline-block w-2 h-2 bg-current rounded-full animate-pulse" />}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="glass border border-border px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="mb-6 space-y-2">
            <p className="text-xs font-bold text-foreground-muted uppercase">Suggested Questions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                'What should I do in Tokyo?',
                'Recommend restaurants',
                'How much will this cost?',
                'Any safety tips?',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                  }}
                  className="text-left text-sm px-3 py-2 rounded-lg glass border border-border/50 hover:border-primary/50 text-foreground-muted hover:text-primary transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input */}
        <form onSubmit={handleSend} className="glass rounded-xl border border-border p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask JARVIS anything about your trip..."
              className="flex-1 bg-background-tertiary border border-border/50 rounded-lg px-4 py-2 text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary/50 transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-2 bg-primary text-background font-bold rounded-lg hover:bg-primary-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? '...' : '→'}
            </button>
          </div>
        </form>

        {/* Footer Info */}
        <div className="text-center text-xs text-foreground-muted mt-6">
          <p>JARVIS is connected to your itinerary and can provide personalized recommendations</p>
        </div>
      </main>
    </div>
  );
}
