'use client';

import { useState } from 'react';

type Availability = {
  day: string;
  startTime: string;
  endTime: string;
};

export default function AvailabilityScheduler() {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [form, setForm] = useState({ day: '', startTime: '', endTime: '' });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleAdd = () => {
    const { day, startTime, endTime } = form;
    if (day && startTime && endTime) {
      setAvailability([...availability, { day, startTime, endTime }]);
      setForm({ day: '', startTime: '', endTime: '' });
    }
  };

  const handleRemove = (indexToRemove: number) => {
    setAvailability(availability.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto mt-8">
        {/* Input Section */}
        <div className="flex space-x-2 mb-6">
          {/* Day Dropdown */}
          <select
            className="border px-3 py-2 rounded w-1/4"
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          {/* Start Time */}
          <select
            className="border px-3 py-2 rounded w-1/4"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          >
            <option value="">Start Time</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          {/* End Time */}
          <select
            className="border px-3 py-2 rounded w-1/4"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          >
            <option value="">End Time</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>

          <button onClick={handleAdd} className="bg-black text-white px-4 py-2 rounded">
            ADD
          </button>
        </div>

        {/* Weekly Grid */}
        <div className="grid grid-cols-5 gap-5 border-t border-l">
          {days.map((day) => (
            <div key={day} className="border-r border-b p-2 min-h-[150px]">
              <h3 className="font-semibold mb-2">{day}</h3>
              {availability.map((slot, index) =>
                slot.day === day ? (
                  <div key={index} className="bg-green-100 p-3 rounded mb-2">
                    <div className="text-sm font-medium">AVAILABLE</div>
                    <div className="text-sm">FROM {slot.startTime}</div>
                    <div className="text-sm">TO {slot.endTime}</div>
                    <button
                      onClick={() => handleRemove(index)}
                      className="mt-2 bg-black text-white px-2 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : null
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper: Generates time options in 30-minute intervals
function generateTimeOptions() {
  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
}
