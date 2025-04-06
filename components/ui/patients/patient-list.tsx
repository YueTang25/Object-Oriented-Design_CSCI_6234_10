import { getPatients } from '@/lib/db';

export default async function PatientList() {

  const patients = await getPatients();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Patients</h1>

      <div className="space-y-4">
        {patients.map((patient) => (
          <div key={patient.user_id} className="border p-4 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{patient.name}</h2>
            <p className="text-gray-600">patient information</p>
            <button className="mt-2 px-4 py-2 bg-gray-200 rounded">Edit</button>
          </div>
        ))}
      </div>

      <button className="mt-6 px-4 py-2 bg-black text-white rounded">Add New Patient</button>
    </div>
  );
}
