export class AddProperty {
	purchase_price: string;
	room: number;
	living_space: string;
	useable_area: number;
	property: string;
	estimated_rate: number;
	type: string;
	storey: number;
	basement: string;
	attic: string;
	cellar: string
	bedroom: number;
	bathroom: number;
	kitchens: number;
	garages: number;
	plots: number;
	vacant_from: number;
	costs: number;
	land_transfer_by_state: string;
	construction_year: string;
	additonal_certificate: Object;
	energy_certificate: string;
	essential_energy_src: string;
	property_description: string;
	property_image: Object;
	floor_plans: Object;
	address: string;
	notarty_fee: number;
	brokerage_costs: number;
	repair: number;
	heating: number;	
	notary_fee: number;
	residential_and_commercial: string;
	undeveloped_property: string;
	has_basement: boolean;
	has_cellar: boolean;
	has_attic: boolean;
	description: string;
	property_location: string;
	name: string;
	property_type: string;


	constructor(values: Object = {}) {
		Object.assign(this, values);
	}	
}
