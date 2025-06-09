import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { faTrash, faEdit, faUser,faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-splibillhome',
  templateUrl: './splibillhome.component.html',
  styleUrls: ['./splibillhome.component.css']
})
export class SplibillhomeComponent implements OnInit {

  icondelete=faTrash;
  iconedit=faEdit;
  iconuser=faUser;
  iconback=faArrowLeft;
  group:any;
  showmem=false;
  member:any;
  popup = false;
  did:any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.api.groupListService().subscribe((res) => {
      this.group=res.body;
    })
  }
  delete(id:Number){
    this.api.groupDeleteService(id).subscribe((res) => {
      console.log(res.body);
      this.getData();
    });
  }
  showmember(id:Number){
    this.showmem=true;
    this.member=this.group.filter((i: { gid: Number; }) => i.gid == id);
  }
  back(){
    this.showmem = false;
  }
  showpopup(id:Number){
    if(id!=0) this.did=id;
    this.popup = !this.popup;
    if(this.popup == false) this.delete(this.did);
  }

}
