import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiHandlerService } from '../shared/api-handler.service';
import { ConfiguratorService } from '../shared/configurator.service';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';

import { getPropertyConfigurationData } from '../property/property.constant';

import { forkJoin } from "rxjs/observable/forkJoin";

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

  termsConditionData: string;

  constructor(private router: Router, private apiHandlerService: ApiHandlerService, private loaderService: LoaderService, private configuratorService: ConfiguratorService) { }

  ngOnInit() {    
  	this.fetchLatestPropUser();       
    //this.forkJoinApis();
  }

  ngAfterViewInit() {    
  }

  forkJoinApis() {
    this.loaderService.displayLoader(true);
    forkJoin([      
      this.apiHandlerService.get('/api/v1/property/latest-property-by-user')
      ]).subscribe(res => {
        this.userPropertyList = res[0].data;
        //this.propertyOnRentList = res[0].data;
        this.loaderService.displayLoader(false);
    })
  }

  fetchLatestPropUser() {
     this.loaderService.displayLoader(true);
  	this.apiHandlerService.get('/api/v1/property/latest-property-by-user').subscribe((res) => {  		
  		this.userPropertyList = res.data;      
      this.fetchLatestPropAgent();
  	})
  }

  fetchLatestPropAgent() {
    this.apiHandlerService.get('/api/v1/property/latest-property-by-agent').subscribe((res) => {
      this.agentPropertyList = res.data;
      this.headerSetting = res.headerSettings; 
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
    this.searchFilterObj["useable_area"] = event.from + ',' + event.to;
  }  

  getValues(propName) {    
    return getPropertyConfigurationData(propName);
  }

  redirectToLogin() {
    $("#loginReqMoal").modal('hide');
    this.router.navigate(['/login']);
  }
}
