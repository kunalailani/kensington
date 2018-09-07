import { Component, OnInit } from '@angular/core';
import {NgModel} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHandlerService } from '../shared/api-handler.service';
import { LoaderService } from '../shared/loader.service';
import { getPropertyConfigurationData } from './property.constant';
import { ConfiguratorService } from '../shared/configurator.service';

declare var google: any;

var lat = '';
var lng = '';

@Component({
  selector: 'add-owner-property',
  templateUrl: './add-owner-property.component.html',
  styleUrls: ['./property.component.css']
})

export class AddOwnerPropertyComponent implements OnInit {   

  public propertyObj: any = {
    floor_type: '',
    room: 0,
    garages: 0,
    parking: 0,
    bathroom: 0,
    pets: '',
    has_cellar: true,
    cellar: '',
    object_condition: '',
    rent_apartment_heating: '',
    essential_energy_source: ''
  };

  public propertyImagePreview: Array<any>;
  public floorPlansImagePreview: Array<any>;
  public energy_certificate: any;
  public additional_certificate: any;
  public assign_to_agent: boolean = false;

  public formData: FormData = new FormData();
 
  public storeyType: boolean = false;

  public isLoggedin: boolean = false;
  otherCostsContainer: Array<any> = [0];

  floor_plan_thumb_images: Array<any> = ['assets/images/thumbnail.png', 'assets/images/thumbnail.png', 'assets/images/thumbnail.png', 'assets/images/thumbnail.png',
                                        'assets/images/thumbnail.png'];

  floorPlanCounter: 0;
  floor: Array<string> = this.getValues('floor');
  domestice_equipements: Array<string> = this.getValues('domestic_equipments');

  constructor(private configurtorService: ConfiguratorService, private apiHandlerService: ApiHandlerService, private router: Router,
    private loaderService: LoaderService) { 

  	
  }

  ngOnInit() {
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

  addOtherCostsContainer() {
    this.otherCostsContainer.push(this.otherCostsContainer.length);
  }

  removeOtherCostsContainer(i) {
    if (i > 0) {
      this.otherCostsContainer.pop();
    }    
  }

  addProperty() {  	
    console.log(this.propertyObj);
    /*this.propertyObj['assign_to_agent'] = this.assign_to_agent;    
    this.propertyObj['lat'] = lat;
    this.propertyObj['lng'] = lng;
    this.loaderService.displayLoader(true);
    this.apiHandlerService.post('/api/v1/property/add', this.propertyObj).subscribe((res) => {
        if (res.data)
          this.uploadPropertyImages(res.data._id);
        else
          this.loaderService.displayLoader(false);
    })*/
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
         //this.floor_plan_thumb_images[this.floorPlanCounter] = reader.result;
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

  additionalCertificateChange(event, additional_certyRef) {    
    let additionalFileList: FileList = event.target.files;
    for (let i = 0; i < additionalFileList.length; i++) {      
      /*if (event.target.files[i].type != 'application/pdf') {
        additional_certyRef.value = '';
        alert('Please Select file with pdf extension');
      } else {
        this.formData.append('additional_certificates', event.target.files[i]);
      }*/
       this.formData.append('additional_certificates', event.target.files[i]);      
    }
    // this.formData.append('additional_certificates', event.target.files[0]);
  }

  energyCertificateChange(event) {
    this.formData.append('energy_certificate', event.target.files[0]);
  }

  uploadPropertyImages(property_id) {    
    this.apiHandlerService.put('/api/v1/property/upload-all-images/' + property_id, this.formData, false).subscribe((res) => {
      this.loaderService.displayLoader(false);
      if (res.success) {
        alert("Property Added Successfully, Your Property is under review and will be listed once admin review it");
        this.router.navigate(['/my-property']);
      } else {
        alert(res.reason);
      }      
    })
  }

  getAddressOnChange(addressObj) {  	
    this.propertyObj['property_location'] = addressObj.formatted_address;    
  }

  uploadFloorPlanImage(index, floor_plan_files) {    
    this.floorPlanCounter = index;
    floor_plan_files.click();    
  }
}
