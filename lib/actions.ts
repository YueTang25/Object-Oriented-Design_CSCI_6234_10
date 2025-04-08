import { neon } from '@neondatabase/serverless';
import { RoomType, AvailabilityType, AppointmentType, UserType } from '@/lib/db';

export const db = neon(process.env.DATABASE_URL!);

export async function createRoom(room: RoomType) {
    try {
        const maxIdResult = await db`SELECT MAX(exam_room_id) + 1 AS new_id FROM exam_rooms`;
        const new_exam_room_id = maxIdResult[0]?.new_id || 1; // Default to 1 if no rooms exist
        await db`
        INSERT INTO exam_rooms 
        (clinic_id, exam_room_id, capability) VALUES 
        (${room.clinic_id}, ${Number(new_exam_room_id)}, ${room.capability})
    `;
        return new_exam_room_id;
    } catch (error) {
        console.error('Database Error:', error);
        console.error('Failed to Insert room, room = ' + room);
        return { message: 'Database Error: Failed to Insert room, room = ' + JSON.stringify(room) };
    }
}

export async function updateRoom(room: RoomType) {
    try {
        await db`
        UPDATE exam_rooms 
        SET capability = ${room.capability}
        WHERE exam_room_id = ${room.exam_room_id}
      `;
    } catch (error) {
        console.error('Database Error:', error);
        console.error('Failed to Update room, room = ' + room);
        return { message: 'Database Error: Failed to Update room, exam_room_id = ' + room.exam_room_id };
    }
}

export async function deleteRoom(room: RoomType) {
    try {
        await db`DELETE FROM exam_rooms WHERE exam_room_id = ${room.exam_room_id}`;
    } catch (error) {
        console.error('Database Error:', error);
        console.error('Failed to Delete room, room = ' + room);
        return { message: 'Database Error: Failed to Delete room, exam_room_id = ' + room.exam_room_id };
    }
}

export async function addAvailability(availability: AvailabilityType, user_id: number) {
    try {
        const [user] = await db`
        SELECT doctor_id
        FROM doctors
        WHERE user_id = ${user_id}`;
        const doctor_id = user?.doctor_id || 0;
        await db`
        INSERT INTO doctor_availability 
        (doctor_id, date, start_time, end_time) VALUES 
        (${doctor_id}, ${availability.date}, ${availability.start_time}, ${availability.end_time})
    `;
    } catch (error) {
        console.error('Database Error:', error);
        console.error('Failed to add availability, user_id = ' + user_id);
        return { message: 'Database Error: Failed to add availability, availability = ' + JSON.stringify(availability) };
    }
}

export async function deleteAvailability(availability: AvailabilityType, user_id: number) {
    try {
        const [user] = await db`
        SELECT doctor_id
        FROM doctors
        WHERE user_id = ${user_id}`;
        const doctor_id = user?.doctor_id || 0;
        await db`
        DELETE FROM doctor_availability WHERE
        doctor_id = ${doctor_id} AND
        date = ${availability.date} AND
        start_time = ${availability.start_time} AND
        end_time = ${availability.end_time}
        `;
    } catch (error) {
        console.error('Database Error:', error);
        console.error('Failed to delete availability, user_id = ' + user_id);
        return { message: 'Database Error: Failed to delete availability, availability = ' + JSON.stringify(availability) };
    }
}

export async function createAppointment(appointment: AppointmentType, user_id: number) {
    try {
        const [user] = await db`
        SELECT patient_id
        FROM patient_info
        WHERE user_id = ${user_id}`;
        const patient_id = user?.patient_id || 0;
        await db`
        UPDATE doctor_availability 
        SET start_time = (start_time + INTERVAL '30 minutes')::TIME
        WHERE
        doctor_id = ${appointment.doctor_id} AND
        date = ${appointment.date} AND
        start_time = ${appointment.start_time}
      `;
        const [facility] = await db`
        SELECT clinic_id 
        FROM clinics 
        WHERE location = ${appointment.location}`;

        // Book the appointment
        const result = await db`
        INSERT INTO appointments (
        duration, 
        start_time, 
        date, 
        clinic_id, 
        exam_room_id, 
        doctor_id, 
        patient_id
        ) VALUES (
        ${appointment.duration}, 
        ${appointment.start_time},
        ${appointment.date},  
        ${facility.clinic_id}, 
        1, 
        ${appointment.doctor_id}, 
        ${patient_id})
        RETURNING *
    `;
        return result;
    } catch (error) {
        console.error('Database Error:', error);
        console.error('Failed to create Appointment = ' + JSON.stringify(appointment));
        return { message: 'Database Error: Failed to create Appointment' };
    }
}

export async function deleteAppointment(appointment: AppointmentType, user_id: number) {
    try {
        const [user] = await db`
        SELECT patient_id
        FROM patient_info
        WHERE user_id = ${user_id}`;
        const patient_id = user?.patient_id || 0;
        await db`DELETE FROM appointments 
        WHERE 
        appointment_id = ${appointment.appointment_id} AND
        patient_id = patient_id
        `;
    } catch (error) {
        console.error('Database Error:', error);
        console.error('Failed to Delete appointment, appointments = ' + JSON.stringify(appointment));
        return { message: 'Database Error: Failed to Delete appointment, appointment_id = ' + appointment.appointment_id };
    }
}

export async function createPatient(user: UserType) {
    try {
        const data = await db`
        INSERT INTO users (
        name, 
        email, 
        password
        ) VALUES (
         ${user.name}, 
         ${user.email}, 
         ${user.password})
         RETURNING user_id
        `;
        console.log("user_id",data[0].user_id)
        const patient_id = await db`
        INSERT INTO patient_info (
        user_id
        ) VALUES (
         ${data[0].user_id})
         RETURNING patient_id
        `;
        user.user_id = data[0].user_id
        return { data: user};
    } catch (error) {
        console.error('Database Error:', error);
        console.error('Failed to create patient, info = ' + JSON.stringify(user));
        return { message: 'Failed to create patient, info = ' + JSON.stringify(user) };
    }
}