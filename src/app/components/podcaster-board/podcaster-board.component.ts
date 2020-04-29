import { Component, OnInit } from '@angular/core';
import { PodcasterService } from '../../services/podcaster.service';
import { Podcaster } from '../../models/podcaster';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';

@Component({
  selector: 'app-podcaster-board',
  templateUrl: './podcaster-board.component.html',
  styleUrls: ['./podcaster-board.component.css']
})
export class PodcasterBoardComponent implements OnInit {
  podcasters: Podcaster[];
  displayType: DisplayTypesEnum;
  DisplayTypes = DisplayTypesEnum;

  constructor(private podcasterService: PodcasterService, private podcasterEventService: PodcasterEventService) { }

  ngOnInit(): void {
    this.getPodcasters();
    this.displayType = DisplayTypesEnum.Hot;
  }

  async getPodcasters(): Promise<void> {
      this.podcasters = await this.podcasterService.getPodcasters();
      if (this.podcasters.length > 0)
        this.podcasterEventService.selectPodcaster(this.podcasters[0]);
      console.log(this.podcasters);
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
