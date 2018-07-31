import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ConfiguratorService } from '../shared/configurator.service';
import { Router } from '@angular/router';
import { ApiHandlerService } from '../shared/api-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input () headerData: any;

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

  ngAfterViewInit() {
    setTimeout(() => {
      $('#navbar > .nav > .dropdown').each(function() {
        $(this).on('click', function() {
          $(this).toggleClass('expand-menu');
          $('#navbar .nav .dropdown').not(this).removeClass('expand-menu');
        });
      });
    }, 500)
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

  redirectToAppPage(slug) {
    let quertyString = slug.split('?')[1];
    let splitQuertyString = quertyString.split('&');
    let property_type = splitQuertyString[0].split('=')[1];
    let property_by_role = splitQuertyString[1].split('=')[1];
    let is_onRent = splitQuertyString[2].split('=')[1];
    let residential_and_commercial = splitQuertyString[3].split('=')[1];
    console.log(property_type, property_by_role, is_onRent);
    this.router.navigate(['property', property_type, property_by_role, is_onRent, residential_and_commercial]);
  }
}