'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type UserSession = {
    id: string;
    role?: string; // Make role optional
};

// export async function setUserSession(user: { id: string; role: string }) {
//     (await cookies()).set('session', JSON.stringify(user), { httpOnly: true });
// }

export async function setUserSession(user: { id: string; role?: string }) {
    (await cookies()).set('session', JSON.stringify(user), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 // 1 day
    });
}


export async function getUserSession(): Promise<UserSession | null> {
    const cookie = (await cookies()).get('session')?.value;
    return cookie ? JSON.parse(cookie) : null;
}

export async function getUserId() {
    const user = await getUserSession();
    return user?.id ? Number(user.id) : 0;
}

export async function clearSession() {
    (await cookies()).delete('session');
    redirect('/login');
}

export async function validateSession() {
    const user = await getUserSession();
    if (!user?.id) {
        redirect('/login');
    }
    return user;
}
