import { Component, OnInit  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoaderService } from './shared/loader.service';
import { ModalService } from './shared/modal.service';
import { ApiHandlerService } from './shared/api-handler.service';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  objLoaderStatus: boolean;
  objModalStatus: boolean
  public headerObj: any;
  showSearchHeader: boolean = true;

  constructor(private loaderService: LoaderService, private apiHandlerService: ApiHandlerService, private modalService: ModalService, private router: Router) {
     this.router.events.pipe(filter((event) => event instanceof NavigationEnd),
      debounceTime(500)
    ).subscribe((val) => {
      console.log("router change", val);
      if (val['url'].split('/')[1] != "" && val['url'].split('/')[1] != 'page' && val['url'].split('/')[1] != 'login') {        
        this.subscribeModal();
      }
    })
  }
  ngOnInit() {
    this.modalService.modalStatus.subscribe((val: boolean) => {
      this.objModalStatus = val;
    })         
  	this.loaderService.loaderStatus.subscribe((val: boolean) => {
  		this.objLoaderStatus = val;
  	})
    
    this.fetchHeaderFooterSettings();
  }

  fetchHeaderFooterSettings() {
    this.apiHandlerService.get('/api/v1/header-footer/settings').subscribe((res) => {
      this.headerObj = res.data;
      localStorage.setItem('search_image', res.data.search_img)
    })
  }

  subscribeModal() {          
    if (!localStorage.getItem('username')) {
      setTimeout(() => {
        this.modalService.displayModal(true);
      }, 4000);
    }
  }


}
