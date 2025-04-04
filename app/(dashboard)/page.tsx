import DoctorList from '@/components/ui/doctors/doctor-list';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main>
      <Suspense fallback={<h2>Loading...</h2>}>
        <DoctorList />
      </Suspense>
    </main>
  );
}
