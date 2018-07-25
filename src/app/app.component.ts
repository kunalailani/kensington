import { Component, OnInit  } from '@angular/core';
import { LoaderService } from './shared/loader.service';
import { ApiHandlerService } from './shared/api-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  objLoaderStatus: boolean;
  public headerObj: any;

  constructor(private loaderService: LoaderService, private apiHandlerService: ApiHandlerService) {

  }
  ngOnInit() {
  	this.loaderService.loaderStatus.subscribe((val: boolean) => {
  		this.objLoaderStatus = val;
  	})
    this.fetchHeaderFooterSettings();
  }

  fetchHeaderFooterSettings() {
    this.apiHandlerService.get('/api/v1/header-footer/settings').subscribe((res) => {
      this.headerObj = res.data;
      //localStorage.setItem('search_image', res.data.search_img)
    })
  }


}
