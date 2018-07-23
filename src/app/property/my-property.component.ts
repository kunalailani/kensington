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
  offsetCounter: number = -5;
  resMsg: string;
  hideLoadMore: boolean = true;

  constructor(private apiHandlerService: ApiHandlerService, private loaderService: LoaderService) { }

  ngOnInit() {    
  	this.fetchMyProperty();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      $('.property-image').magnificPopup({ type: 'image' });
    }, 2000)    
  }


  fetchMyProperty() {
    this.loaderService.displayLoader(true);
    this.offsetCounter += 5;
  	this.apiHandlerService.get('/api/v1/property/list-my-property?offset=' + this.offsetCounter + '&limit=5').subscribe((res) => {
  		console.log(res);
      if (res.success) {
        if (this.offsetCounter >= 5) {
          this.hideLoadMore = res.data.length == 5 ? true : false;
          for ( let i = 0; i < res.data.length; i++ ) {
            this.myPropertyList.push(res.data[i]);
          }          
        } else
          this.myPropertyList = res.data;          
      } else {
        this.resMsg = res.msg;
      }  		
      this.loaderService.displayLoader(false);
  	})
  }

}
