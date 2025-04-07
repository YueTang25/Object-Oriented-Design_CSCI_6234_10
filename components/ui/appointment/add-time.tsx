'use client';

import { useState } from 'react';
import { AvailabilityType } from '@/lib/db';

export default function AvailabilityScheduler({ initialData }: { initialData: AvailabilityType[] }) {
  const [availability, setAvailability] = useState<AvailabilityType[]>(initialData);
  const [form, setForm] = useState({ day: '', start_time: '', end_time: '' });
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleAdd = async () => {
    const { day, start_time, end_time } = form;
    const date = getNextWeekDate(day)
    if (day && start_time && end_time) {
      await fetch(`/api/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, day, start_time, end_time }),
      });
      setAvailability([...availability, { date, day, start_time, end_time }]);
      setForm({ day: '', start_time: '', end_time: '' });
    }
  };

  const handleRemove = async (indexToRemove: number) => {
    const deleteAvailability = availability[indexToRemove];
    await fetch(`/api/availability`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteAvailability),
    });
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
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
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
            value={form.end_time}
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
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
                    <div className="text-sm">FROM {slot.start_time}</div>
                    <div className="text-sm">TO {slot.end_time}</div>
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
      times.push(`${hour}:${minute}:00`);
    }
  }
  return times;
}

//dateUtils
// utils/dateUtils.ts
export function getNextWeekDate(day: string) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)

  // Calculate days until next Monday
  let daysUntilMonday = (1 - dayOfWeek + 7) % 7;
  daysUntilMonday = daysUntilMonday === 0 ? 7 : daysUntilMonday; // Handle Sunday

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Generate Monday-Friday dates
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + daysUntilMonday + i);

    const dateString = date.toISOString().split('T')[0];
    const dayName = days[date.getDay()];
    if (day == dayName) {
      return dateString;
    }
  }
  return ""
}