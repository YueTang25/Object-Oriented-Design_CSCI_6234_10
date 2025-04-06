import { neon } from '@neondatabase/serverless';
import { RoomType } from '@/lib/db';

export const db = neon(process.env.DATABASE_URL!);

export async function createRoom(room: RoomType) {
    try {
        await db`
        INSERT INTO exam_rooms 
        (clinic_id, exam_room_id, capability) VALUES 
        (${room.clinic_id}, (SELECT COALESCE(MAX(exam_room_id), 0) + 1 FROM exam_rooms), ${room.capability})
    `;
    } catch (error) {
        return { message: 'Database Error: Failed to Insert room, room = ' + room };
    }
}

export async function updateRoom(room: RoomType) {
    try {
        await db`
        UPDATE exam_rooms 
        SET clinic_id = ${room.clinic_id}, 
        capability = ${room.capability}
        WHERE exam_id = ${room.exam_id}, 
      `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update room, exam_id = ' + room.exam_id };
    }
}

export async function deleteRoom(room: RoomType) {
    try {
        await db`DELETE FROM exam_rooms WHERE exam_id = ${room.exam_id}`;
    } catch (error) {
        return { message: 'Database Error: Failed to delete room, exam_id = ' + room.exam_id };
    }
}