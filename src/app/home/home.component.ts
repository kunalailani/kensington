import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';

import { getPropertyConfigurationData } from '../property/property.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
  public userPropertyList: Array<any>;
  public agentPropertyList: Array<any>;
  public propertyOnRentList: Array<any>;

  public baseUri: string = environment.api_url + '/property-details/';

  termsConditionData: string;

  constructor(private apiHandlerService: ApiHandlerService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.displayLoader(true);
  	this.fetchLatestPropUser();
  }

  fetchLatestPropUser() {
  	this.apiHandlerService.get('/api/v1/property/latest-property-by-user').subscribe((res) => {  		
  		this.userPropertyList = res.data;
      this.fetchLatestPropAgent();
  	})
  }

  fetchLatestPropAgent() {
    this.apiHandlerService.get('/api/v1/property/latest-property-by-agent').subscribe((res) => {
      this.agentPropertyList = res.data;
      this.fetchPropOnRent();
    })
  }

  fetchPropOnRent() {
    this.apiHandlerService.get('/api/v1/property/latest-property-by-rent').subscribe((res) => {
      this.propertyOnRentList = res.data;
      this.loaderService.displayLoader(false);
    })
  }

  getValues(propName) {    
    return getPropertyConfigurationData(propName);
  }
}
