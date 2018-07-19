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

  public propertyPriceWidth: any;
  public notaryFeeWidht: any;
  public brokerageCostsWidth: any;

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

  public activeImage: number = 0;

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
      let totalPropertyPrice = res.data.purchase_price + res.data.notary_fee + res.data.brokerage_cost;
      this.propertyPriceWidth = (res.data.purchase_price * 100 ) / totalPropertyPrice + '%';
      this.notaryFeeWidht = (res.data.notary_fee * 100 ) / totalPropertyPrice + '%';
      this.brokerageCostsWidth = (res.data.brokerage_cost * 100 ) / totalPropertyPrice + '%';      
  	});
  }

  afterChange(e) {
    console.log('afterChange');
  }

  changeImage(index) {
    this.activeImage = index;
  }

}
