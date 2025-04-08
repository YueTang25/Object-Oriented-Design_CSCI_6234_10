"use client";
import UserInfoModal from "@/components/ui/patients/patient-info-list";
import { UserType } from '@/lib/db';
import React, { useState } from "react";

export default function PatientList({
  users
}: {
  users: UserType[];
}) {

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage All Users</h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.user_id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">User Id: {user.user_id}</h2>
            <p className="text-gray-600">Name: {user.name}</p>
            <p className="text-gray-600">Role: {user.role}</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded"
              onClick={() => setSelectedUser(user)}>Edit</button>
          </div>
        ))}
      </div>
      <button className="mt-6 px-4 py-2 bg-black text-white rounded">Add New Patient</button>

      {/* Modal - Opens only when a user is selected */}
      {selectedUser && (
        <UserInfoModal
          selectedUser={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
