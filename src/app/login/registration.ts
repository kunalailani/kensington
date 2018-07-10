export class Registration {
	full_name: string;
	user_name: string;
	email: string;
	pwd: string;
	confirmpwd: string;	
	user_role: string;

	constructor (values: Object = {}) {
		Object.assign(this, values);
	}
}
