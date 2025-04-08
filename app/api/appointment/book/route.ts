// app/api/appointments/route.ts
import { NextResponse } from 'next/server';
import { createAppointment } from '@/lib/actions';
import { getUserId } from '@/lib/session';

export async function POST(request: Request) {
    const patient_id = await getUserId();
    if (!patient_id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const req = await request.json();
        const result = await createAppointment(req, patient_id);

        return NextResponse.json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}