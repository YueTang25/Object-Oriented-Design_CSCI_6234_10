// /app/api/rooms/[clinicId]/route.ts
import { NextResponse } from 'next/server';
import { getRooms } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { clinicId: string } }) {
    const { clinicId } = params;
    const data = await getRooms(Number(clinicId));
    return NextResponse.json(data ?? []);
}