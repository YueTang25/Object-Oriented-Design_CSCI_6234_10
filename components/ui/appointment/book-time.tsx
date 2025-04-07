"use client"
import React, { useState } from "react";
import { DoctorAvailabilityType } from '@/lib/db';

const specialties = [
    "",
    "Family medicine",
    "Dermatology",
    "Obstetrics and gynaecology",
    "Oncologist",
    "Internal medicine",
];

const locations = ["", "dc", "maryland", "virginia"];

export default function BookAppointment() {
    const [searchBy, setSearchBy] = useState("specialty");
    const [selectedValue, setSelectedValue] = useState("");
    const [date, setDate] = useState("");
    const [doctors, setDoctors] = useState<DoctorAvailabilityType[]>([]);

    const handleSearch = async () => {
        if (searchBy && selectedValue) {
            console.log("searchBy"+searchBy+"selectedValue"+selectedValue)
            if (searchBy == "specialty") {
                const specialty = selectedValue;
                const response = await fetch(`/api/appointment/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ date, specialty }),
                });
                const results = await response.json();
                setDoctors(results.data);
            } else {
                const location = selectedValue;
                const response = await fetch(`/api/appointment/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ date, location }),
                });
                const results = await response.json();
                setDoctors(results.data);
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6">Book an Appointment</h1>

            {/* Search Filters */}
            <div className="flex items-center space-x-4 mb-6">
                <input
                    value={date}
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    className="px-4 py-2 border rounded"
                    placeholder="MM/DD/YY"
                />

                <span className="font-semibold">Search By</span>

                <select
                    value={searchBy}
                    onChange={(e) => {
                        setSearchBy(e.target.value);
                        setSelectedValue("");
                    }}
                    className="px-4 py-2 border rounded"
                >
                    <option value="specialty">Specialty</option>
                    <option value="location">Location</option>
                </select>

                <select
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="px-4 py-2 border rounded"
                >
                    {(searchBy === "specialty" ? specialties : locations).map((val) => (
                        <option key={val} value={val}>
                            {val}
                        </option>
                    ))}
                </select>

                <button onClick={handleSearch} className="px-6 py-2 bg-black text-white rounded">Search</button>
            </div>

            {/* Results */}
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {doctors.map((doc, idx) => (
                    <div
                        key={idx}
                        className="border p-4 rounded shadow bg-white text-sm"
                    >
                        <h3 className="text-lg font-semibold mb-2">{doc.name}</h3>
                        <p>Specialty: {doc.specialty}</p>
                        <p>Start Time: {doc.start_time}</p>
                        <p>End Time: {doc.end_time}</p>
                        <p>Location: {doc.location}</p>
                        <button className="mt-4 px-4 py-2 bg-black text-white rounded">
                            Book
                        </button>
                    </div>
                ))}
            </div>

            {/* Appointments */}
            <h2 className="text-xl font-semibold mb-4">Appointments</h2>
            <div className="space-y-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold mb-2">Past Appointment</h3>
                    <p className="text-sm text-gray-600">
                        Body text for whatever you'd like to say. Add main takeaway points,
                        quotes, anecdotes, or even a very very short story.
                    </p>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-bold mb-2">Future Appointment</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        Body text for whatever you'd like to say. Add main takeaway points,
                        quotes, anecdotes, or even a very very short story.
                    </p>
                    <button className="px-4 py-2 bg-gray-300 text-black rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
}
