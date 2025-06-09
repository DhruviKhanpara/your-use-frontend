import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  constructor(private api: ApiService,private router:Router,private tostr:ToasterService) { }

  ngOnInit(): void {
  }
  member = new FormGroup({
    gpname:new FormControl('',[Validators.required]),
    personuname:new FormControl('',[Validators.required]),
  })
  get f(){
    return this.member.controls;
  }
  addmember(){
    let data:any = localStorage.getItem('login');
    this.api.addmemberService({
      "authentication":JSON.parse(data).authentication,
      "member":this.member.value.personuname?.split(","),
      "gpname":this.member.value.gpname
    }).subscribe((res) => {
      if(res.body == 'done'){
        this.member.reset();
        this.router.navigate(['/work/split/bill']);
      }else if(res.body == 'exist'){
        this.tostr.showError('This member is already exist','');
      }else if(res.body == 'notvalidmember'){
        this.tostr.showError('This user is not Found','');
      }else if(res.body == 'notvalidgroup'){
        this.tostr.showError('This Group is not Found','');
      }
    });
  }

}
