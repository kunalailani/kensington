import { Component, OnInit } from '@angular/core';
import { ApiHandlerService } from '../shared/api-handler.service';
import { ConfiguratorService } from '../shared/configurator.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./login.component.css']
})

export class ResetPasswordComponent implements OnInit {

  public resetPassObj: any = {};
  acctId: any;

  constructor(private apiService: ApiHandlerService, private router: Router, private configurtorService: ConfiguratorService, 
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {    
  	this.activatedRoute.params.subscribe(params => {
      this.acctId = params['id'];
    });
  }

  resetPassword() {
    console.log(this.resetPassObj);
    if (this.resetPassObj.password !== this.resetPassObj.cnf_password) {
      alert("Password do not match");
      return false;
    } 
    var resetPassParameter = {
      'id': this.acctId, 
      'password': this.resetPassObj.password
    }   
    this.apiService.post('/api/v1/user/reset-password', resetPassParameter).subscribe((res) => {
      if (!res.success) {
        alert(res.msg)
      } else {
        alert(res.msg);
        this.router.navigate(['/login']);
      }
    })
  }

}
