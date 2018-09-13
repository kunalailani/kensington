import { Component, OnInit, Input } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input () footerData: any;
  @Input () isHidden: boolean;
  footerMenus: Array<any>;
  
  constructor(private apiHandlerService: ApiHandlerService, private router: Router) { }

  ngOnInit() {
  	this.fetchFooterLinks();
  }

  fetchFooterLinks() {
  	 this.apiHandlerService.get('/api/v1/menus/footer-links').subscribe((res) => {      
      this.footerMenus = res.data;
    });
  }

  openInternalOrExternalLink(slug) {
    if (slug.includes('http')) {
      window.location.href = slug;
    } else {
      this.router.navigate(['/page', '', slug]);
    }
  }

}
