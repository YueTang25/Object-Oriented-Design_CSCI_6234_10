"use client"
import React, { useState } from "react";
import { DoctorType, LicenseType } from '@/lib/db';
import { specialties, locations } from '@/lib/staticData';
import { useNotification } from '@/components/ui/notificationContext';
interface DoctorLicensesModalProps {
    doctor: DoctorType;
    Licenses: LicenseType[];
    onClose: () => void;
}

const DoctorLicensesModal: React.FC<DoctorLicensesModalProps> = ({
    doctor,
    Licenses,
    onClose,
}) => {
    const { showNotification } = useNotification();

    const [licenseList, setLicenseList] = useState<LicenseType[]>(Licenses);
    const [specialty, setSpecialty] = useState("");
    const [location, setLocation] = useState("");

    // Function to add a license
    const addLicense = async () => {
        try {
            if (specialty && location) {
                const newLicense = {
                    doctor_id: doctor.doctor_id,
                    specialty: specialty,
                    location: location,
                };
                const response = await fetch(`/api/license`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newLicense),
                });
                await response.json();
                setLicenseList([...licenseList, newLicense]);
                setSpecialty("");
                setLocation("");
                if (response.ok) {
                    showNotification({
                        message: 'Operation successful!',
                        type: 'success'
                    });
                }
            }
        } catch (error) {
            showNotification({
                message: 'Operation failed',
                type: 'error'
            });
        }
    };

    // Function to delete a license
    const deleteLicense = async (license: LicenseType, indexToRemove: number) => {
        try {
            const response = await fetch(`/api/license`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(license),
            });
            setLicenseList(licenseList.filter((_, i) => i !== indexToRemove));
            if (response.ok) {
                showNotification({
                    message: 'Operation successful!',
                    type: 'success'
                });
            }
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
                    <h2 className="text-xl font-bold">Doctor NO. {doctor.doctor_id}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
                </div>

                {/* License List */}
                <div className="space-y-4">
                    {licenseList.map((license, index) => (
                        <div key={index} className="border p-4 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold">Specialty: {license.specialty} Location: {license.location}</h3>
                            <button
                                className="mt-2 px-3 py-1 bg-gray-200 rounded"
                                onClick={() => deleteLicense(license, index)}
                            >
                                delete
                            </button>
                        </div>
                    ))}
                </div>

                {/* Adding License */}

                <div className="border p-4 mt-4 rounded-md bg-gray-100">
                    <h3 className="mb-3 text-lg font-semibold">new license (Adding)</h3>
                    <div className="mb-3">
                        <label className="block mb-2 text-base font-medium text-gray-700">Specialty</label>
                        <select
                            value={specialty}
                            onChange={(e) => setSpecialty(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >
                            {specialties.map((val) => (
                                <option key={val} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-base font-medium text-gray-700">Location</label>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >
                            {locations.map((val) => (
                                <option key={val} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
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
                            onClick={addLicense}
                        >
                            confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorLicensesModal;
