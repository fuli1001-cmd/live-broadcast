import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Message, MessageTypes } from 'src/app/models/message';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';
import { Podcaster } from '../../models/podcaster';
import { AgoraRtmService } from '../../services/agora/agora-rtm.service';
import { AgoraRtcService } from '../../services/agora/agora-rtc.service';
import { GeneralService } from '../../services/data/general.service';
import { PodcasterService } from '../../services/data/podcaster.service';
import { GiftService } from '../../services/data/gift.service';
import { Gift } from 'src/app/models/gift';

@Component({
    selector: 'app-video-board',
    templateUrl: './video-board.component.html',
    styleUrls: ['./video-board.component.css']
})
export class VideoBoardComponent implements OnInit {

    @Output() onEnterExitRoomEvent: EventEmitter<boolean> = new EventEmitter();

    remoteStreamElementId: string;
    podcaster: Podcaster;
    rewardAmount: number;
    viewOnlyMode: boolean;
    joinedChannel: boolean;
    showGiftBoard: boolean;

    messageContent: string;
    messages: Message[];

    giftMessage: Message;
    gift: Gift;
    

    constructor(private podcasterEventService: PodcasterEventService,
        private agoraRtmService: AgoraRtmService,
        private agoraRtcService: AgoraRtcService,
        private generalService: GeneralService,
        private giftService: GiftService,
        private podcasterService: PodcasterService) { }

    async ngOnInit(): Promise<void> {
        this.remoteStreamElementId = 'remote-stream';
        this.joinedChannel = false;
        this.showGiftBoard = false;
        this.viewOnlyMode = true;
        this.initMessages();
        
        await this.giftService.getGifts();
        
        this.registerPodcasterEvent();
        this.registerAgoraServiceEvents();
    }

    private initMessages(): void {
        this.messages = [];
        let message = {
            content: '直播提倡绿色直播，严禁涉政、涉恐、涉黄、聚众闹事、返现等内容，网警24小时巡查。请勿参与直播间非官方奖励活动、游戏，切勿私下交易，以防受骗。',
            name: null,
            type: MessageTypes[MessageTypes.system]
        }
        this.messages.push(message);
    }

    private registerPodcasterEvent(): void {
        this.podcasterEventService.podcasterSelectedEvent.subscribe(async podcaster => {
            this.podcaster = podcaster;
            await this.agoraRtcService.joinChannel(podcaster.ShowId.toString());
            await this.agoraRtmService.joinChannel(podcaster.ShowId.toString());
            this.rewardAmount = await this.podcasterService.getRewardAmount(podcaster.ShowId.toString());
        });
    }

    private registerAgoraServiceEvents(): void {
        this.agoraRtcService.streamSubscribedEvent.subscribe(remoteStream => {
            remoteStream.play(this.remoteStreamElementId);
        });

        this.agoraRtcService.streamRemovedEvent.subscribe(remoteStream => {
            this.stopRemoteStream(remoteStream);
        });

        this.agoraRtcService.peerLeaveEvent.subscribe(remoteStream => {
            this.stopRemoteStream(remoteStream);
        });

        this.agoraRtmService.channelMessageEvent.subscribe(async message => {
            if (message.type == MessageTypes[MessageTypes.gift]) 
                await this.displayGift(message, 1000);
            else
                this.messages.push(message);
        });

        this.agoraRtmService.joinedChannelEvent.subscribe(async () => {
            this.joinedChannel = true;
            let msg = this.generalService.user.userInfoLite.nickname + '进入了直播间';
            this.messages.push(await this.sendMessage(msg, MessageTypes.system));
        });

        this.agoraRtmService.leftChannelEvent.subscribe(async () => {
            this.joinedChannel = false;
            let msg = this.generalService.user.userInfoLite.nickname + '离开了直播间';
            await this.sendMessage(msg, MessageTypes.system);
            this.messages.splice(1, this.messages.length);
        });
    }

    private async displayGift(message: Message, duration: number): Promise<void> {
        while (this.gift)
            await this.delay(100);
        this.gift = this.giftService.gifts.find(g => g.Id.toString() == message.content);
        this.giftMessage = message;
        await this.delay(duration);
        this.giftMessage = null;
        this.gift = null;
    }

    private stopRemoteStream(remoteStream: any): void {
        if (remoteStream && remoteStream.isPlaying()) {
            remoteStream.stop();
        }
    }

    private async sendMessage(messageContent: string, type: MessageTypes): Promise<Message> {
        let message = {
            content: messageContent,
            name: this.generalService.user.userInfoLite.nickname,
            type: MessageTypes[type]
        }
        await this.agoraRtmService.sendMessage(JSON.stringify(message));
        return message;
    }

    async onClickSendMessage(): Promise<void> {
        let message = await this.sendMessage(this.messageContent, MessageTypes.msg);
        this.messages.push(message);
        this.messageContent = null;
    }

    onClickShowGiftBoard(): void {
        if (!this.viewOnlyMode)
            this.showGiftBoard = true;
    }

    closeGiftBoard(): void {
        this.showGiftBoard = false;
    }

    onClickEnterRoom(): void {
        this.viewOnlyMode = false;
        this.onEnterExitRoomEvent.emit(true);
    }

    onClickStopRoom(): void {
        this.viewOnlyMode = true;
        this.onEnterExitRoomEvent.emit(false);
    }

    async onClickFollow(): Promise<void> {
        let result = await this.podcasterService.followPodcaster(this.podcaster.HostId);
        console.log(`-----follow result: ${result}-----`);
    }

    async onGiftSent(giftId: number): Promise<void> {
        let content = giftId.toString();
        let msg = await this.sendMessage(content, MessageTypes.gift);
        await this.displayGift(msg, 1000);
    }

    private async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
