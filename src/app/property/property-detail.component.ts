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
  public relatedProperty: Array<any> = [];
  
  otherCostsArray: Array<any> = [];

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4};

  showInquireNowModal: boolean = false;
  emiAmount: any;

  public activeImage: number = 0;

  sideBarAddImg = localStorage.getItem('sidebar_add_img');

  isLoggedIn: boolean = localStorage.getItem('username') ? true: false;
  inquireFormData: any = {};

  constructor(private activatedRoute: ActivatedRoute, private apiHandlerService: ApiHandlerService, private loaderService: LoaderService) { }

  ngOnInit() {   
  	this.activatedRoute.params.subscribe(params => {  		
  		this.propertyId = params['id'];
  		this.fetchPropertyDetail(this.propertyId);
  	})
  }

  ngAfterViewInit() {
    
  }

  getLatLngFromZipCode(zipcode) {
    var geocoder = new google.maps.Geocoder();    
    geocoder.geocode( { 'address': zipcode}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {        
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        drawMap(lat, lng, results[0].geometry.bounds);
      }
     });

    function drawMap(lat, lng, bounds) {
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
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
  		this.propertyDetails = res.data.details;
      this.relatedProperty = res.data.relavant_property || [];
      let totalPropertyPrice = this.propertyDetails.purchase_price +this.propertyDetails.notary_fee + this.propertyDetails.brokerage_cost;
      this.propertyPriceWidth = (this.propertyDetails.purchase_price * 100 ) / totalPropertyPrice + '%';
      this.notaryFeeWidht = (this.propertyDetails.notary_fee * 100 ) / totalPropertyPrice + '%';
      this.brokerageCostsWidth = (this.propertyDetails.brokerage_cost * 100 ) / totalPropertyPrice + '%';
      var totalEmi = (this.propertyDetails.purchase_price + (this.propertyDetails.purchase_price * 10) / 100)  - (this.propertyDetails.purchase_price * 20) / 100;
      this.emiAmount = ( (totalEmi * 4) / 100) / 12;
      this.loaderService.displayLoader(false);
      if (this.propertyDetails.other_costs) {
        var other_costs = Object.keys(this.propertyDetails.other_costs);        
        for (let key of other_costs) {          
          this.otherCostsArray.push(key)
        }
      }
      this.getLatLngFromZipCode(this.propertyDetails.post_code);
  	});
  }

  afterChange(e) {    
  }

  changeImage(index) {
    this.activeImage = index;
  }

  submitInquiryForm(inquireForm) {    
    this.inquireFormData['user_id'] = localStorage.getItem('user_id');
    this.apiHandlerService.post('/api/v1/userenquiry/enquiry', this.inquireFormData).subscribe((res) => {      
      if (res.success) {
        this.showInquireNowModal = false;
        inquireForm.reset();
        alert("Your Enquiry is submitted");
      } else {
        if (res.errorCode = 999999) {
          alert('You have already placed an inquiry');
        }
      }
    })    
  }

}
