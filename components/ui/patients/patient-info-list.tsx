"use client"
import React, { useState } from "react";
import { UserType } from '@/lib/db';
import { useNotification } from '@/components/ui/notificationContext';

interface UserInfoModalProps {
    selectedUser: UserType;
    onClose: () => void;
    onUpdateUser: (user: UserType) => void;
}

const genders = [
    "",
    "Male",
    "Female",
    "Non-binary",
    "Other",
    "Prefer not to say",
];

const UserInfoModal: React.FC<UserInfoModalProps> = ({
    selectedUser,
    onClose,
    onUpdateUser
}) => {
    const { showNotification } = useNotification();

    const [form, setForm] = useState(selectedUser);

    // Function to change the information
    const updateUserInfo = async () => {
        try {
            onUpdateUser(form);
            const response = await fetch(`/api/user/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            if (response.ok) {
                showNotification({
                    message: 'Operation successful!',
                    type: 'success'
                });
            }
            const result = await response.json();
            console.log("edit information:", JSON.stringify(result));
        } catch (error) {
            showNotification({
                message: 'Operation failed',
                type: 'error'
            });
        }

    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">User NO. {selectedUser.user_id} (Editing)</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
                </div>

                {/* Editing information */}

                <div className="border p-4 mt-4 rounded-md bg-gray-100">
                    <div>
                        <label className="block mb-1 mt-4 font-bold">Name:</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 mt-4 font-bold">Email:</label>
                        <input
                            type="text"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 mt-4 font-bold">Birth Day:</label>
                        <input
                            type="date"
                            value={form.dob}
                            onChange={(e) => setForm({ ...form, dob: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 mt-4 font-bold">Gender:</label>
                        <select
                            value={form.gender}
                            onChange={(e) => setForm({ ...form, gender: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                        >
                            {(genders).map((val) => (
                                <option key={val} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 mt-4 font-bold">Phone Number:</label>
                        <input
                            type="text"
                            value={form.phone_number}
                            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 mt-4 font-bold">Address:</label>
                        <input
                            type="text"
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                </div>


                {/* Buttons */}
                <div className="mt-6 flex justify-between">
                    <button
                        className="px-3 py-1 bg-gray-200 text-black rounded"
                        onClick={onClose}
                    >
                        return
                    </button>
                    <button
                        className="px-3 py-1 bg-black text-white rounded"
                        onClick={updateUserInfo}
                    >
                        confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoModal;
