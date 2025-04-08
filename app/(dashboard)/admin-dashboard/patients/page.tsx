import PatientList from '@/components/ui/patients/patient-list';
import { Suspense } from 'react';
import { getPatients } from '@/lib/db';

export default async function Page() {
  const patients = await getPatients();
  return (
    <main>
      <Suspense>
        <PatientList patients={patients}/>
      </Suspense>
    </main>
  );
}