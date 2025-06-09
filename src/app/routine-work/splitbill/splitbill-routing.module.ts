import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SplibillhomeComponent } from './splibillhome/splibillhome.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { EditGroupComponent } from './edit-group/edit-group.component';

const routes: Routes = [
  { path:'bill' , component: SplibillhomeComponent},
  { path:'createGroup' , component: CreateGroupComponent},
  { path: 'addmember' , component: AddMemberComponent},
  { path:'group/:id' , component:GroupPageComponent},
  { path:'editGroup/:id' , component:EditGroupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplitbillRoutingModule { }
