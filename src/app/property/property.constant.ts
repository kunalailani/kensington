export function getPropertyConfigurationData(propName) {
		let propertyName =  {
			bedroom: new Array(10),
			kitchens: new Array(10),
			room: new Array(10),
			basement: new Array(10),
			bathroom: new Array(10),
			garages: new Array(7),
			plot: new Array(10),
			attic: ['Expansion level 25%','Expansion level 50%','Expansion level 75%','Expansion level 100%'],
			basementCellar: ['Lower cellar level 25%','Lower cellar level 50%','Lower cellar level 75%','Lower cellar level 100%'],
			without_basement_storey: new Array(10),
			property_type: [
				'Wohnung',
				'Haus',
				'Gewerbe & Wohnen',
				'Gewerbeimmobilie',
				'Ferienhaus',
				'Baugrundstück'
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
			],
			domestic_equipments: ['bed', 'medium', 'sophisticated', 'very sophisticated'],
			heating_type: ['Central Heating', 'Floors Heating'],
			essential_energy_sources: ['Oil', 'gas heating', 'wood heating', 'Pelletheizung', 'electric heating', 'heat pump',
			'Fuel cell heating','Block heating power plant','solar technology', 'Hybridtechnik'],
			object_condition: ['Very good', 'Good', 'Medium', 'Moderate', 'Bad', 'catastrophic'],
			floor: ['Souterrain', 'Basement Floor', 'Ground Floor', '1st Floor', '2nd Floor', '3rd Florr', '4th Floor'],
			floor_type: ['Floor Apartment', 'Duplex Apartment', 'Basement Apartment', 'Granny Flat', 'Loft', 'Penthouse']
		}
		return propertyName[propName];
	}