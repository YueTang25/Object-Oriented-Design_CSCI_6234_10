"use client";

import FacilityRoomsModal from "@/components/ui/facilities/FacilityRoomsModal";
import React, { useState, useEffect } from "react";

interface Facility {
    id: number;
    name: string;
    rooms: { id: number; name: string; capabilities: string[] }[];
}

export default function FacilitiesPage() {
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const facilities: Facility[] = [
        {
            id: 1,
            name: "Facility A",
            rooms: [
                { id: 1, name: "Room A1", capabilities: ["X-Ray", "MRI"] },
                { id: 2, name: "Room A2", capabilities: ["Ultrasound"] },
            ],
        },
        {
            id: 2,
            name: "Facility B",
            rooms: [
                { id: 3, name: "Room B1", capabilities: ["CT Scan"] },
                { id: 4, name: "Room B2", capabilities: ["Blood Test"] },
            ],
        },
    ];

    if (!isClient) return null; // Prevent hydration mismatch

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Manage Facilities</h1>

            {/* Facility List */}
            <div className="space-y-4">
                {facilities.map((facility) => (
                    <div key={facility.id} className="border p-4 rounded-md shadow">
                        <h2 className="text-lg font-semibold">{facility.name}</h2>
                        <button
                            className="mt-2 px-4 py-2 bg-black text-white rounded"
                            onClick={() => setSelectedFacility(facility)}
                        >
                            Manage Rooms
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal - Opens only when a facility is selected */}
            {selectedFacility && (
                <FacilityRoomsModal
                    facilityName={selectedFacility.name}
                    rooms={selectedFacility.rooms}
                    onClose={() => setSelectedFacility(null)}
                />
            )}
        </div>
    );
}
