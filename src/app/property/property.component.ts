import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
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

  public propertyList: Array<any>;

  public baseUri: string = environment.api_url + '/property-details/';

  constructor(private apiHandlerService: ApiHandlerService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.displayLoader(true);
  	this.fetchProperty();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      $('.property-image').magnificPopup({ type: 'image' });
    }, 2000)    
  }

  fetchProperty() {
  	this.apiHandlerService.get('/api/v1/property/list-property?offset=3&limit=5').subscribe((res) => {
  		console.log(res);
  		this.propertyList = res.data;
      this.loaderService.displayLoader(false);
  	})
  }

}
