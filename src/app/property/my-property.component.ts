import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';

declare var $: any;
import 'magnific-popup';

@Component({
  selector: 'app-my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./property.component.css']
})
export class MyPropertyListComponent implements OnInit {  

  public myPropertyList: Array<any>;

  public baseUri: string = environment.api_url + '/property-details/';

  constructor(private apiHandlerService: ApiHandlerService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.displayLoader(true);
  	this.fetchMyProperty();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      $('.property-image').magnificPopup({ type: 'image' });
    }, 2000)    
  }


  fetchMyProperty() {
  	this.apiHandlerService.get('/api/v1/property/list-my-property').subscribe((res) => {
  		console.log(res);
  		this.myPropertyList = res.data;
      this.loaderService.displayLoader(false);
  	})
  }

}
