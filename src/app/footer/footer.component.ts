import { Component, OnInit, Input } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input () footerData: any;
  @Input () isHidden: boolean;
  footerMenus: Array<any>;
  
  constructor(private apiHandlerService: ApiHandlerService) { }

  ngOnInit() {
  	this.fetchFooterLinks();
  }

  fetchFooterLinks() {
  	 this.apiHandlerService.get('/api/v1/menus/footer-links').subscribe((res) => {      
      this.footerMenus = res.data;
    });
  }

}
