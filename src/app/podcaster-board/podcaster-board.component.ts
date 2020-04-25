import { Component, OnInit } from '@angular/core';
import { PodcasterService } from '../services/podcaster.service';
import { Podcaster } from '../models/podcaster';

@Component({
  selector: 'app-podcaster-board',
  templateUrl: './podcaster-board.component.html',
  styleUrls: ['./podcaster-board.component.css']
})
export class PodcasterBoardComponent implements OnInit {
  podcasters: Podcaster[];

  constructor(private podcasterService: PodcasterService) { }

  ngOnInit(): void {
    this.getPodcasters();
  }

  async getPodcasters(): Promise<void> {
      //this.podcasters = await this.podcasterService.getPodcasters(23001);
      this.podcasters = [
          {
              HostName: "dsd1",
              ShowId: '2131',
              IsFavorited: true,
              NumFans: 1,
              HostId: 1,
              CoverImage: 'http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1588153484&t=354a11caf0171d5953b05b27212f2457',
              Avatar: ''
          },
          {
              HostName: "dsd2",
              ShowId: '2132',
              IsFavorited: true,
              NumFans: 1,
              HostId: 2,
              CoverImage: 'http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853',
              Avatar: ''
          },
          {
              HostName: "dsd3",
              ShowId: '2133',
              IsFavorited: true,
              NumFans: 1,
              HostId: 3,
              CoverImage: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968',
              Avatar: ''
          }
      ];
    console.log(this.podcasters);
  }
}
