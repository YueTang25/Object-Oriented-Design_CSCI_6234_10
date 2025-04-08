import { DoctorType } from '@/lib/db';

export default async function DoctorList({
  doctors
}: {
  doctors: DoctorType[];
}) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Doctors</h1>

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
