import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  {path:'entry' , loadChildren: () => import('./entry/entry.module').then(m => m.EntryModule) },
  {path:'play' , loadChildren: () => import('./play/play.module').then(m => m.PlayModule) },
  {path:'work' , loadChildren: () => import('./routine-work/routine-work.module').then(m => m.RoutineWorkModule) , canActivate:[AuthGuard] },
  {path:'' , component:HomeComponent},
  {path:'**' , component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
