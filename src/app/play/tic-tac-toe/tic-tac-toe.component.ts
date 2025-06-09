import { Component, OnInit } from '@angular/core';

import party from "party-js";

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

  squares: any = [];
  xisNext = true;
  winner = '';
  isDrow = '';
  player = 1;
  turn = 1;
  counter = 0;
  yourTurn = true;
  autoplay = false;
  btn = true;
  xcard = [];
  ocard = [];
  winnerIndx: any = [];
  confetti:any = '';

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  changeopt(e: any) {
    if (e.value == 't1') {
      if (this.player == 1) this.xisNext = true;
      else if (this.player == 2) this.xisNext = false;
      this.turn = 1;
    } else if (e.value == 't2') {
      if (this.player == 1) this.xisNext = false;
      else if (this.player == 2) this.xisNext = true;
      this.turn = 2;
    }
  }
  changeplayer(e: any) {
    if (e.value == 'p1') {
      if (this.turn == 1) this.xisNext = true;
      else if (this.turn == 2) this.xisNext = false;
      this.player = 1;
    } else if (e.value == 'p2') {
      if (this.turn == 1) this.xisNext = false;
      else if (this.turn == 2) this.xisNext = true;
      this.player = 2;
    }
  }
  auto(e: any) {
    if (e.value === 'auto') {
      this.autoplay = true;
    } else {
      this.autoplay = false;
    }
    if ((this.player == 1 && this.turn == 1) || (this.player == 2 && this.turn == 1)) this.yourTurn = true;
    if ((this.player == 1 && this.turn == 2) || (this.player == 2 && this.turn == 2)) this.yourTurn = false;
  }
  newGame() {
    this.squares = Array(9).fill(null);
    if (this.turn == 1) this.xisNext = true;
    else if (this.turn == 0) this.xisNext = false;
    this.winner = '';
    this.counter = 0;
    this.isDrow = '';
    this.winnerIndx = [];
    this.changeRadio(false);
    this.xcard.length = 5;
    this.ocard.length = 5;
    this.autoplay = false;
    this.yourTurn = true;
    this.btn = true;
    this.clearOptions();
    clearInterval(this.confetti);
  }
  get Player() {
    return this.xisNext ? 'X' : 'O';
  }
  makeMove(idx: number) {
    if (this.winner == '' && this.isDrow == '' && this.yourTurn == true) {
      this.changeRadio(true);
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.Player);
        this.xisNext = !this.xisNext;
        if (this.autoplay == true) this.yourTurn = !this.yourTurn;
        this.counter++;
        if (this.Player == 'X') this.ocard.length--;
        else this.xcard.length--;
      }
      this.calculateWinner();
      if (!this.winner && this.counter == 9) {
        this.isDrow = 'Drow';
      }

      if (this.autoplay == true && this.yourTurn == false && !this.winner) {
        this.automove();
      }
    }
  }
  automove() {
    setTimeout(() => {
      this.btn = false;
      while (this.yourTurn == false) {
        let idxx = Math.floor(Math.random() * 9);
        if (!this.squares[idxx]) {
          this.squares.splice(idxx, 1, this.Player);
          this.xisNext = !this.xisNext;
          this.yourTurn = !this.yourTurn;
          this.counter++;
          if (this.Player == 'X') this.ocard.length--;
          else this.xcard.length--;
        }
      }
      this.calculateWinner();

      if (!this.winner && this.counter == 9) {
        this.isDrow = 'Drow';
      }
    }, 250);

  }
  calculateWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        this.winner = this.squares[a];
        this.winnerIndx = [a, b, c];
        this.showconfetti();
      }
    }
    return null;
  }
  changeRadio(value: any) {
    document.getElementsByTagName("input")[1].disabled = value;
    document.getElementsByTagName("input")[2].disabled = value;
    document.getElementsByTagName("input")[3].disabled = value;
    document.getElementsByTagName("input")[4].disabled = value;
    document.getElementsByTagName("input")[5].disabled = value;
  }
  clearOptions() {
    document.getElementsByTagName("input")[5].checked = false;
  }
  showconfetti() {
    this.confetti = setInterval(function () {
      party.confetti(document.getElementsByTagName("div")[1], {
        count: party.variation.range(20, 40),
      });
    }, 250);

    setTimeout(() => {
      clearInterval(this.confetti);
    }, 5000);
  }

}
