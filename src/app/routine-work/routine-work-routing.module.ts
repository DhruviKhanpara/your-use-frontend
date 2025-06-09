import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoComponent } from './todo/todo.component';
import { BudgetingComponent } from './budgeting/budgeting.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path:'todo' , component:TodoComponent},
  {path:'budget' , component:BudgetingComponent},
  {path:'split' , loadChildren: () => import('./splitbill/splitbill.module').then(m => m.SplitbillModule) , canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutineWorkRoutingModule { }
