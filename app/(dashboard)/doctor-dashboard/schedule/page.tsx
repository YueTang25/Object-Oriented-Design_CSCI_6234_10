import LookAppointment from '@/components/ui/appointment/appointment-list';
import { Suspense } from 'react';
import { getAppointmentByDoctorId } from '@/lib/db';
import { getUserId } from '@/lib/session';

export default async function Page() {
  const [todayAppointmentsInitial, futureAppointmentsInitial] = await getAppointmentByDoctorId(await getUserId());
  return (
    <main>
      <Suspense>
        <LookAppointment 
        todayAppointmentsInitial={todayAppointmentsInitial}
        futureAppointmentsInitial={futureAppointmentsInitial}/>
      </Suspense>
    </main>
  );
}