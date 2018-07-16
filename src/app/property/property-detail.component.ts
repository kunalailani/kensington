import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from '../shared/api-handler.service';
import { environment } from '../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property.component.css']
})

export class PropertyDetailComponent implements OnInit {

  public propertyId: string;
  public propertyDetails: any;
  public baseUri: string = environment.api_url + '/property-details/';

  constructor(private activatedRoute: ActivatedRoute, private apiHandlerService: ApiHandlerService) { }

  ngOnInit() {
  	this.activatedRoute.params.subscribe(params => {
  		console.log(params);
  		this.propertyId = params['id'];
  		this.fetchPropertyDetail(this.propertyId);
  	})  	
    //this.fetchPropertyDetail(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit() {
    console.log("hello");
  }

  fetchPropertyDetail(propertyId) {
  	this.apiHandlerService.get('/api/v1/property/details/' + propertyId).subscribe((res) => {
  		this.propertyDetails = res.data;
  	});
  }

}
