import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  formdata:any = [];

  constructor(private api:ApiService, private activateroute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    let data:any=localStorage.getItem('login');
    this.api.groupbyIdService({
      "authentication":JSON.parse(data).authentication,
      "gid":this.activateroute.snapshot.paramMap.get('id')
    }).subscribe((res) => {
      this.formdata = res.body;
      this.handelData();
    })
  }
  handelData(){
    this.formdata.member.splice(0,1);
    this.group.patchValue({
      "name":this.formdata.name,
      "discription":this.formdata.discription,
      "members":this.formdata.member
    });
  }

  group = new FormGroup({
    name:new FormControl('',[Validators.required]),
    discription:new FormControl('',[Validators.required]),
    members:new FormControl('',[Validators.required])
  })
  get f(){
    return this.group.controls;
  }

  editGroup(){
    let data:any = localStorage.getItem('login');
    this.group.value.members=this.formdata.createBy+","+this.group.value.members;
    this.api.groupEditService({
      "authentication":JSON.parse(data).authentication,
      "data":{
        "gid": this.activateroute.snapshot.paramMap.get('id'),
        "createBy": this.formdata.createBy,
        "name": this.group.value.name,
        "discription": this.group.value.discription,
        "member": this.group.value.members?.split(",")
      }
    });
    this.router.navigate(['/split/bill']);
  }

}
