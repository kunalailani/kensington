import { Component, OnInit } from '@angular/core';
import { ConfiguratorService } from '../shared/configurator.service';
import { Router } from '@angular/router';
import { ApiHandlerService } from '../shared/api-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isLoggedin: boolean;
  public username: string;
  public menus: Array<any> = [];

  constructor(private configurtorService: ConfiguratorService, private router: Router, private apiHandlerService: ApiHandlerService) { 
  	this.getLoginData(); 
  }

  ngOnInit() {  	 
  	this.configurtorService.dataChange().subscribe((data) => {
  		this.username = data.username;
  		this.isLoggedin = data.isLoggedin
  	})
    this.fetchMenus();
  }

  getLoginData() {  
  	this.username = localStorage.getItem('username');
  	this.isLoggedin = localStorage.getItem('authorizedToken') ? true : false;
  }

  fetchMenus() {
    this.apiHandlerService.get('/api/v1/menus/header-menus').subscribe((res) => {      
      for (let key in res.data) {
        this.menus.push({'main_menu': key, 'sub_menu': res.data[key]});
      }
      console.log(this.menus);
    });
  }

  logout() {
    let logoutDecision = confirm("Are you sure you want to logoout");
    if (logoutDecision) {
      localStorage.clear();
      this.configurtorService.setConfiguratorData({});
      this.router.navigate(['/']);
    }
  }
}