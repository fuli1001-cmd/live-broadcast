import { Component, OnInit } from '@angular/core';
import { AdService } from '../services/ad.service';
import { Game } from '../models/game';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  public games: Game[];

  constructor(private adService: AdService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.adService.getGames()
      .subscribe(games => this.games = games);
  }

  add(): void {
      let game = {
          name: "game3",
          smallBlind: 3,
          struddle: true,
          preBet: false,
          insurance: true,
          numberOfSeat: 9,
          startingThreshold: 3,
          duration: 2
      };
      this.adService.addGame(game as Game)
            .subscribe(game => {
                
            });
    }

}
