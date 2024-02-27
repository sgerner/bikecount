import { json, error } from '@sveltejs/kit';
import { getRecords, insertRecord } from '$lib/db.js';

const db = 'trips';

// Get Records
export async function GET({ url }) {
	return await getRecords(db, url);
}

// Insert new record
export async function PUT(event) {
	const newRecord = await event.request.json();
	const { data, err } = await insertRecord(db, newRecord);

	if (err) {
		error(err.code, err.message);
	}

	return json(data);
}
