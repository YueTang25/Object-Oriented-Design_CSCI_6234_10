"use client"
import React, { useState } from "react";
import { DoctorAvailabilityType, AppointmentType } from '@/lib/db';

const specialties = [
    "",
    "Family medicine",
    "Dermatology",
    "Obstetrics and gynaecology",
    "Oncologist",
    "Internal medicine",
];

const locations = ["", "dc", "maryland", "virginia"];

export default function BookAppointment({
    pastAppointmentsInitial,
    futureAppointmentsInitial
}: {
    pastAppointmentsInitial: AppointmentType[];
    futureAppointmentsInitial: AppointmentType[];
}) {

    const { min, max, today } = getBookingDateRange();
    const [searchBy, setSearchBy] = useState("specialty");
    const [selectedValue, setSelectedValue] = useState("");
    const [date, setDate] = useState("");
    const [doctors, setDoctors] = useState<DoctorAvailabilityType[]>([]);
    const [pastAppointments, setPastAppointments] = useState<AppointmentType[]>(pastAppointmentsInitial);
    const [futureAppointments, setFutureAppointments] = useState<AppointmentType[]>(futureAppointmentsInitial);
    console.log("page" + JSON.stringify(pastAppointments) + JSON.stringify(futureAppointments))

    const handleSearch = async () => {
        if (searchBy && selectedValue) {
            console.log("searchBy" + searchBy + "selectedValue" + selectedValue)
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

    const handleBookAppointment = async (appointment: DoctorAvailabilityType) => {
        try {
            const response = await fetch('/api/appointment/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doctor_id: appointment.doctor_id,
                    date: appointment.date,
                    start_time: appointment.start_time,
                    duration: "00:30:00",
                    specialty: appointment.specialty,
                    location: appointment.location
                }),
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            const result = await response.json();
            console.log("book information:", JSON.stringify(result));
            alert(`Appointment booked!`);
            window.location.reload();
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to book appointment. Please try again.');
        }
    };

    const handleCancelAppointment = async (appointment: AppointmentType) => {
        try {
            const response = await fetch('/api/appointment/cancel', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appointment_id: appointment.appointment_id
                }),
            });

            if (!response.ok) {
                throw new Error('Canceling failed');
            }

            const result = await response.json();
            console.log("book information:", JSON.stringify(result));
            alert(`Appointment canceled!`);
            window.location.reload();
        } catch (error) {
            console.error('Canceling error:', error);
            alert('Failed to cancel appointment. Please try again.');
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
                    min={min}
                    max={max}
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
                        <button className="mt-4 px-4 py-2 bg-black text-white rounded"
                            onClick={() => handleBookAppointment(doc)}>
                            Book
                        </button>
                    </div>
                ))}
            </div>

            {/* Appointments */}
            <h2 className="text-xl font-semibold mb-4">Appointments</h2>
            <div className="space-y-4">
                {pastAppointments.map((appointment, index) => (
                    <div key={appointment.appointment_id | index} className="border p-4 rounded-md shadow-sm">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-bold mb-2">Past Appointment</h3>
                            <p className="text-sm text-gray-600">
                                No. {appointment.appointment_id} Date: {appointment.date} Start Time: {appointment.start_time}
                            </p>
                        </div>
                    </div>
                ))}
                {futureAppointments.map((appointment, index) => (
                    <div key={appointment.appointment_id | index} className="border p-4 rounded-md shadow-sm">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-bold mb-2">Future Appointment</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                No. {appointment.appointment_id} Date: {appointment.date} Start Time: {appointment.start_time}
                            </p>
                            <button className="px-4 py-2 bg-gray-300 text-black rounded"
                                onClick={() => handleCancelAppointment(appointment)}>Cancel</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function getBookingDateRange() {
    const today = new Date();

    // Calculate end 
    const end = new Date(today);
    end.setDate(today.getDate() + 6);//patient can only book within a week
    end.setHours(23, 59, 59, 999);

    // Format as YYYY-MM-DD for input[type="date"]
    const format = (date: Date) => date.toISOString().split('T')[0];

    return {
        min: format(today),
        max: format(end),
        today: format(today)
    };
}