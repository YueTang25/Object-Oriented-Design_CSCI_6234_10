import FacilitiesPage from '@/components/ui/facilities/facility-list';
import { Suspense } from 'react';
import { getFacilities } from '@/lib/db';

export default async function Page() {
    const facilities = await getFacilities();
    return (
        <main>
            <Suspense>
                <FacilitiesPage facilities={facilities}/>
            </Suspense>
        </main>
    );
}