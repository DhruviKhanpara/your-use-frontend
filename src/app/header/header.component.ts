import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

import { 
  faHome,
  faChessBoard,
  faPhoneAlt,
  faTasks,
  faPiggyBank,
  faUser,
  faIcons,
  faSignInAlt,
  faSignOutAlt,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  iconHome=faHome;
  iconGamepad=faChessBoard;
  iconPhone=faPhoneAlt;
  iconTodo=faTasks;
  iconBadge=faPiggyBank;
  iconBrain=faIcons
  iconAbout=faUser;
  iconLogin=faSignInAlt;
  iconLogout=faSignOutAlt;
  icongroupbill=faUsers

  constructor(private api : ApiService,private toast : ToasterService) { }
  
  ngOnInit(): void {
    this.api.reloadUser();
  }
  get user(){
    return localStorage.getItem('login');
  }
  logout(){
    localStorage.removeItem('login');
  }
  infocon(){
    this.toast.showInfo('Welcome, please share your experience, suggesion, or your doubte', '');
  }
  loginwarn(){
    this.toast.showWarning('First login Yourself Then only you can move forword', '');
  }
  infomeet(){
    this.toast.showInfo('Meet Our Heros and give your support always :)','');
  }

}
