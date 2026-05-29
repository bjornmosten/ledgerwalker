declare global {
	namespace App {
		interface Locals {
			user: {
				id: string;
				email: string;
			} | null;
		}
		interface PageData {}
		interface Error {}
		interface Platform {}
	}
}

export {};
