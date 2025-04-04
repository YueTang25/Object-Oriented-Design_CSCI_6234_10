"use client"
import React, { useState } from "react";

interface Room {
    id: number;
    name: string;
    capabilities: string[];
}

interface FacilityRoomsModalProps {
    facilityName: string;
    rooms: Room[];
    onClose: () => void;
}

const FacilityRoomsModal: React.FC<FacilityRoomsModalProps> = ({
    facilityName,
    rooms,
    onClose,
}) => {
    const [roomList, setRoomList] = useState(rooms);
    const [newRoomName, setNewRoomName] = useState("");
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [capability, setCapability] = useState("");

    // Function to add a new room
    const addRoom = () => {
        if (newRoomName.trim()) {
            const newRoom = {
                id: roomList.length + 1,
                name: newRoomName,
                capabilities: [],
            };
            setRoomList([...roomList, newRoom]);
            setNewRoomName("");
        }
    };

    // Function to update room capabilities
    const addCapability = () => {
        if (editingRoom && capability.trim()) {
            const updatedRooms = roomList.map((room) =>
                room.id === editingRoom.id
                    ? { ...room, capabilities: [...room.capabilities, capability] }
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
                    <h2 className="text-xl font-bold">{facilityName} Exam Rooms</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
                </div>

                {/* Room List */}
                <div className="space-y-4">
                    {roomList.map((room) => (
                        <div key={room.id} className="border p-4 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold">{room.name}</h3>
                            <p className="text-gray-600">Capabilities: {room.capabilities.join(", ") || "None"}</p>
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
                        <h3 className="text-lg font-semibold">{editingRoom.name} (Editing)</h3>
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
                            Add
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
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FacilityRoomsModal;
