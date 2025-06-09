import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { PlayWithCardComponent } from './play-with-card/play-with-card.component';

const routes: Routes = [
  {path : 'tictactoe', component:TicTacToeComponent},
  {path : 'cardGame', component:PlayWithCardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
