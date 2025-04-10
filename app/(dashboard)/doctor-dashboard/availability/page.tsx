import AvailabilityScheduler from '@/components/ui/appointment/add-time';
import { Suspense } from 'react';
import { getAvailability } from '@/lib/db';
import { getUserId } from '@/lib/session';

export default async function Page() {
  const data = await getAvailability(await getUserId());
  return (
    <main>
      <Suspense>
        <AvailabilityScheduler initialData={data} />
      </Suspense>
    </main>
  );
}