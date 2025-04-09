"use client"
import React, { useState } from "react";
import { DoctorAvailabilityType, AppointmentType } from '@/lib/db';
import { specialties, locations } from '@/lib/staticData';
import { useNotification } from '@/components/ui/notificationContext';
import { deleteAppointment } from "@/lib/actions";

export default function BookAppointment({
    pastAppointmentsInitial,
    futureAppointmentsInitial
}: {
    pastAppointmentsInitial: AppointmentType[];
    futureAppointmentsInitial: AppointmentType[];
}) {
    const { showNotification } = useNotification();
    const { min, max, today } = getBookingDateRange();
    const [searchBy, setSearchBy] = useState("specialty");
    const [selectedValue, setSelectedValue] = useState("");
    const [date, setDate] = useState("");
    const [doctors, setDoctors] = useState<DoctorAvailabilityType[]>([]);
    const [pastAppointments, setPastAppointments] = useState<AppointmentType[]>(pastAppointmentsInitial);
    const [futureAppointments, setFutureAppointments] = useState<AppointmentType[]>(futureAppointmentsInitial);

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
                //only show 3 search information
                const filteredResults = results.data.filter((_: any, index: number) => index < 3);
                setDoctors(filteredResults);
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
                //only show 3 search information
                const filteredResults = results.data.filter((_: any, index: number) => index < 3);
                setDoctors(filteredResults);
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

            if (response.ok) {
                showNotification({
                    message: 'Operation successful!',
                    type: 'success'
                });
                const result = await response.json();
                setDoctors((prev) =>
                    prev.filter(
                        (doctor) =>
                            doctor.doctor_id !== appointment.doctor_id ||
                            doctor.location !== appointment.location ||
                            doctor.specialty !== appointment.specialty
                    )
                );
                setFutureAppointments((prev) =>
                    [...prev, result.data[0]].sort(
                        (a, b) =>
                            new Date(`${a.date}T${a.start_time}`).getTime() -
                            new Date(`${b.date}T${b.start_time}`).getTime()
                    )
                );
            }
        } catch (error) {
            console.error('Booking error:', error);
            showNotification({
                message: 'Operation failed',
                type: 'error'
            });
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

            if (response.ok) {
                showNotification({
                    message: 'Operation successful!',
                    type: 'success'
                });
                setFutureAppointments((pre) =>
                    futureAppointments.filter(
                        (pre) => pre.appointment_id !== appointment.appointment_id
                    )
                );
            }
            const result = await response.json();
            console.log("book information:", JSON.stringify(result));
        } catch (error) {
            console.error('Canceling error:', error);
            showNotification({
                message: 'Operation failed',
                type: 'error'
            });
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