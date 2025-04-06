import FacilitiesPage from '@/components/ui/facilities/facility-list';
import { Suspense } from 'react';
import { getFacilities } from '@/lib/db';

export default async function Page() {
    const facilities = await getFacilities();
    const rooms = [
        { clinic_id: 1, exam_id: 1, capability: "X-Ray" },
        { clinic_id: 2, exam_id: 2, capability: "Ultrasound" },
    ]
    return (
        <main>
            <Suspense fallback={<h2>Loading...</h2>}>
                <FacilitiesPage facilities={facilities} rooms={rooms}/>
            </Suspense>
        </main>
    );
}