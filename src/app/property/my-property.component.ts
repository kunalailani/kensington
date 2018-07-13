import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-my-property',
  templateUrl: './my-property.component.html',
  styleUrls: ['./property.component.css']
})
export class MyPropertyListComponent implements OnInit {

  public myPropertyList: Array<any>;

  public baseUri: string = environment.api_url + '/property-details/';

  constructor(private apiHandlerService: ApiHandlerService) { }

  ngOnInit() {
  	this.fetchMyProperty();
  }

  fetchMyProperty() {
  	this.apiHandlerService.get('/api/v1/property/list-my-property').subscribe((res) => {
  		console.log(res);
  		this.myPropertyList = res.data;

  	})
  }

}
