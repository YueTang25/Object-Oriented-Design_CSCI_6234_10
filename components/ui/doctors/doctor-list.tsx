import { getDoctors } from '@/lib/db';

export default async function DoctorList() {
  const doctors = await getDoctors();
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>

      <div className="space-y-4">
        {doctors.map((doctor) => (
          <div key={doctor.user_id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.doctor_info}</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded">Edit</button>
          </div>
        ))}
      </div>

      <button className="mt-6 px-4 py-2 bg-black text-white rounded">Add New Doctor</button>
    </div>
  );
}
