import { Component, OnInit } from '@angular/core';
import { Registration, Login } from './registration';
import { ApiHandlerService } from '../shared/api-handler.service';
import { ConfiguratorService } from '../shared/configurator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public regModal: Registration;
  public loginModal: Login;
  public confirm_password: string;

  constructor(private apiService: ApiHandlerService, private router: Router, private configurtorService: ConfiguratorService) {}

  ngOnInit() {
  	this.regModal = new Registration({
  		full_name: '',  		
  		emai: '',
  		password: "",  		
  		role: 'individual',
      phone_number: ''
  	});
    this.loginModal = new Login({
      emai: '',
      password: ''
    });
    this.confirm_password = '';
  }

  setAuthConfig(token, username) {
    localStorage.setItem('authorizedToken', token);
      localStorage.setItem('username', username);
      let authDataToSet = {
        username: username,
        isLoggedin: token ? true : false
      }
      this.configurtorService.setConfiguratorData(authDataToSet);
      this.router.navigate(['/add-property']);
  }

  register({ value, valid}: { value: Registration, valid: boolean}) {
  	this.regModal = value;
  	this.apiService.post('/api/v1/user/register', this.regModal).subscribe((res) => {
       if (res.success) {
         this.setAuthConfig(res.data.token, res.data.userDetails.full_name);
       } else {
         alert(res.msg);
       }
    })
  }

  login({value, valid}: {value: any, valid: boolean}) {
    this.loginModal = value;
    this.apiService.post('/api/v1/user/login', this.loginModal).subscribe((res) => {
      if (res.success)
        this.setAuthConfig(res.data.token, res.data.userDetails.full_name);
      else {
        alert(res.msg);
      }
    })
  }

}
