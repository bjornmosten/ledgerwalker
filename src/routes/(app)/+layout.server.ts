import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// TODO: auth middleware will populate locals.user from the session cookie
	if (!locals.user) {
		redirect(302, '/login');
	}

	return { user: locals.user };
};
