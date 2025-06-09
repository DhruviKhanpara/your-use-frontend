import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  move:any;
  groupdata:any;

  constructor(private api:ApiService,private router:Router,private toast:ToasterService) { }

  ngOnInit(): void {
  }

  group = new FormGroup({
    name:new FormControl('',[Validators.required]),
    gpdcr:new FormControl('',[Validators.required]),
    membr:new FormControl('',[Validators.required]),
  })
  get f(){
    return this.group.controls;
  }
  create(){
    let data:any = localStorage.getItem('login');
    if(this.group.value.membr == JSON.parse(data).user){
      this.toast.showError("Add member other then you",'');
    }else {
      this.group.value.membr=JSON.parse(data).user+","+this.group.value.membr;
      this.api.addgroupService({
        "authentication":JSON.parse(data).authentication,
        "data":{
          "gid":-1,
          "createBy":JSON.parse(data).user,
          "name":this.group.value.name,
          "discription":this.group.value.gpdcr,
          "member":this.group.value.membr?.split(",")
        }
      }).subscribe((res) => {
        this.move=res.body;
        if(this.move.msg == "member"){
          this.toast.showError("User invalid",'');
        } else if(this.move.msg == "name"){
          this.toast.showError("Group name is already used",'');
        }else{
          this.group.reset();
          this.router.navigate(['/work/split/group/'+this.move.gid]);
        }
      });
    }
  }

}
