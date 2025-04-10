"use client";
import DoctorLicensesModal from "@/components/ui/doctors/doctor-liscense-modal";
import { DoctorType, LicenseType } from '@/lib/db';
import React, { useState } from "react";

export default function DoctorList({
  doctors
}: {
  doctors: DoctorType[];
}) {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);
  const [selectedLicenses, setSelectedLicenses] = useState<LicenseType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleViewLicenses = async (doctor: DoctorType) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/license/${doctor.doctor_id}`);
      const data: LicenseType[] = await res.json();

      setSelectedLicenses(data);
      setSelectedDoctor(doctor);
    } catch (err) {
      console.error("Failed to fetch licenses", err);
      setSelectedLicenses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Doctors</h1>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div key={doctor.user_id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p className="text-gray-600">NO. {doctor.doctor_id}</p>
            <p className="text-gray-600">{doctor.doctor_info}</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded"
            onClick={() => handleViewLicenses(doctor)}>Edit</button>
          </div>
        ))}
      </div>

      <button className="mt-6 px-4 py-2 bg-black text-white rounded">Add New Doctor</button>

      {/* Modal - Opens only when a doctor is selected */}
      {selectedDoctor && (
        <DoctorLicensesModal
          doctor={selectedDoctor}
          Licenses={selectedLicenses}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
