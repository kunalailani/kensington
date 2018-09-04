import { Component, OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AddProperty } from './add-property';
import { ApiHandlerService } from '../shared/api-handler.service';
import { LoaderService } from '../shared/loader.service';
import { getPropertyConfigurationData } from './property.constant';
import { ConfiguratorService } from '../shared/configurator.service';

declare var google: any;

var lat = '';
var lng = '';


@Component({
  selector: 'edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./property.component.css']
})

export class EditPropertyComponent implements OnInit {   

  public propertyObj: AddProperty;
  public propertyImagePreview: Array<any>;
  public floorPlansImagePreview: Array<any>;
  public energy_certificate: any;
  public additional_certificate: any;

  public formData: FormData = new FormData();
 
  public storeyType: boolean = false;

  public isLoggedin: boolean = false;

  constructor(private configurtorService: ConfiguratorService, private apiHandlerService: ApiHandlerService, private router: Router,
    private loaderService: LoaderService, private activatedRoute: ActivatedRoute) {    
  }

  public propertyDataObj: any;
  propertyId: string;  

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.propertyId = params['id'];
      this.fetchPropertyDetail(params['id']);
    })
  }

  fetchPropertyDetail(propertyId) {
    this.apiHandlerService.get('/api/v1/property/details/' + propertyId).subscribe((res) => {
      this.propertyDataObj = res.data.details;
    });
  }

  getLatLng (zipcode) {
    var geocoder = new google.maps.Geocoder();    
    geocoder.geocode( { 'address': zipcode}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {        
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
      }
    })
  }

  editProperty({value, valid}: {value: AddProperty, valid: boolean}) {
    this.loaderService.displayLoader(true);
      if (this.propertyDataObj.location.coordinates[0] == 0) {
        console.log(lat, lng)
        this.propertyDataObj['lat'] = lat;
        this.propertyDataObj['lng'] = lng;
      }      
    this.apiHandlerService.put('/api/v1/property/update/' + this.propertyId, this.propertyDataObj, true).subscribe((res) => {
        if (res.data) {          
          this.loaderService.displayLoader(false);
          this.router.navigate(['/my-property']);
        }
        else
          this.loaderService.displayLoader(false);
    })     
  }

  getValues(propName) {  	
  	return getPropertyConfigurationData(propName);
  }

  propertyImageLimit(event, property_image) {
    this.fileSelectionLimitValidations(event, property_image);
    this.propertyImagePreview = [];
    let propertyFileList: FileList = event.target.files;
    let propertyImageList: Array<any> = [];
    for (let i = 0; i < propertyFileList.length; i++) {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(propertyFileList[i]);
      propertyImageList.push(propertyFileList[i]);
      this.formData.append('property_images', propertyFileList[i]);
      reader.onload = ((e) => {
         this.propertyImagePreview.push(reader.result)          
      });
    }
    /*this.formData.append('property_images', propertyImageList);*/
  }

  floorPlansImageLimit(event, floor_plans) {
    this.fileSelectionLimitValidations(event, floor_plans);

    this.floorPlansImagePreview = [];
    let floorPlansFileList: FileList = event.target.files;
    let floor_pan_images = [];
    for (let i = 0; i < floorPlansFileList.length; i++) {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(floorPlansFileList[i]); 
      floor_pan_images.push(floorPlansFileList[i]);
      this.formData.append('floor_pan_images', floorPlansFileList[i]);
      reader.onload = ((e) => {                  
         this.floorPlansImagePreview.push(reader.result)        
      });
    }       
  }

  fileSelectionLimitValidations(file, fileRef) {
    let fileList: FileList = file.target.files;    
    if (fileList.length < 3 || fileList.length > 5) {
      fileRef.value = '';
      alert("Please Upload more than 3 and maximum 5 files");
    }
  }

  additionalCertificateChange(event) {
    this.formData.append('additional_certificates', event.target.files[0]);
  }

  energyCertificateChange(event) {
    this.formData.append('energy_certificate', event.target.files[0]);
  }

  /*uploadPropertyImages(property_id) {    
    this.apiHandlerService.put('/api/v1/property/upload-all-images/' + property_id, this.formData).subscribe((res) => {
      this.loaderService.displayLoader(false);
      if (res.success) {
        alert("Property Added Successfully");
        this.router.navigate(['/my-property']);
      }      
    })
  }*/

  getAddressOnChange(addressObj, LocationCtrl) {  	
  }
}
