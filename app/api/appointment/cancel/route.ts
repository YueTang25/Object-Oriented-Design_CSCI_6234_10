// app/api/availability/route.ts
import { NextResponse } from 'next/server';
import { deleteAppointment } from '@/lib/actions';
import { getUserId } from '@/lib/session';

export async function PUT(request: Request) {
    try {
        const req = await request.json();
        await deleteAppointment(req, await getUserId());
        
        return NextResponse.json({ 
            success: true
          });
      } catch (error) {
        return NextResponse.json({ error: 'Failed to delete available time' }, { status: 500 });
      }
}