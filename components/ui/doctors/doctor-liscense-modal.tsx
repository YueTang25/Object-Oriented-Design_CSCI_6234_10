"use client"
import React, { useState } from "react";
import { DoctorType, LicenseType } from '@/lib/db';
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
    const [licenseList, setLicenseList] = useState<LicenseType[]>(Licenses);
    const [specialty, setSpecialty] = useState("");
    const [location, setLocation] = useState("");

    // Function to add a license
    const addLicense = async () => {
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
        }
    };

    // Function to delete a license
    const deleteLicense = async (license: LicenseType, indexToRemove: number) => {
        console.log("license:", license);
        const response = await fetch(`/api/license`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(license),
        });
        setLicenseList(licenseList.filter((_, i) => i !== indexToRemove));
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
                    <h3 className="text-lg font-semibold">new license (Adding)</h3>
                    <input
                        type="text"
                        placeholder="Specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        className="border p-2 rounded w-full mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border p-2 rounded w-full mt-2"
                    />
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
