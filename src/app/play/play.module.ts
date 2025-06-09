import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { PlayWithCardComponent } from './play-with-card/play-with-card.component';

// import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    TicTacToeComponent,
    PlayWithCardComponent,
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
    // DragDropModule,
  ]
})
export class PlayModule { }
