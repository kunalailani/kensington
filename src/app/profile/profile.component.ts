import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { ConfiguratorService } from '../shared/configurator.service';
import { LoaderService } from '../shared/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  userData: any = {};
  editedData: any = {};

  constructor(private apiHandlerService: ApiHandlerService, private configurtorService: ConfiguratorService, private loaderService: LoaderService) { }

  ngOnInit() {
  	this.fetchProfileData();
  }

  fetchProfileData() {
  	this.apiHandlerService.get('/api/v1/user/my-profile').subscribe((res) => {  		
  		this.userData = res.data;      
  	});
  }

  logoChangeEvent(event) {
    let avatar = event.target.files[0];
    let reader: FileReader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = ((e) => {      
      this.userData.logo = reader.result;
    });
  }

  editProfile(profileData) {
    if (profileData.value.new_password != profileData.value.cnf_password) {
      alert("Password do not match");
      return false;
    }
    this.loaderService.displayLoader(true);
    this.editedData = profileData.value;
    delete this.editedData.new_password;
    this.editedData['logo'] = this.userData.logo;
    this.editedData['password'] = this.userData.new_password;    
    this.apiHandlerService.put('/api/v1/user/update-profile', this.editedData, true).subscribe((res) => {
      if (res.success) {
        let userDataToSet = {
          username: res.msg.full_name,
          isLoggedin: true
        }
        this.configurtorService.setConfiguratorData(userDataToSet);
        alert("Edited Profile Successfully");        
      } else {
        alert(res.msg);
      }
      this.loaderService.displayLoader(false);
    })
  }

}
