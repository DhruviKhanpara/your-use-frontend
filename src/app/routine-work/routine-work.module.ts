import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutineWorkRoutingModule } from './routine-work-routing.module';
import { BudgetingComponent } from './budgeting/budgeting.component';
import { TodoComponent } from './todo/todo.component';
import { SplitbillModule } from './splitbill/splitbill.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    BudgetingComponent,
    TodoComponent
  ],
  imports: [
    CommonModule,
    RoutineWorkRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FontAwesomeModule,
    DragDropModule,
    SplitbillModule,
  ]
})
export class RoutineWorkModule { }
