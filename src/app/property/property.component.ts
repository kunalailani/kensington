import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  public propertyList: Array<any>;

  public baseUri: string = environment.api_url + '/property-details/';

  constructor(private apiHandlerService: ApiHandlerService) { }

  ngOnInit() {
  	this.fetchProperty();
  }

  fetchProperty() {
  	this.apiHandlerService.get('/api/v1/property/list-property?offset=3&limit=2').subscribe((res) => {
  		console.log(res);
  		this.propertyList = res.data;

  	})
  }

}
