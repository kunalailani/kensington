import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfiguratorService } from '../shared/configurator.service';
import { Router } from '@angular/router';
import { ApiHandlerService } from '../shared/api-handler.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input () headerData: any;
  @Input () isHidden: boolean;

  public isLoggedin: boolean;
  public username: string;
  public menus: Array<any> = [];
  isSearchBarHidden: boolean = false;
  search_img = localStorage.getItem('search_image');
  section_title: string;

  constructor(private configurtorService: ConfiguratorService, private router: Router, private apiHandlerService: ApiHandlerService,
    private titleService: Title) { 
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
      $('.navbar-toggle').click(function(e) {        
        e.preventDefault();
        if ($('#navbar').hasClass('in')) {
          $('#navbar').removeClass('in');
        }
        else {
          $('#navbar').addClass('in');
        }
      });
      $('.dropdown-menu li').hover(function() {
        $(this).parent().parent().find('> a').css('color', '#009245');
      }, function() {
        $(this).parent().parent().find('> a').css('color', '#333');
      })      
    }, 500);    
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
      setTimeout(() => {
        $('#navbar > .nav > .dropdown').each(function() {
          $(this).on('click', function() {         
            $(this).toggleClass('expand-menu');
            $('#navbar .nav .dropdown').not(this).removeClass('expand-menu');
          });
        });
        $('.dropdown-menu li').click(function() {
          $('.navbar-collapse').removeClass('in');
        })
      }, 500)
    });
  }

  logout() {
    let logoutDecision = confirm("Are you sure you want to logoout");
    if (logoutDecision) {
      //localStorage.clear();
      localStorage.removeItem('username');
      localStorage.removeItem('authorizedToken');
      localStorage.removeItem('user_id');
      this.configurtorService.setConfiguratorData({});
      this.router.navigate(['/']);
    }
  }

  redirectToAppPage(slug, menu_type, parent_menu, featured_image, title) {    
    if (featured_image) {
      localStorage.setItem('search_image', featured_image);
    }
    this.section_title = title;
    this.titleService.setTitle(title);
    if (menu_type == 'page') {
      this.router.navigate(['page', parent_menu, slug])
    } else if (menu_type == 'form_page') {      
      this.router.navigate(['', slug]);
    } else {
      let quertyString = slug.split('?')[1];
      let splitQuertyString = quertyString.split('&');
      let property_type = splitQuertyString[0].split('=')[1];
      let property_by_role = splitQuertyString[1].split('=')[1];
      let is_onRent = splitQuertyString[2].split('=')[1];
      let residential_and_commercial = splitQuertyString[3].split('=')[1];      
      this.router.navigate(['property', property_type, property_by_role, is_onRent, residential_and_commercial]);
    }    
  }
}