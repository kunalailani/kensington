export class Registration {
	full_name: string;	
	email: string;
	password: string;	
	role: string;
	phone_number: string;

	constructor (values: Object = {}) {
		Object.assign(this, values);
	}
}

export class Login {
	email: string;
	password: string;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
