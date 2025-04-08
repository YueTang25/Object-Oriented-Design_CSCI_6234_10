import BookAppointment from '@/components/ui/appointment/book-time';
import { Suspense } from 'react';
import { getAppointmentByPatientId } from '@/lib/db';
import { getUserId } from '@/lib/session';

export default async function Page() {
  const [pastAppointmentsInitial, futureAppointmentsInitial] = await getAppointmentByPatientId(await getUserId());
  return (
    <main>
      <Suspense>
        <BookAppointment 
        pastAppointmentsInitial={pastAppointmentsInitial}
        futureAppointmentsInitial={futureAppointmentsInitial}/>
      </Suspense>
    </main>
  );
}