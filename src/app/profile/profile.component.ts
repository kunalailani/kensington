import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  userData: any;

  constructor(private apiHandlerService: ApiHandlerService) { }

  ngOnInit() {
  	this.fetchProfileData();
  }

  fetchProfileData() {
  	this.apiHandlerService.get('/api/v1/user/my-profile').subscribe((res) => {
  		console.log('profile data ', res);
  		this.userData = res;
  	});
  }

}
