import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { 
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  iconnot=faEyeSlash;
  iconshow=faEye;
  show = false;
  showc = false;
  password = "password";
  passwordc = "password";

  constructor(private router: Router, protected activatedroute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
  }

  error_messages = {
    email: [
      { type: 'require', message: 'email is required' },
      { type: 'pattern', message: 'email like abc@gmail.com' },
    ]
  };

  changepass = new FormGroup({
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password:new FormControl('',[Validators.required]),
    confirmPass:new FormControl('',[Validators.required])
  })

  get f(){
    return this.changepass.controls;
  }

  passshow(){
    if(this.show == true){
      this.password = "password";
    }else if(this.show == false){
      this.password = "text";
    }
    this.show = !this.show;
  }
  passshowc(){
    if(this.showc == true){
      this.passwordc = "password";
    }else if(this.showc == false){
      this.passwordc = "text";
    }
    this.showc = !this.showc;
  }
  change(){
    let data=this.changepass.value;
    let storage:any = localStorage.getItem('login');
    let from = this.activatedroute.snapshot.paramMap.get('from');

    let payload = {
      email:data.email,
      username:data.username,
      password:data.password
    }
    if(data.password === data.confirmPass){
      this.api.changePasswordService(payload);
      this.changepass.reset();
      this.router.navigate(['/entry/login/'+from]);

    }else{
      alert("Password mismatch");
    }
  }

}
