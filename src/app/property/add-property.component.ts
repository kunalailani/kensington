import { Component, OnInit } from '@angular/core';
import { AddProperty } from './add-property';

@Component({
  selector: 'add-property',
  templateUrl: './add-property.component.html'
})
export class AddPropertyComponent implements OnInit {
  
private propertyObj: AddProperty;
 
  private storeyType: boolean; 
  private basementCellar: boolean = true;  

  constructor() { 

  	this.propertyObj = new AddProperty({
  		room: 1,
  		purchase_price: '',
  		living_space: '',
  		usable_area: '',
  		property: '',
  		type: '',
  		storey: 1,
  		basement: 1,
  		attic: 1,
  		bedroom: 2,
  		bathroom: 2,
  		kitchens: 1,
  		garges: 0,
  		plots: 1,
  		land_transfer_by_state: ''
  	});
  	
  	this.storeyType = true;  	
  }

  ngOnInit() {
  }

}
