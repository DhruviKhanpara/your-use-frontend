import { Component, OnInit } from '@angular/core';

import party from "party-js";

@Component({
  selector: 'app-play-with-card',
  templateUrl: './play-with-card.component.html',
  styleUrls: ['./play-with-card.component.css']
})
export class PlayWithCardComponent implements OnInit {

  numbers1: any = [];
  numbers2: any = [];
  cards: any = [];
  selectCount = 0;
  selectedCard: any = [];
  selectedCardId: any = [];
  displayCard: any = [];
  match = false;
  flipcount = 0;
  yourcount = 0;
  mycount = 0;
  tog = 0;
  yourTurn = true;
  autoplay = false;
  confetti:any = '';
  analyticsCard:any = [];
  analyticsId:any = [];

  constructor() {
    this.numbers1 = Array.from({ length: 21 }, (_, i) => i + 1);
    this.numbers2 = Array.from({ length: 21 }, (_, i) => i + 1);
    this.cards = this.numbers1.concat(this.numbers2);
  }

  ngOnInit(): void {
    this.newGame();
  }
  change(e: any) {
    if (e.checked) this.autoplay = true;
    else if (!e.checked) this.autoplay = false;
  }
  changeturn(e: any){
    if(e.value == 't1')  this.yourTurn = true;
    else if(e.value == 't2')  this.yourTurn = false;
  }
  automove(){
    this.disableopt(true);
    this.autoflip(0);
  }

  newGame() {
    this.cards = this.shuffle(this.cards);
    this.displayCard = new Array().fill(null);
    this.selectedCard = new Array().fill(null);
    this.selectedCardId = new Array().fill(null);
    this.match = false;
    this.selectCount = 0;
    this.flipcount = 0;
    this.autoplay = false;
    this.yourcount = 0;
    this.mycount = 0;
    this.tog = 0;
    this.yourTurn = true;
    clearInterval(this.confetti);
    document.getElementsByTagName("input")[1].disabled = false;
    document.getElementsByTagName("input")[1].checked = false;
  }
  shuffle(array: any) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  flip(value: any, id: any) {
    if(this.autoplay == true) this.disableopt(true);
    else if(this.autoplay == false) document.getElementsByTagName("input")[1].disabled = true;

    if (!this.selectedCard.includes(value) && !this.displayCard.includes(value) && this.yourTurn == true) {
      this.selectedCard[this.selectCount] = this.analyticsCard[this.selectCount] = value;
      this.selectedCardId[this.selectCount] = this.analyticsId[this.selectCount] = id;
      this.flipcount++;

      if (this.selectCount == 0) this.selectCount = 1;
      else if (this.selectCount == 1) {
        this.selectCount = 0;

        this.match = this.checkForMatch();

        if (this.match == false) {
          setTimeout(() => {
            this.selectedCard.fill(null);
            this.selectedCardId.fill(null);
            if (this.autoplay == true) {
              this.yourTurn = !this.yourTurn;
              this.tog = 0;
              this.autoflip(0);
            }
          }, 1000);
        } else if (this.match == true) {
          this.mycount++;
          this.displayCard.push(this.selectedCard[0]);
          this.displayCard.push(this.selectedCard[1]);
          if(this.displayCard.length==42){
            this.showconfetti();
          }
          if (this.autoplay == true && this.displayCard.length !=42) {
            this.yourTurn = !this.yourTurn;
            this.tog = 0;
            this.autoflip(0);
          }
        }
      }
    }
  }
  autoflip(...id:any) {
    while (this.tog == 0) {
      let idxx:any;

      if(id == 0) idxx = Math.floor(Math.random() * 42);
      else idxx = Number(id);

      if (!this.selectedCard.includes(idxx) && !this.displayCard.includes(idxx) && this.yourTurn == false) {
        this.selectedCard[this.selectCount] = idxx;
        this.selectedCardId[this.selectCount] = this.cards[idxx];

        if (this.selectCount == 0) {
          this.selectCount = 1;

          if(this.analyticsId[0] == this.selectedCardId[0] && this.analyticsCard[0] != this.selectedCard[0]){
            this.autoflip(this.analyticsCard[0])
          }else if(this.analyticsId[1] == this.selectedCardId[0] && this.analyticsCard[1] != this.selectedCard[0]){
            this.autoflip(this.analyticsCard[1]);
          }else{
            this.autoflip(0);
          }
        }
        else if (this.selectCount == 1) {
          this.selectCount = 0;
          this.yourTurn = !this.yourTurn;

          this.match = this.checkForMatch();

          if (this.match == false) {
            setTimeout(() => {
              this.selectedCard.fill(null);
              this.selectedCardId.fill(null);
            }, 1000);
          } else if (this.match == true) {
            this.yourcount++;
            this.displayCard.push(this.selectedCard[0]);
            this.displayCard.push(this.selectedCard[1]);
            if(this.displayCard.length==42){
              this.showconfetti();
            }
          }
          this.tog = 1;
        }
      }
    }
  }
  checkForMatch() {
    if (this.selectedCardId[0] === this.selectedCardId[1])
      return true;
    else
      return false;
  }
  disableopt(val: any){
    document.getElementsByTagName("input")[1].disabled = val;
    document.getElementsByTagName("input")[2].disabled = val;
    document.getElementsByTagName("input")[3].disabled = val;
  }
  showconfetti(){
    this.confetti=setInterval(function() {
      party.confetti(document.getElementsByTagName("div")[1], {
        count: party.variation.range(20, 40),
      });
    }, 250);
    
    setTimeout(() => {
      clearInterval(this.confetti);
    }, 5000);
  }

}