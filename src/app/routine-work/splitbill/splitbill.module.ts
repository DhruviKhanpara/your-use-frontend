import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SplitbillRoutingModule } from './splitbill-routing.module';
import { SplibillhomeComponent } from './splibillhome/splibillhome.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { EditGroupComponent } from './edit-group/edit-group.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SplibillhomeComponent,
    CreateGroupComponent,
    AddMemberComponent,
    GroupPageComponent,
    EditGroupComponent
  ],
  imports: [
    CommonModule,
    SplitbillRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ]
})
export class SplitbillModule { }
