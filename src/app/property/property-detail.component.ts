import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHandlerService } from '../shared/api-handler.service';
import { environment } from '../../environments/environment';

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

  public activeImage: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private apiHandlerService: ApiHandlerService) { }

  ngOnInit() {
  	this.activatedRoute.params.subscribe(params => {
  		console.log(params);
  		this.propertyId = params['id'];
  		this.fetchPropertyDetail(this.propertyId);
  	})
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getLatLngFromZipCode(this.propertyDetails.post_code);
    }, 2000);
  }

  getLatLngFromZipCode(zipcode) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': zipcode}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        drawMap(lat, lng);
      }
     });

    function drawMap(lat, lng) {
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          scrollwheel: false,
          center: new google.maps.LatLng(lat, lng),
        });
      highlightLocation(lat, lng, map);
    }

    function highlightLocation(lat, lng, map) {
      console.log(lat, lng);
      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: {lat: lat, lng: lng},
        radius: 100
      });
      /*bounds: {
            north: 33.685,
            south: 33.671,
            east: -116.234,
            west: -116.251
          }*/
    }

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
