import DoctorList from '@/components/ui/doctors/doctor-list';
import { Suspense } from 'react';
import { getDoctors } from '@/lib/db';

export default async function Page() {
  const doctors = await getDoctors();
  return (
    <main>
      <Suspense>
        <DoctorList doctors={doctors}/>
      </Suspense>
    </main>
  );
}
