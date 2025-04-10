import { createPatient } from '@/lib/actions';
import { setUserSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {

    const res = await createPatient(await req.json())

    if(res.data){
        const user = res.data
        await setUserSession({
            id: user.user_id?.toString() || '',
            name: user.name,
            role: "patient" 
        });
    }

    return NextResponse.json({ success: true });
}
