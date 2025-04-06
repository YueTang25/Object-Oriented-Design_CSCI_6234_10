import AvailabilityScheduler from '@/components/ui/appointment/add-time';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <main>
      <Suspense fallback={<h2>Loading...</h2>}>
        <AvailabilityScheduler />
      </Suspense>
    </main>
  );
}