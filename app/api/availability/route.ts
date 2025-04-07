// app/api/availability/route.ts
import { NextResponse } from 'next/server';
import { getAvailability } from '@/lib/db';
import { addAvailability, deleteAvailability } from '@/lib/actions';
import { getUserId } from '@/lib/session';

export async function GET() {
    try {
        const availability = await getAvailability(await getUserId());
        console.log('api', availability);

        return NextResponse.json(availability ?? []);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get available time' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const req = await request.json();
        await addAvailability(req, await getUserId());
        
        return NextResponse.json({ 
            success: true
          });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to add available time' }, { status: 500 });
      }
}

export async function PUT(request: Request) {
    try {
        const req = await request.json();
        await deleteAvailability(req, await getUserId());
        
        return NextResponse.json({ 
            success: true
          });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to delete available time' }, { status: 500 });
      }
}
