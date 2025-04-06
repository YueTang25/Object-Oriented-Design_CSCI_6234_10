import FacilitiesPage from '@/components/ui/facilities/facility-list';
import { Suspense } from 'react';
import { FacilityType, getFacilities, getRooms } from '@/lib/db';

export default async function Page(clinic_id: number) {
    const facilities = await getFacilities();
    const rooms = await getRooms(clinic_id);
    return (
        <main>
            <Suspense fallback={<h2>Loading...</h2>}>
                <FacilitiesPage facilities={facilities} rooms={rooms}/>
            </Suspense>
        </main>
    );
}