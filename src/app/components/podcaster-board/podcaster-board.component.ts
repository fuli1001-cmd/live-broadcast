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
        this.registerAgoraServiceEvents();

        try {
            await this.agoraRtmService.init();
            this.agoraRtcService.init();
            await this.onClickHot();
            // 发送默认选中第一个主播的事件
            if (this.podcasters.length > 0)
                this.podcasterEventService.selectPodcaster(this.podcasters[0]);
        } catch (ex) {
            console.log('PodcasterBoardComponent ngOnInit, ', ex);
        }
    }

    async setPodcasters(): Promise<void> {
        if (this.displayType == DisplayTypesEnum.Hot)
            this.podcasters = await this.podcasterService.getHotPodcasters();
        else if (this.displayType == DisplayTypesEnum.Followed)
            this.podcasters = await this.podcasterService.getFollowedPodcasters();

        if (this.podcasters.length > 0) {
            // 订阅主播在线状态
            this.agoraRtmService.subscribePeersOnlineStatus(this.podcasters.map(podcaster => podcaster.HostId.toString()));
            // 获取频道观众人数
            let memberCounts = await this.agoraRtmService.client.getChannelMemberCount(this.podcasters.map(podcaster => podcaster.ShowId.toString()));
            // 设置频道观众人数
            for (let channel in memberCounts) {
                this.podcasters.find(p => p.ShowId == channel).AgoraChannelMemberCount = memberCounts[channel];
            }
        }
    }

    private registerAgoraServiceEvents(): void {
        this.agoraRtmService.peersOnlineStatusChangedEvent.subscribe(status => {
            for (let id in status) {
                this.podcasters.find(p => p.HostId.toString() == id).AgoraOnlineStatus = status[id];
            }
        });
    }

    async onClickHot(): Promise<void> {
        this.displayType = DisplayTypesEnum.Hot;
        await this.setPodcasters();
    }

    async onClickFollowed(): Promise<void> {
        this.displayType = DisplayTypesEnum.Followed;
        await this.setPodcasters();
    }
}

export enum DisplayTypesEnum {
    Hot,
    Followed
}
