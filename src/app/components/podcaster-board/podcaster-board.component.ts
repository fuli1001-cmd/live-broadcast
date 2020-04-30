import { Component, OnInit } from '@angular/core';
import { PodcasterService } from '../../services/data/podcaster.service';
import { Podcaster } from '../../models/podcaster';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';
import { AgoraEventService } from '../../services/events/agora-event.service';

@Component({
  selector: 'app-podcaster-board',
  templateUrl: './podcaster-board.component.html',
  styleUrls: ['./podcaster-board.component.css']
})
export class PodcasterBoardComponent implements OnInit {
  podcasters: Podcaster[];
  displayType: DisplayTypesEnum;
  DisplayTypes = DisplayTypesEnum;

  constructor(private podcasterService: PodcasterService, 
    private podcasterEventService: PodcasterEventService,
    private agoraEventService: AgoraEventService) { }

  ngOnInit(): void {
    this.registerAgoraEvent();
    this.getPodcasters();
    this.displayType = DisplayTypesEnum.Hot;
  }

  async getPodcasters(): Promise<void> {
      this.podcasters = await this.podcasterService.getPodcasters();
      this.podcasterEventService.sendPodcasters(this.podcasters);
      console.log(this.podcasters);
  }

  private registerAgoraEvent(): void {
      this.agoraEventService.PeersOnlineStatusChangedEvent.subscribe(status => {
          for (let id in status) {
            this.podcasters.find(p => p.HostId.toString() == id).AgoraOnlineStatus = status[id];
          }
      });

      this.agoraEventService.ChannelMemberCountEvent.subscribe(counts => {
          for (let channel in counts) {
            this.podcasters.find(p => p.ShowId == channel).AgoraChannelMemberCount = counts[channel];
          }
      });
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
