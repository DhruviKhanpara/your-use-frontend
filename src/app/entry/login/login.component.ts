import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

import { 
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  iconnot=faEyeSlash;
  iconshow=faEye;
  show = false;
  password = "password";

  constructor(private api:ApiService, protected actrouter:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.api.reloadUser(this.actrouter.snapshot.paramMap.get('from'));
  }
  
  error_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'email like abc@gmail.com' },
    ]
  };
  login = new FormGroup({
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password:new FormControl('',[Validators.required]),
  })
  get f(){
    return this.login.controls;
  }
  userlogin(){
    this.api.loginService(this.login.value , this.actrouter.snapshot.paramMap.get('from'));
    this.login.reset();
  }
  passshow(){
    if(this.show == true){
      this.password = "password";
    }else if(this.show == false){
      this.password = "text";
    }
    this.show = !this.show;
  }
  
}
