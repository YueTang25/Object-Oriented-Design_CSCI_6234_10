// app/api/rooms/route.ts
import { NextResponse } from 'next/server';
import { updateUserInfo } from '@/lib/actions';

export async function POST(request: Request) {
  try {
    const req = await request.json();
    await updateUserInfo(req);

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}