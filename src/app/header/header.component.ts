import { Component, OnInit } from '@angular/core';
import { ConfiguratorService } from '../shared/configurator.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedin: boolean;
  public username: string;

  constructor(private configurtorService: ConfiguratorService) { 
  	this.getLoginData(); 
  }

  ngOnInit() {  	 
  	this.configurtorService.dataChange().subscribe((data) => {
  		this.username = data.username;
  		this.isLoggedin = data.isLoggedin
  	})
  }

  getLoginData() {  
  	this.username = localStorage.getItem('username');
  	this.isLoggedin = localStorage.getItem('authorizedToken') ? true : false;
  }

  logout() {
    let logoutDecision = confirm("Are you sure you want to logoout");
    if (logoutDecision) {
      localStorage.clear();
      this.configurtorService.setConfiguratorData({});
    }
  }
}