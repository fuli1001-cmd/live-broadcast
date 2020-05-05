import { Component, OnInit } from '@angular/core';
import { Message, MessageTypes } from 'src/app/models/message';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';
import { Podcaster } from '../../models/podcaster';
import { AgoraRtmService } from '../../services/agora/agora-rtm.service';
import { AgoraRtcService } from '../../services/agora/agora-rtc.service';

@Component({
    selector: 'app-video-board',
    templateUrl: './video-board.component.html',
    styleUrls: ['./video-board.component.css']
})
export class VideoBoardComponent implements OnInit {

    remoteStreamElementId: string;
    podcaster: Podcaster;

    messageContent: string;
    messages: Message[] = [];
    giftMessage: Message;

    viewOnlyMode: boolean;
    joinedChannel: boolean;
    showGiftBoard: boolean;
    

    constructor(private podcasterEventService: PodcasterEventService,
        private agoraRtmService: AgoraRtmService,
        private agoraRtcService: AgoraRtcService) { }

    ngOnInit(): void {
        this.registerPodcasterEvent();
        this.registerAgoraServiceEvents();

        this.remoteStreamElementId = 'remote-stream';
        this.joinedChannel = false;
        this.showGiftBoard = false;
        this.viewOnlyMode = true;
    }

    private registerPodcasterEvent(): void {
        this.podcasterEventService.podcasterSelectedEvent.subscribe(async podcaster => {
            this.podcaster = podcaster;
            await this.agoraRtcService.joinChannel(podcaster.ShowId.toString());
            await this.agoraRtmService.joinChannel(podcaster.ShowId.toString());
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

        this.agoraRtmService.channelMessageEvent.subscribe(message => {
            if (message.type == MessageTypes[MessageTypes.gift])
                this.giftMessage = message;
            else
                this.messages.push(message);
        });

        this.agoraRtmService.joinedChannelEvent.subscribe(async () => {
            this.joinedChannel = true;
            this.messages.push(await this.sendMessage('我进入了直播间', MessageTypes.system));
        });

        this.agoraRtmService.leftChannelEvent.subscribe(async () => {
            this.joinedChannel = false;
            this.messages.push(await this.sendMessage('我离开了直播间', MessageTypes.system));
        });
    }

    private stopRemoteStream(remoteStream: any): void {
        if (remoteStream && remoteStream.isPlaying()) {
            remoteStream.stop();
        }
    }

    private async sendMessage(messageContent: string, type: MessageTypes): Promise<Message> {
        let message = {
            content: messageContent,
            name: null,
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
        this.showGiftBoard = true;
    }

    closeGiftBoard(): void {
        this.showGiftBoard = false;
    }

    onClickEnterRoom(): void {
        this.viewOnlyMode = false;
    }

    onClickStopRoom(): void {
        this.viewOnlyMode = true;
    }

}
