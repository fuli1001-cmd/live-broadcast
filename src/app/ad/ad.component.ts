import { Component, OnInit } from '@angular/core';
import { AdService } from '../services/ad.service';
import { AuthService } from '../services/auth.service';
import * as pako from "pako";

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit {

  constructor(private adService: AdService, private authService: AuthService) { }

  ngOnInit(): void {
    // console.log("init");
    // this.getGames();
  }

  getGames(): void {
    //this.login();
    // this.adService.getGames()
    //   .subscribe(games => this.games = games);
  }

  add(): void {
      //let game = {
      //    name: "game3",
      //    smallBlind: 3,
      //    struddle: true,
      //    preBet: false,
      //    insurance: true,
      //    numberOfSeat: 9,
      //    startingThreshold: 3,
      //    duration: 2
      //};
      //this.adService.addGame(game as Game)
      //      .subscribe(game => {
                
      //      });
    }

  //async login(): Promise<void> {
  //  let data = await this.authService.login(23001);
  //  let buffer = await data.arrayBuffer();
  //  let uint8View = new Uint8Array(buffer);
  //  let result = pako.inflate(uint8View, {to:'string'});
  //  console.log(result);
  //}
}
