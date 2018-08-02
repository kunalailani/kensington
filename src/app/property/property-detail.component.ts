import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from '../shared/api-handler.service';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';

declare var $: any;
declare var google: any;

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

  showInquireNowModal: boolean = false;

  public activeImage: number = 0;

  isLoggedIn: boolean = localStorage.getItem('username') ? true: false;
  inquireFormData: any = {};

  constructor(private activatedRoute: ActivatedRoute, private apiHandlerService: ApiHandlerService, private loaderService: LoaderService) { }

  ngOnInit() {   
  	this.activatedRoute.params.subscribe(params => {
  		console.log(params);
  		this.propertyId = params['id'];
  		this.fetchPropertyDetail(this.propertyId);
  	})
  }

  ngAfterViewInit() {
    
  }

  getLatLngFromZipCode(zipcode) {
    var geocoder = new google.maps.Geocoder();
    console.log(zipcode);
    geocoder.geocode( { 'address': zipcode}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results[0]);
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        drawMap(lat, lng, results[0].geometry.bounds);
      }
     });

    function drawMap(lat, lng, bounds) {
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          scrollwheel: false,
          center: new google.maps.LatLng(lat, lng),
        });      
      highlightLocation(lat, lng, map, bounds);
    }

    function highlightLocation(lat, lng, map, bounds) {           
      var rectangle = new google.maps.Rectangle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        bounds: bounds       
      });      
    }
  }

  fetchPropertyDetail(propertyId) {
    this.loaderService.displayLoader(true);
  	this.apiHandlerService.get('/api/v1/property/details/' + propertyId).subscribe((res) => {
  		this.propertyDetails = res.data;
      let totalPropertyPrice = res.data.purchase_price + res.data.notary_fee + res.data.brokerage_cost;
      this.propertyPriceWidth = (res.data.purchase_price * 100 ) / totalPropertyPrice + '%';
      this.notaryFeeWidht = (res.data.notary_fee * 100 ) / totalPropertyPrice + '%';
      this.brokerageCostsWidth = (res.data.brokerage_cost * 100 ) / totalPropertyPrice + '%';
      this.loaderService.displayLoader(false);
      this.getLatLngFromZipCode(this.propertyDetails.post_code);
  	});
  }

  afterChange(e) {
    console.log('afterChange');
  }

  changeImage(index) {
    this.activeImage = index;
  }

  submitInquiryForm() {
    console.log(this.inquireFormData);
    this.showInquireNowModal = false;
  }

}
