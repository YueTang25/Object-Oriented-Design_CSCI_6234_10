"use client";
import FacilityRoomsModal from "@/components/ui/facilities/FacilityRoomsModal";
import React, { useState, useEffect } from "react";
import { FacilityType, RoomType } from '@/lib/db';
import Link from 'next/link';

export default async function FacilitiesPage({
    facilities,
    rooms,
}: {
    facilities: FacilityType[];
    rooms: RoomType[];
}) {
    const [selectedFacility, setSelectedFacility] = useState<FacilityType | null>(null);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Facilities</h1>

            {/* Facility List */}
            <div className="space-y-4">
                {facilities.map((facility) => (
                    <div key={facility.clinic_id} className="border p-4 rounded-md shadow">
                        <h2 className="text-lg font-semibold">{facility.location}</h2>
                        <button
                            className="mt-2 px-4 py-2 bg-black text-white rounded"
                            onClick={() => setSelectedFacility({ clinic_id: facility.clinic_id, location: facility.location })}
                        >
                            Manage Rooms
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal - Opens only when a facility is selected */}
            {selectedFacility && (
                <FacilityRoomsModal
                    facility={selectedFacility}
                    rooms={rooms}
                    onClose={() => setSelectedFacility(null)}
                />
            )}
        </div>
    );
}
