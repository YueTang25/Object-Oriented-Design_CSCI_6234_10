import FacilitiesPage from '@/components/ui/facilities/facility-list';
import { Suspense } from 'react';

export default function Page() {
    return (
        <main>
            <Suspense fallback={<h2>Loading...</h2>}>
                <FacilitiesPage />
            </Suspense>
        </main>
    );
}