export class AddProperty {
	purchase_price: string;
	room: number;
	living_space: string;
	usable_area: string;
	property: string;
	estimated_rate: number;
	type: string;
	storey: number;
	basement: number;
	attic: number;
	bedroom: number;
	bathroom: number;
	kitchens: number;
	garges: number;
	plots: number;
	vacant_from: number;
	costs: number;
	land_transfer_by_state: string;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
	
	public getTotalCountsOrValues() {
		return {
			bedroom: new Array(10),
			kitchens: new Array(10),
			room: new Array(50),
			basement: new Array(10),
			bathroom: new Array(10),
			garages: new Array(30),
			plot: new Array(30),
			attic: ['25%','50%','75%','100%'],
			basementCellar: ['25%','50%','75%','100%'],
			typeOptions: [
				'One-family house(Freestanding)',
				'Semi-detached house',
				'Reihenmittelhause',
				'Reihenendhaus',
				'Two family house',
				'Appartment house(at least 3 residential units)',
				'least 3 residenal(units)',
				'condominium'
			]
		}
	}
}
