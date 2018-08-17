import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiHandlerService } from '../shared/api-handler.service';
import { ConfiguratorService } from '../shared/configurator.service';
import { getPropertyConfigurationData } from '../property/property.constant';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {  
  public searchFilterObj: any = {};  
  recommended_offers: string;
  search_img: string;
  property_type: Array<any>;
  choice: Array<any>;

  constructor(private router: Router, private apiHandlerService: ApiHandlerService, private configuratorService: ConfiguratorService) { 
  	this.search_img = localStorage.getItem('search_image');
  }

  ngOnInit() {  	
    this.property_type = this.getValues('property_type');
    this.choice = ['Garden', 'Balcony', 'Garage'];
  }

  /*searchProperty() {
  	console.log(this.searchFilterObj);
  	this.apiHandlerService.get('/api/v1/property/list-property/', this.searchFilterObj).subscribe((res) => {
  		console.log(res.data);
  		this.configuratorService.setSearchDataResult(res);
  		this.router.navigate(['/search-property']);
  	})  	
  }

  getValues(propName) {
  	return getPropertyConfigurationData(propName)
  }*/

  areaSliderFinishEvent(event) {
    console.log(event);
    this.searchFilterObj["useable_area"] = event.from + ',' + event.to;
  }

  priceSliderFinishEvent(event) {
    console.log(event);
    this.searchFilterObj["purchase_price"] = event.from + ',' + event.to;
  }

  searchProperty(search_type) {    
    if (search_type == 'for_rent') {
      this.searchFilterObj["is_for_rent"] = true;
    }
    if (this.searchFilterObj["choice"])
      this.searchFilterObj["choice"] = this.searchFilterObj["choice"].join() || this.searchFilterObj["choice"];

    if (this.searchFilterObj["property_type"])
      this.searchFilterObj['property_type'] =  this.searchFilterObj["property_type"].join() || this.searchFilterObj["property_type"];

    console.log('property filter data', this.searchFilterObj);
    this.apiHandlerService.get('/api/v1/property/list-property/', this.searchFilterObj).subscribe((res) => {
      console.log(res.data);
      this.configuratorService.setSearchDataResult(res);
      this.router.navigate(['/search-property']);
    })
  }

   getValues(propName) {    
    return getPropertyConfigurationData(propName);
  }

}
