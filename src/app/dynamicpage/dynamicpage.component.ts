import { Component, OnInit } from '@angular/core';
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

  constructor(private apiHandlerService: ApiHandlerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.slugName = this.activatedRoute.snapshot.paramMap.get('slug');
      this.fetchDynamicContent(this.slugName);
    });    
  }

  fetchDynamicContent(slugName) {
  	this.apiHandlerService.get('/api/v1/page/get-page-by-slug/' + slugName).subscribe((res) => {
       console.log('dynamicContent', res);
       this.dynamicContent = res.data;
     })
  }  
}
