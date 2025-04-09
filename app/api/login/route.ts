import { getUserInfo } from '@/lib/db';
import { setUserSession, getUserSession } from '@/lib/session';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const user = await getUserInfo(email, password);

    if (!user) {
        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    }

    console.log('Storing session:', { // Debug log
        id: user.user_id,
        name: user.name,
        role: user.role
    });

    await setUserSession({
        id: user?.user_id?.toString() || '',
        name: user.name,
        role: user.role // Double-check this exists
    });

    // Verify immediate readback
    const testRead = await getUserSession();
    console.log('Session test read:', testRead);

    return NextResponse.json({ success: true });
}
