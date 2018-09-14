export function getPropertyWiseFields(propertyType) {
	let propertyTypeSection = {
		'rent-apartment': {
			'owner_section': [
				{
					'type': 'text',
					'placeholder': 'First Name',
					'required': false,
					'name': 'first_name'
				},
				{
					'type': 'text',
					'placeholder': 'Last Name',
					'required': false,
					'name': 'last_name'
				}
			]
		}
	}
	return propertyTypeSection[propertyType];
}