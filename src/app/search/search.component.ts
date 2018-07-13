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

  public searchFilterObj: any;

  constructor(private router: Router, private apiHandlerService: ApiHandlerService, private configuratorService: ConfiguratorService) { 
  	this.searchFilterObj = {
  		property_type: '',
  		property_location: "",
  		bathroom: '',
  		bedroom: '',
  		purchase_price: 0
  	}
  }

  ngOnInit() {
  	
  }

  searchProperty() {
  	console.log(this.searchFilterObj);
  	this.apiHandlerService.get('/api/v1/property/list-property/', this.searchFilterObj).subscribe((res) => {
  		console.log(res.data);
  		this.configuratorService.setSearchDataResult(res);
  		this.router.navigate(['/search-property']);
  	})  	
  }

  getValues(propName) {
  	return getPropertyConfigurationData(propName)
  }
}
