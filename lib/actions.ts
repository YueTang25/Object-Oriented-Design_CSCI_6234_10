import { neon } from '@neondatabase/serverless';
import { RoomType, AvailabilityType } from '@/lib/db';

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