import { Component, OnInit } from '@angular/core';
import { ConfiguratorService } from '../shared/configurator.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchPropertyComponent implements OnInit {

  public searchPropertyList: any;

  public baseUri: string = environment.api_url + '/property-details/';
  recommended_offers: string = "";

  constructor(private configuratorService: ConfiguratorService) { }

  ngOnInit() {
  	this.searchPropertyList = this.configuratorService.getSearchDataResult();
  }

}
