'use client';

import { getDoctors } from '@/lib/db';
import React, { useState, useEffect } from "react";

interface Doctor {
  user_id: number;
  name: string;
  doctor_info: string;
}

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  useEffect(() => {
    async function fetchDoctors() {
      const rawData: Record<string, any>[] = await getDoctors(); // API response type
      const formattedData: Doctor[] = rawData.map((item) => ({
        user_id: item.user_id, // Ensure field names match API response
        name: item.name,
        doctor_info: item.doctor_info ?? "No info available", // Handle missing data safely
      }));

      setDoctors(formattedData);
    }

    fetchDoctors();
  }, []);


  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div key={doctor.user_id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.doctor_info}</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded">Edit</button>
          </div>
        ))}
      </div>

      <button className="mt-6 px-4 py-2 bg-black text-white rounded">Add New Doctor</button>
    </div>
  );
}
