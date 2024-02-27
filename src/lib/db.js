import supabase from '$lib/supabase';
import { json, error } from '@sveltejs/kit';

// Helper function to GET data from supabase
export const getRecords = async (table, url) => {
	const columns = url.searchParams.get('columns') ?? '*';

	const queryDB = async () => {
		let query = supabase.from(table).select(columns);
		let filter = JSON.parse(url.searchParams.get('filter'));

		// APPEND FILTERS
		if (filter) {
			if (filter.in) {
				query = query.in(filter.in.column, filter.in.value);
			}
			if (filter.lt) {
				query = query.lt(filter.lt.column, filter.lt.value);
			}
			if (filter.gte) {
				query = query.gte(filter.gte.column, filter.gte.value);
			}
			if (filter.match) {
				query = query.match(filter.match);
			}
		}
		const { data, err } = await query;

		if (err) {
			error(err.code, err.message);
		}

		return json(data);
	};

	return await queryDB();
};

// Helper function to PUT data to supabase
export const insertRecord = async (table, insertArray) => {
	const { data, error } = await supabase.from(table).insert(insertArray).select();
	return { data, error };
};
