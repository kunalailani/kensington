import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiHandlerService } from '../shared/api-handler.service';
import { ConfiguratorService } from '../shared/configurator.service';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';

import { getPropertyConfigurationData } from '../property/property.constant';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
  public userPropertyList: Array<any>;
  public agentPropertyList: Array<any>;
  public propertyOnRentList: Array<any>;
  public searchFilterObj: any = {};
  public headerSetting: any = {};
  recommended_offers: string;

  public baseUri: string = environment.api_url + '/property-details/';
  //public search_image: string = localStorage.getItem('search_image');

  termsConditionData: string;

  constructor(private router: Router, private apiHandlerService: ApiHandlerService, private loaderService: LoaderService, private configuratorService: ConfiguratorService) { }

  ngOnInit() {
    let authData = this.configuratorService.getConfiguratorData();

    if (!authData['isLoggedin']) {
      this.showPopup();
    }
  	this.fetchLatestPropUser();
  }

  showPopup() {
    $("#loginReqMoal").modal()
  }

  fetchLatestPropUser() {
     this.loaderService.displayLoader(true);
  	this.apiHandlerService.get('/api/v1/property/latest-property-by-user').subscribe((res) => {  		
  		this.userPropertyList = res.data;
      this.headerSetting = res.headerSettings;
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

  areaSliderFinishEvent(event) {
    console.log(event);
    this.searchFilterObj["useable_area"] = event.from + ',' + event.to;
  }

  searchProperty(recommended_offers, search_type) {
    if (search_type == 'for_rent') {
      this.searchFilterObj["is_for_rent"] = true;
    }
    if (recommended_offers) {
      this.searchFilterObj["filter_column"] = recommended_offers.split("_")[0];
      this.searchFilterObj["filter_order"] = recommended_offers.split("_")[1];
    }    
    if (this.searchFilterObj["choice"])
      this.searchFilterObj["choice"] = this.searchFilterObj["choice"] ? this.searchFilterObj["choice"]: null;
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

  redirectToLogin() {
    $("#loginReqMoal").modal('hide');
    this.router.navigate(['/login']);
  }
}
