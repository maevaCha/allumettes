import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  public matchesInit: number;
  public matches: number[];
  public player: boolean;
  public matchesChoiceComputer: number;
  public winningStr: string;
  constructor() { }


  ngOnInit() {
      this.matchesInit = Math.round(Math.random() * 9) + 16;
      this.matches = Array(this.matchesInit).fill(0).map((x, i) => i);
      this.player = !!Math.round(Math.random());
      if (this.player) {
        this.computerPlays();
      }
  }

  /* Quand le joueur a cliquer sur le nombre d'allumette choisit */
  public userPlays(num: number): void {
    if (this.matchesInit) {
      this.processEndOfTurn(num);
      this.computerPlays();
    }
  }

  /* Le choix de l'ordinateur, il doit laisser un multiple de 4 au joueur  */
  private computerPlays(): void {
    let found: boolean;
    if (this.matchesInit) {
      for (let i = 1; i < 4; i++) {
        if (Number.isInteger((this.matchesInit - i) / 4)) {
          this.processEndOfTurn(i);
          this.matchesChoiceComputer = i;
          found = true;
        }
      }
      if (!found) {
        const i = Math.round(Math.random() * 2) + 1;
        this.matchesChoiceComputer = i;
        this.processEndOfTurn(i);
      }
    }
  }

  private processEndOfTurn(num: number) {
    this.matchesInit = this.matchesInit - num;
    this.matches = Array((this.matchesInit)).fill(0).map((x, i) => i);
    if(!this.matchesInit){
      this.player ? this.winningStr = `Le gagnant est l'ordinateur` : this.winningStr = 'Bravo vous avez gagné !';
    }
    this.player = !this.player;
  }

}

