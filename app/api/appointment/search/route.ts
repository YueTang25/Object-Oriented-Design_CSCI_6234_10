// app/api/appointment/search/route.ts
import { NextResponse } from 'next/server';
import { searchAvailability } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const req = await request.json();
        console.log("in"+JSON.stringify(req))
        const data = await searchAvailability(req);
        console.log("back1"+JSON.stringify(data))
        return NextResponse.json({ 
            success: true,
            data: data
          });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to search available time' }, { status: 500 });
      }
}
