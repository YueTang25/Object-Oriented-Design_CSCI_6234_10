import { setUserSession, validateSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await validateSession();

  if (!user) redirect('/login');

  // Handle missing role
  if (!user.role) {
    await setUserSession({ id: user.id, name: user.name }); // Clear invalid session
    redirect('/login');
  }

  switch (user.role) {
    case 'admin':
      redirect('/admin-dashboard');
    case 'doctor':
      redirect('/doctor-dashboard');
    default:
      redirect('/patient-dashboard');
  }
}
