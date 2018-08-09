import { Component, OnInit } from '@angular/core';
import { ConfiguratorService } from '../shared/configurator.service';
import { environment } from '../../environments/environment';
import { ApiHandlerService } from '../shared/api-handler.service';


@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchPropertyComponent implements OnInit {

  public searchPropertyList: any = {};

  public baseUri: string = environment.api_url + '/property-details/';
  recommended_offers: string = "";

  constructor(private configuratorService: ConfiguratorService, private apiHandlerService: ApiHandlerService) { }

  ngOnInit() {
    /*this.configuratorService.searchDataChange().subscribe((data) => {
      console.log(data);
      this.searchPropertyList = data;
    }) */ 	
    this.searchPropertyList = this.configuratorService.getSearchDataResult();
    console.log(this.searchPropertyList);
  }

  applyFilter(recommended_offers) {
    let filter_column = recommended_offers.split("_")[0];
    let filter_order = recommended_offers.split("_")[1];

    this.apiHandlerService.get('/api/v1/property/list-property?filter_column=' + filter_column + '&filter_order=' + filter_order).subscribe((res) => {
      console.log(res);
      this.searchPropertyList = res;
    });
  }

}
