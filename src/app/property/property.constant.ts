export function getPropertyConfigurationData(propName) {
		let propertyName =  {
			bedroom: new Array(10),
			kitchens: new Array(10),
			room: new Array(50),
			basement: new Array(10),
			bathroom: new Array(10),
			garages: new Array(30),
			plot: new Array(30),
			attic: ['Expansion level 25%','Expansion level 50%','Expansion level 75%','Expansion level 100%'],
			basementCellar: ['Lower cellar level 25%','Lower cellar level 50%','Lower cellar level 75%','Lower cellar level 100%'],
			without_basement_storey: new Array(10),
			property_type: [
				'Wohnung',
				'Haus',
				'Gewerbeimmobilie',
				'Ferienhaus',
				'Sonstiges'				
			],
			undeveloped_property: ["Residential land", "Land for mixed use"],
			residential_and_commercial: ["Commercial larger 33% of the living space", "Commercial smaller 33% of the living space"],
			repair: ['catastrophic', 'bad', 'moderate', 'medium', 'Good', 'very good'],
			heating: ['Heang', 'moil', 'gas heang', 'pellet', 'wood heang', 'CHP', 'heat pump', 'district heang', 'electric heang'],
			essential_energy_source: ['only a legal statement', 'therefore free text'],
			land_tras_tax_by_state: [
				{
					state_name: 'Baden-Wuremberg',
					tax: '5.0%'
				},
				{
					state_name: 'Bavaria',
					tax: '03.05.0%'
				},
				{
					state_name: 'Berlin',
					tax: '6.0%'
				},
				{
					state_name: 'Brandenburg',
					tax: '06.05.0%'
				},
				{
					state_name: 'Bremen',
					tax: '5.0%'
				},
				{
					state_name: 'Hamburg',
					tax: '04.05.0%'
				},
				{
					state_name: 'Mecklenburg-Vorp.',
					tax: '5.0%'
				},
				{
					state_name: 'Lower Saxony',
					tax: '5.0%'
				},
				{
					state_name: 'North Rhine-Westphalia',
					tax: '06.05.0%'
				},
				{
					state_name: 'Rheinland-Pfalz',
					tax: '5.0%'
				},
				{
					state_name: 'Saarland',
					tax: '06.05.0%'
				},
				{
					state_name: 'Saxony',
					tax: '03.05.0%'
				},
				{
					state_name: 'Saxony-Anhalt',
					tax: '5.0%'
				},
				{
					state_name: 'Schleswig-Holstein',
					tax: '06.05.0%'
				},
				{
					state_name: 'Thuringia',
					tax: '06.05.0%'
				}				
			]
		}
		return propertyName[propName];
	}