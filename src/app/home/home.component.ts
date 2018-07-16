import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
  public propertyList: Array<any>;

  public baseUri: string = environment.api_url + '/property-details/';

  termsConditionData: string;

  constructor(private apiHandlerService: ApiHandlerService, private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.displayLoader(true);
  	this.fetchProperty();
  }

  fetchProperty() {
  	this.apiHandlerService.get('/api/v1/property/list-property?offset=3&limit=5').subscribe((res) => {
  		console.log(res);
  		this.propertyList = res.data;
      this.loaderService.displayLoader(false);
      //this.getTermsAndCondition();
  	})
  }

  getTermsAndCondition() {
     this.apiHandlerService.get('/api/v1/page/get-page-by-slug/terms-conditions').subscribe((res) => {
       console.log('terms-conditions', res);
       this.termsConditionData = res.data;
     })
  }
}
