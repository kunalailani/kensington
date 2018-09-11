import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ApiHandlerService } from '../shared/api-handler.service';
import { ConfiguratorService } from '../shared/configurator.service';
import { getPropertyConfigurationData } from '../property/property.constant';

declare var google: any;
var lat = '';
var lng = '';

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
  property_type_rent: Array<any>;
  choice: Array<any>;
  property_choice: boolean = true;

  constructor(private router: Router, private apiHandlerService: ApiHandlerService, private configuratorService: ConfiguratorService) { 
  	this.search_img = localStorage.getItem('search_image');
  }

  ngOnInit() {  	
    this.property_type = this.getValues('property_type');
    this.property_type_rent = ['Wohnung', 'Haus', 'Gewerbe & Wohnen', 'Gewerbeimmobilie', 'Ferienhaus'];
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

 distanceSliderFinishEvent(event) {
    console.log(event);
    this.searchFilterObj["distance"] = event.from + ',' + event.to;
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

    this.searchFilterObj['property_choice'] = this.property_choice;    
    this.searchFilterObj['latitude'] = lat;
    this.searchFilterObj['longitude'] = lng;
    console.log('property filter data', this.searchFilterObj);
    this.apiHandlerService.get('/api/v1/property/list-property/', this.searchFilterObj).subscribe((res) => {
      console.log(res.data);
      this.configuratorService.setSearchDataResult(res);
      this.router.navigate(['/search-property']);
    })
  }

  getLatLng (zipcode) {
    var geocoder = new google.maps.Geocoder();
    console.log(zipcode);      
    geocoder.geocode( { 'address': zipcode}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {        
       lat = results[0].geometry.location.lat();
       lng = results[0].geometry.location.lng();
      }
    })
  }

   getValues(propName) {    
    return getPropertyConfigurationData(propName);
  }

}
