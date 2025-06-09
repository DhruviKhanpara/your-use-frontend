import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router, private toast: ToasterService) { }

  url = 'http://localhost:8080';
  isLogin = new BehaviorSubject<boolean>(false);

  loginService(data: any, from: any) {
    this.http
      .post(`${this.url}/login`, data, { observe: 'response' })
      .subscribe((res: any) => {
        if (res.body.msg == "false") {
          this.toast.showError("Your login credentials are wrong, Please try again", '');
        } else {
          this.isLogin.next(true);

          localStorage.setItem('login', JSON.stringify({ "authentication": res.body.authentication, "uid": res.body.uid, "user": res.body.user}));
          this.move(from);
        }
      });
  }
  registerService(data: any, from: any) {
    this.http
      .post(`${this.url}/register`, data, { observe: 'response' })
      .subscribe((res: any) => {
        if (res.body.msg == "false") {
          this.toast.showError("Change Username or password it is already assigned", '');
        } else {
          this.isLogin.next(true);
          localStorage.setItem('login', JSON.stringify({ "authentication": res.body.authentication, "uid": res.body.uid,"user":res.body.user}));
          this.move(from);
        }
      });
  }
  todoListService() {
    let data: any = localStorage.getItem('login');
    return this.http.post(`${this.url}/todoList`, JSON.parse(data), { observe: 'response' });
  }
  todoTypeSwipService(data: any) {
    this.http.put(`${this.url}/changeTodoType`, data, { observe: "response", responseType: "text" }).subscribe((res) => {
      console.log(res.body);
    });
  }
  todoAddService(data: any) {
    this.http.post(`${this.url}/addTodo`, data, { observe: 'response', responseType: "text" }).subscribe((res) => {
      console.log(res.body);
    });
  }
  todoDeleteService(id: Number) {
    return this.http.delete(`${this.url}/todoDelete/${id}`, { observe: "response", responseType: "text" });
  }
  expensesListService() {
    let data: any = localStorage.getItem('login');
    return this.http.post(`${this.url}/expenseList`, JSON.parse(data), { observe: 'response' });
  }
  expenseAddService(data: any) {
    this.http.post(`${this.url}/addExpense`, data, { observe: 'response', responseType: "text" }).subscribe((res) => {
      console.log(res.body);
    });
  }
  expensesDeleteService(id: Number) {
    return this.http.delete(`${this.url}/expenseDelete/${id}`, { observe: "response", responseType: "text" });
  }
  earningService() {
    let data: any = localStorage.getItem('login');
    return this.http.post(`${this.url}/getEarning`, JSON.parse(data), { observe: 'response' });
  }
  changeEarnService(data: any) {
    this.http.put(`${this.url}/changeEarning`, data, { observe: 'response', responseType: "text" }).subscribe((res) => {
      console.log(res.body);
    });
  }
  changePasswordService(data:any){
    this.http.put(`${this.url}/changepass`, data, {observe: "response", responseType: "text"}).subscribe((res) => {
      console.log(res.body);
    });
  }
  groupListService(){
    let data: any = localStorage.getItem('login');
    return this.http.post(`${this.url}/groupList`, JSON.parse(data), { observe: 'response' });
  }
  groupbyIdService(data:any){
    return this.http.post(`${this.url}/groupbyid`, data, { observe: 'response'});
  }
  addgroupService(data:any){
    return this.http.post(`${this.url}/creategroup`, data, { observe: 'response' });
  }
  groupPageDataService(data:any){
    return this.http.post(`${this.url}/grouppageinfo`,data, {observe: 'response'});
  }
  addSpendingService(data:any){
    this.http.post(`${this.url}/createSpending`,data, {observe: 'response', responseType: 'text'}).subscribe((res) => {
      console.log(res.body)
    });
  }
  addmemberService(data:any){
    return this.http.put(`${this.url}/addmember`, data, { observe: 'response', responseType: 'text'});
  }
  groupDeleteService(id:Number){
    return this.http.delete(`${this.url}/deleteGroup/${id}`, { observe: 'response', responseType: 'text' });
  }
  spendingDeleteService(id:any){
    return this.http.delete(`${this.url}/deleteSpending/${id}`, { observe: 'response', responseType: 'text' });
  }
  groupEditService(data:any){
    this.http.put(`${this.url}/editgroup`, data, { observe: 'response', responseType: 'text'}).subscribe((res) => {
      console.log(res.body);
    });
  }

  reloadUser(...from: any) {
    if (localStorage.getItem('login')) {
      this.isLogin.next(true);
      if (from.length !== 0) {
        this.move(from);
      }
    } else {
      this.isLogin.next(false);
    }
  }
  move(from: any) {
    if (from == 1) {
      this.router.navigate(['work/todo']);
    } else if (from == 2) {
      this.router.navigate(['work/budget']);
    } else if (from == 0) {
      this.router.navigate(['']);
    } else if(from == 3) {
      this.router.navigate(['work/split/bill']);
    }
  }

}
