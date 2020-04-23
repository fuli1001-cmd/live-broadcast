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
    this.podcasters = await this.podcasterService.getPodcasters(23001);
    console.log(this.podcasters);
  }
}
