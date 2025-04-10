import PatientList from '@/components/ui/patients/patient-list';
import { Suspense } from 'react';
import { getUsers } from '@/lib/db';

export default async function Page() {
  const users = await getUsers();
  return (
    <main>
      <Suspense>
        <PatientList users={users}/>
      </Suspense>
    </main>
  );
}