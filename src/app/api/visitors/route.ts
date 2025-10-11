import { NextRequest, NextResponse } from 'next/server';

// In-memory store (resets on server restart)
// For production, use Redis, Upstash, or any KV store
const activeVisitors = new Map<string, number>();

// Cleanup old visitors every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, timestamp] of activeVisitors.entries()) {
    // Remove if inactive for more than 2 minutes
    if (now - timestamp > 120000) {
      activeVisitors.delete(sessionId);
    }
  }
}, 300000);

export async function GET() {
  // Return current count
  return NextResponse.json({
    count: activeVisitors.size,
    timestamp: Date.now(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Update visitor timestamp
    activeVisitors.set(sessionId, Date.now());

    return NextResponse.json({
      success: true,
      count: activeVisitors.size,
      timestamp: Date.now(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    
    if (sessionId) {
      activeVisitors.delete(sessionId);
    }

    return NextResponse.json({
      success: true,
      count: activeVisitors.size,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
