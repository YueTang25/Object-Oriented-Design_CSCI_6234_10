"use client"
import React, { useState } from "react";
import { FacilityType, RoomType } from '@/lib/db';

interface FacilityRoomsModalProps {
    facility: FacilityType;
    rooms: RoomType[];
    onClose: () => void;
}

const FacilityRoomsModal: React.FC<FacilityRoomsModalProps> = ({
    facility,
    rooms,
    onClose,
}) => {
    // const rooms = await getRooms(facility.clinic_id)
    const [roomList, setRoomList] = useState<RoomType[]>(rooms);
    const [newRoomName, setNewRoomName] = useState("");
    const [editingRoom, setEditingRoom] = useState<RoomType | null>(null);
    const [capability, setCapability] = useState("");

    // Function to add a new room
    const addRoom = () => {
        if (newRoomName.trim()) {
            const newRoom = {
                clinic_id: facility.clinic_id,
                exam_id: 0,
                capability: "",
            };
            setRoomList([... roomList, newRoom]);
            setNewRoomName("");
        }
    };

    // Function to update room capabilities
    const addCapability = () => {
        if (editingRoom && capability.trim()) {
            const updatedRooms = roomList.map((room) =>
                room.clinic_id === editingRoom.clinic_id
                    ? { ...room, capability: capability }
                    : room
            );
            setRoomList(updatedRooms);
            setCapability("");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{facility.clinic_id} Exam Rooms</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
                </div>

                {/* Room List */}
                <div className="space-y-4">
                    {roomList.map((room) => (
                        <div key={room.exam_id} className="border p-4 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold">{room.capability}</h3>
                            <button
                                className="mt-2 px-3 py-1 bg-gray-200 rounded"
                                onClick={() => setEditingRoom(room)}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>

                {/* Editing Room */}
                {editingRoom && (
                    <div className="border p-4 mt-4 rounded-md bg-gray-100">
                        <h3 className="text-lg font-semibold">{editingRoom.exam_id} (Editing)</h3>
                        <input
                            type="text"
                            placeholder="Capability"
                            value={capability}
                            onChange={(e) => setCapability(e.target.value)}
                            className="border p-2 rounded w-full mt-2"
                        />
                        <button
                            className="mt-2 px-3 py-1 bg-gray-200 rounded"
                            onClick={addCapability}
                        >
                            add
                        </button>
                    </div>
                )}

                {/* Buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        className="px-3 py-1 border rounded"
                        onClick={addRoom}
                    >
                        Add Room
                    </button>
                    <button
                        className="px-3 py-1 bg-black text-white rounded"
                        onClick={onClose}
                    >
                        close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FacilityRoomsModal;
