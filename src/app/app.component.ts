import { Component, OnInit  } from '@angular/core';
import { LoaderService } from './shared/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  objLoaderStatus: boolean;

  constructor(private loaderService: LoaderService) {

  }
  ngOnInit() {
  	this.loaderService.loaderStatus.subscribe((val: boolean) => {
  		this.objLoaderStatus = val;
  	})
  }
}
