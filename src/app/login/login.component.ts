import { Component, OnInit } from '@angular/core';
import { Registration } from './registration';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private regModal: Registration;
  constructor() {}

  ngOnInit() {
  	this.regModal = new Registration({
  		full_name: '',
  		user_name: '',
  		emai: '',
  		pwd: "",
  		confirmpwd: '',  		
  		user_role: '0'
  	});
  }

  register({ value, valid}: { value: Registration, valid: boolean}) {
  	this.regModal = value;
  	console.log(this.regModal);
  	console.log("valid form" + valid);
  }

}
