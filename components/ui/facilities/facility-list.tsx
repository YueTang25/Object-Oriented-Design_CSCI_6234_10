"use client";
import FacilityRoomsModal from "@/components/ui/facilities/facility-rooms-modal";
import React, { useState, useEffect } from "react";
import { FacilityType, RoomType } from '@/lib/db';

export default async function FacilitiesPage({
    facilities
}: {
    facilities: FacilityType[];
}) {
    const [selectedFacility, setSelectedFacility] = useState<FacilityType | null>(null);
    const [selectedrooms, setSelectedRooms] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState(false);

    const handleViewRooms = async (facility: FacilityType) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/rooms/${facility.clinic_id}`);
            const data: RoomType[] = await res.json();
        
            setSelectedRooms(data);
            setSelectedFacility(facility);
          } catch (err) {
            console.error("Failed to fetch rooms", err);
            setSelectedRooms([]);
          } finally {
            setLoading(false);
          }
    };

    return (
        
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Facilities</h1>

            {/* Facility List */}
            <div className="space-y-4">
                {facilities.map((facility, index) => (
                    <div key={facility.clinic_id || index} className="border p-4 rounded-lg shadow-sm bg-white">
                        <h2 className="text-xl font-semibold">clinic id: {facility.clinic_id}</h2>
                        <p className="text-gray-600"> location: {facility.location}</p>
                        <button
                            className="mt-2 px-4 py-2 bg-black text-white rounded"
                            onClick={() => handleViewRooms(facility)}
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
                    rooms={selectedrooms}
                    onClose={() => setSelectedFacility(null)}
                />
            )}
        </div>
    );
}
