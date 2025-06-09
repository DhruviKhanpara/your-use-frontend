import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { faChevronRight,faPhoneAlt,faEnvelope,faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { ToasterService } from '../services/toaster.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any = "";
  iconArrow=faChevronRight;
  iconcall=faPhoneAlt;
  iconmail=faEnvelope;
  iconback=faArrowCircleUp;
  
  constructor(private api : ApiService, private toast : ToasterService) { }

  error_messages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'email like abc@gmail.com' },
    ],
    mobile: [
      { type: 'required', message: 'Mobile number required.'},
      { type: 'pattern', message: 'Mobile no. must have 10 digit'}
    ]
  };
  
  ngOnInit(): void {
    this.api.reloadUser();
    this.user = localStorage.getItem('login');
  }
  loginwarn(){
    this.toast.showWarning('First login Yourself Then only you can move forword', '');
  }
  contect = new FormGroup({
    fname:new FormControl('',[Validators.required]),
    lname:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    mobile:new FormControl('',[Validators.required, Validators.pattern('[0-9]{10}')]),
    msg:new FormControl('',[Validators.required])
  })
  get f(){
    return this.contect.controls;
  }

}
