import { neon } from '@neondatabase/serverless';

export const db = neon(process.env.DATABASE_URL!);

export type DoctorType = {
  user_id: number;
  name: string;
  doctor_id: number;
  doctor_info: string;
};

export type FacilityType = {
  clinic_id: number;
  location: string;
};

export type RoomType = {
  clinic_id: number;
  exam_room_id: number;
  capability: string;
};

export async function getDoctors() {
  try {
    const data = await db`
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
    const data = await db`
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
    const data = await db`
      SELECT *
      FROM clinics` as FacilityType[];
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the all facilities.');
  }
}

export async function getRooms(clinic_id: number) {
  try {
    const data = await db`
      SELECT *
      FROM exam_rooms
      WHERE exam_rooms.clinic_id = ${clinic_id};` as RoomType[];
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the all rooms, clinic_id = ' + clinic_id);
  }
}