import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiHandlerService } from '../shared/api-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamicpage',
  templateUrl: './dynamicpage.component.html',
  styleUrls: ['./dynamicpage.component.css']
})
export class DynamicpageComponent implements OnInit {

  public dynamicContent: string;
  public slugName: string;
  public variousPropertyList: Array<any> = [];
  public hideSearchBar: boolean = false;
  search_img: string = localStorage.getItem('search_image');

  constructor(private apiHandlerService: ApiHandlerService, private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {      
      this.slugName = this.activatedRoute.snapshot.paramMap.get('slug');
      var parent_menu = this.activatedRoute.snapshot.paramMap.get('parent');
      this.titleService.setTitle(this.slugName);
      if (parent_menu == 'Finanzierungsservice') {
        this.hideSearchBar = true;
      } else {
        this.hideSearchBar = false;
      }
      this.fetchDynamicContent(this.slugName);
    });
  }

  fetchDynamicContent(slugName) {    
  	this.apiHandlerService.get('/api/v1/page/get-page-by-slug/' + slugName).subscribe((res) => {
       this.dynamicContent = res.data;
     })
  }  
}
