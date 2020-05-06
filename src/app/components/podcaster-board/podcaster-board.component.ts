import { Component, OnInit } from '@angular/core';
import { PodcasterService } from '../../services/data/podcaster.service';
import { Podcaster } from '../../models/podcaster';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';
import { AgoraRtmService } from '../../services/agora/agora-rtm.service';
import { AgoraRtcService } from '../../services/agora/agora-rtc.service';

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
        private agoraRtmService: AgoraRtmService,
        private agoraRtcService: AgoraRtcService) { }

    async ngOnInit(): Promise<void> {
        this.displayType = DisplayTypesEnum.Hot;
        this.registerAgoraServiceEvents();

        try {
            await this.agoraRtmService.init();
            this.agoraRtcService.init();
            this.podcasters = await this.getPodcasters();
            // 发送默认选中第一个主播的事件
            if (this.podcasters.length > 0)
                this.podcasterEventService.selectPodcaster(this.podcasters[0]);
        } catch (ex) {
            console.log('PodcasterBoardComponent ngOnInit, ', ex);
        }
    }

    async getPodcasters(): Promise<Podcaster[]> {
        let podcasters = await this.podcasterService.getPodcasters();
        if (podcasters.length > 0) {
            // 订阅主播在线状态
            this.agoraRtmService.subscribePeersOnlineStatus(podcasters.map(podcaster => podcaster.HostId.toString()));
            // 获取频道观众人数
            let memberCounts = await this.agoraRtmService.client.getChannelMemberCount(podcasters.map(podcaster => podcaster.ShowId.toString()));
            // 设置频道观众人数
            for (let channel in memberCounts) {
                podcasters.find(p => p.ShowId == channel).AgoraChannelMemberCount = memberCounts[channel];
            }
        }
        return podcasters;
    }

    private registerAgoraServiceEvents(): void {
        this.agoraRtmService.peersOnlineStatusChangedEvent.subscribe(status => {
            for (let id in status) {
                this.podcasters.find(p => p.HostId.toString() == id).AgoraOnlineStatus = status[id];
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
}
