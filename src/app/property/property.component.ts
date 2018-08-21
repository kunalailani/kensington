import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';

declare var $: any;
import 'magnific-popup';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  public propertyList: Array<any> = [];

  public baseUri: string = environment.api_url + '/property-details/';
  offsetCounter: number = -5;
  resMsg: string;
  hideLoadMore: boolean = true;
  sideBarAddImg = localStorage.getItem('sidebar_add_img');

  constructor(private apiHandlerService: ApiHandlerService, private loaderService: LoaderService,
   private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let property_type = params['property_type'];
      let property_by_role = params['property_by_role'];
      let is_onRent = params['is_onRent'];
      let residential = params['residential'];
      this.offsetCounter = -5;
      this.fetchProperty(property_type, property_by_role, is_onRent, residential);
    });  	
  }

  ngAfterViewInit() {
    setTimeout(() => {
      $('.property-image').magnificPopup({ type: 'image' });
    }, 2000)    
  }

  fetchProperty(property_type, property_by_role, is_onRent, residential) {
    this.loaderService.displayLoader(true);
    this.offsetCounter += 5;
    var url = '/api/v1/property/list-property?offset=' + this.offsetCounter + 
      '&limit=5&property_type=' + property_type + '&property_by_role=' + property_by_role + 
      '&is_onRent=' + is_onRent + '&residential_and_commercial=' + residential;

    if (property_type == 'false') {
      url = '/api/v1/property/list-property?offset=' + this.offsetCounter + 
      '&limit=5&property_by_role=' + property_by_role + 
      '&is_onRent=' + is_onRent + '&residential_and_commercial=' + residential;
    }
    if (residential == 'false') {
      url = '/api/v1/property/list-property?offset=' + this.offsetCounter + 
      '&limit=5&property_type=' + property_type + '&property_by_role=' + property_by_role + 
      '&is_onRent=' + is_onRent;
    }
  	this.apiHandlerService.get(url).subscribe((res) => {
      if (res.success) {
        if (this.offsetCounter >= 5) {
          this.hideLoadMore = res.data.length == 5 ? true : false;
          for ( let i = 0; i < res.data.length; i++ ) {
            this.propertyList.push(res.data[i]);
          }
          
          setTimeout(() => {
            $('.property-image').magnificPopup({ type: 'image' });
          }, 2000);

        } else
          this.propertyList = res.data;          
      } else {
        this.resMsg = res.msg;
      }
      this.loaderService.displayLoader(false);

  	})
  }

}
