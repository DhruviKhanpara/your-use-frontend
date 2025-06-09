import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

import { 
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  iconnot = faEyeSlash;
  iconshow = faEye;
  show1 = false;
  password1 = "password";
  show2 = false;
  password2 = "password";

  constructor(private api : ApiService,protected actrouter:ActivatedRoute) { }
  
  ngOnInit(): void {
  }

  error_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'email like abc@gmail.com' },
    ]
  };
  register = new FormGroup({
    name:new FormControl('',[Validators.required]),
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password:new FormControl('',[Validators.required]),
    confirmpass:new FormControl('',[Validators.required]),
  })
  get f(){
    return this.register.controls;
  }
  userregister(){
    let data=this.register.value;
    let payload = {
      uid:-1,
      name:data.name,
      username:data.username,
      email:data.email,
      password:data.password,
      earning:0
    }
    if(data.password === data.confirmpass){
      this.api.registerService(payload,this.actrouter.snapshot.paramMap.get('from'));
      this.register.reset();
    }else{
      alert("password mismatch");
    }
  }
  passshow1(){
    if(this.show1 == true)  this.password1 = "password";
    else if(this.show1 == false)  this.password1 = "text";
    this.show1 = !this.show1;
  }
  passshow2(){
    if(this.show2 == true)  this.password2 = "password";
    else if(this.show2 == false)  this.password2 = "text";
    this.show2 = !this.show2;
  }

}
