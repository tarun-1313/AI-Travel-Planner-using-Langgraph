import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    // TODO: Connect to Python LangGraph backend
    // For now, return mock responses based on keywords
    const response = getMockResponse(message);

    return NextResponse.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  const responses: { [key: string]: string } = {
    'what should i do': 'Based on your 3-day itinerary, I recommend: Day 1 - Visit Senso-ji Temple and enjoy street food in Asakusa. Day 2 - Explore Shibuya Crossing and Meiji Shrine. Day 3 - Visit Tokyo Tower and experience local dining before your flight.',
    'recommend restaurants': 'I\'ve identified 12 top-rated restaurants within your budget. The Michelin-starred sushi restaurant on Dec 16 evening is highly recommended for an authentic experience.',
    'how much will this cost': 'Your current estimated budget breakdown is: Flights $800, Accommodation $600, Food $400, Activities $300, Transport $200. Total: $2,300. You have $540 remaining.',
    'any safety tips': 'Tokyo is very safe! Key tips: Use the excellent public transportation system, keep copies of your passport, inform your bank of travel dates, and have the US Embassy contact info saved.',
    'what\'s the weather': 'Dec 15-17 forecast: 50-55°F with possible rain on Dec 17. I\'ve already updated your packing list with weather-appropriate items.',
    'visa information': 'Good news! As a US citizen, you\'re exempt from visa requirements for up to 90 days. Just ensure your passport is valid for 6+ months and have your return ticket ready.',
  };

  // Find the best matching response
  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key.split(' ')[0])) {
      return value;
    }
  }

  return 'That\'s a great question! Based on your trip details, I recommend exploring the local neighborhoods and trying authentic Japanese cuisine. Would you like specific suggestions for activities or restaurants?';
}
