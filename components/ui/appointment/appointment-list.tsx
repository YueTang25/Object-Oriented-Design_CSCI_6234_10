"use client"
import React, { useState } from "react";
import { AppointmentType } from '@/lib/db';

export default function LookAppointment({
    todayAppointmentsInitial,
    futureAppointmentsInitial
}: {
    todayAppointmentsInitial: AppointmentType[];
    futureAppointmentsInitial: AppointmentType[];
}) {
    const [todayAppointments, setTodayAppointments] = useState<AppointmentType[]>(todayAppointmentsInitial);
    const [futureAppointments, setFutureAppointments] = useState<AppointmentType[]>(futureAppointmentsInitial);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-6">Schedule</h1>

            {/* Appointments */}
            <h2 className="text-xl font-semibold mb-4">Today</h2>
            <div className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                    <div key={appointment.appointment_id | index} className="border p-4 rounded-md shadow-sm">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-bold mb-2">Today Appointment</h3>
                            <p className="text-sm text-gray-600">
                                No. {appointment.appointment_id} Date: {appointment.date} Start Time: {appointment.start_time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="text-xl font-semibold mb-4">Future</h2>
            <div className="space-y-4">
                {futureAppointments.map((appointment, index) => (
                    <div key={appointment.appointment_id | index} className="border p-4 rounded-md shadow-sm">
                        <div className="bg-white p-4 rounded shadow">
                            <h3 className="text-lg font-bold mb-2">Future Appointment</h3>
                            <p className="text-sm text-gray-600">
                                No. {appointment.appointment_id} Date: {appointment.date} Start Time: {appointment.start_time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
