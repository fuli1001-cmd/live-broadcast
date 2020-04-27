import { Component, OnInit } from '@angular/core';
import { PodcasterService } from '../../services/podcaster.service';
import { Podcaster } from '../../models/podcaster';

@Component({
  selector: 'app-podcaster-board',
  templateUrl: './podcaster-board.component.html',
  styleUrls: ['./podcaster-board.component.css']
})
export class PodcasterBoardComponent implements OnInit {
  podcasters: Podcaster[];
  displayType: DisplayTypesEnum;
  DisplayTypes = DisplayTypesEnum;

  constructor(private podcasterService: PodcasterService) { }

  ngOnInit(): void {
    this.getPodcasters();
    this.displayType = DisplayTypesEnum.Hot;
  }

  async getPodcasters(): Promise<void> {
      this.podcasters = await this.podcasterService.getPodcasters();
  }

  onClickHot(): void {
    this.displayType = DisplayTypesEnum.Hot;
  }

  onClickFollowed(): void {
    this.displayType = DisplayTypesEnum.Followed;
  }
}

export enum DisplayTypesEnum {
  Hot,
  Followed
};
