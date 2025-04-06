'use client'

import { useState } from "react";

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState("");
  const [specialty, setSpecialty] = useState("Heart");
  
  const doctors = [
    { name: "Doctor X", specialty: "XXXX", availability: "XXXX-XXXX", facility: "Location X" },
    { name: "Doctor Y", specialty: "YYYY", availability: "YYYY-YYYY", facility: "Location Y" },
    { name: "Doctor Z", specialty: "YYYY", availability: "YYYY-YYYY", facility: "Location Y" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Book an Appointment</h1>
          <button className="bg-black text-white px-4 py-2 rounded">Logout</button>
        </header>
        
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <input 
            type="date" 
            className="border p-2 rounded w-40"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <select className="border p-2 rounded w-40">
            <option>Specialty</option>
          </select>
          <select className="border p-2 rounded w-40" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option>Heart</option>
          </select>
          <button className="bg-black text-white px-4 py-2 rounded">Search</button>
        </div>
        
        <h2 className="text-lg font-semibold mb-4">Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {doctors.map((doc, index) => (
            <div key={index} className="bg-gray-200 p-4 rounded-lg text-center">
              <h3 className="font-bold">{doc.name}</h3>
              <p>Specialty: {doc.specialty}</p>
              <p>Availability: {doc.availability}</p>
              <p>Facility: {doc.facility}</p>
              <button className="bg-black text-white px-4 py-2 rounded mt-2">Book</button>
            </div>
          ))}
        </div>
        
        <h2 className="text-lg font-semibold mb-4">Appointments</h2>
        <div className="bg-gray-200 p-4 rounded-lg mb-4">
          <h3 className="font-bold">Past Appointment</h3>
          <p>Body text for whatever you'd like to say.</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="font-bold">Future Appointment</h3>
          <p>Body text for whatever you'd like to say.</p>
          <button className="border px-4 py-2 mt-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}
