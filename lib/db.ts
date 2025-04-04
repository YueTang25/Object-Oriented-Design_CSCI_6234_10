import { neon } from '@neondatabase/serverless';

export const db = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);

export async function getDoctors() {
  try {
    const data = db`
      SELECT users.name, doctors.user_id, doctors.doctor_id, doctors.doctor_info
      FROM doctors
      JOIN users ON doctors.user_id = users.user_id`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the all doctors.');
  }
}

export async function getPatients() {
  try {
    const data = db`
      SELECT users.name, patient_info.user_id, patient_info.patient_id
      FROM patient_info
      JOIN users ON patient_info.user_id = users.user_id`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the all patients.');
  }
}

export async function getFacilities() {
  try {
    const data = db`
      SELECT *
      FROM clinics`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the all facilities.');
  }
}