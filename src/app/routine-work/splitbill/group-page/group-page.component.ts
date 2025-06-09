import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

import { faTrashAlt,faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {

  iconTrash=faTrashAlt;
  iconback=faArrowLeft;
  groupdata:any = [{"name":''}];
  style = 'btn1';
  splitbill = false;
  totalmoney:any = 0;
  perPersonMoney:any = 0;
  perPersonTotal:any = [];
  personAccount:any = [];
  remaingMoney:any =0;
  d:any = localStorage.getItem('login');
  data = JSON.parse(this.d);

  constructor(private api:ApiService,private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    let data:any=localStorage.getItem('login');
    this.api.groupPageDataService({
      "authentication":JSON.parse(data).authentication,
      "gid":this.activatedroute.snapshot.paramMap.get('id')
    }).subscribe((res) => {
      this.groupdata=res.body;
    })
  }
  
  spend = new FormGroup({
    cost:new FormControl('',[Validators.required]),
    discription:new FormControl('',[Validators.required])
  })
  get f(){
    return this.spend.controls;
  }
  addspend(){
    let data:any = localStorage.getItem('login');
    this.api.addSpendingService({
      "authentication":JSON.parse(data).authentication,
      "data":{
        "lid":-1,
        "gid":this.activatedroute.snapshot.paramMap.get('id'),
        "membr":JSON.parse(data).user,
        "cost":this.spend.value.cost,
        "discription":this.spend.value.discription
      }
    });
    this.getData();
    this.spend.reset();
  }
  split(){
    this.splitbill = !this.splitbill;
    this.moneycount();
  }
  moneycount(){
    this.totalmoney= 0;
    this.perPersonMoney= 0;
    this.perPersonTotal = [];
    this.personAccount = [];
    this.remaingMoney =0;

    for(let i=0; i<this.groupdata[0].member.length; i++){
      let temp = 0;
      for(let j=1;j<this.groupdata.length;j++){
        if(this.groupdata[j].membr == this.groupdata[0].member[i]){
          temp+=this.groupdata[j].cost;
        }
        if(i == this.groupdata[0].member.length-1) this.totalmoney+=this.groupdata[j].cost;
      }
      this.perPersonTotal = [...this.perPersonTotal,temp];
    }
    this.perPersonMoney = Math.floor(this.totalmoney/this.groupdata[0].member.length);
    for(let i=0;i<this.perPersonTotal.length;i++){
      this.personAccount[i]=this.perPersonMoney-this.perPersonTotal[i];
      this.remaingMoney+=this.perPersonMoney-this.perPersonTotal[i];
    }
  }
  delete(id:number){
    this.api.spendingDeleteService(id).subscribe((res) => {
      console.log(res.body);
      this.getData();
    });
  }

}
