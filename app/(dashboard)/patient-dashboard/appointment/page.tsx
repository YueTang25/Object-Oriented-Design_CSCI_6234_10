import BookAppointment from '@/components/ui/appointment/book-time';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <main>
      <Suspense>
        <BookAppointment />
      </Suspense>
    </main>
  );
}