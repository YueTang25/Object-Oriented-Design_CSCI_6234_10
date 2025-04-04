import PatientList from '@/components/ui/patients/patient-list';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<h2>Loading...</h2>}>
        <PatientList />
      </Suspense>
    </main>
  );
}