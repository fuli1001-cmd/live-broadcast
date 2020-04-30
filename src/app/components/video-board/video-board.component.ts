import { Component, OnInit } from '@angular/core';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { environment } from 'src/environments/environment';
import * as rtm from "agora-rtm-sdk";
import { Message, MessageTypes } from 'src/app/models/message';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';
import { Podcaster } from '../../models/podcaster';
import { AgoraEventService } from '../../services/events/agora-event.service';

@Component({
    selector: 'app-video-board',
    templateUrl: './video-board.component.html',
    styleUrls: ['./video-board.component.css']
})
export class VideoBoardComponent implements OnInit {
    // private channel = '143e7c89a93f4922b2f4154c33a11ae6';

    private uid: number;

    private rtcClient: AgoraClient;
    private rtcClientInited: boolean;
    podcaster: Podcaster;

    private remoteStream: Stream;
    
    private rtmClient: any;
    private rtmChannel: any;

    messageContent: string;
    messages: Message[] = [];
    giftMessage: Message;

    enableSendButton: boolean;
    showGiftBoard: boolean;
    showEnterButton: boolean;
    

    constructor(private ngxAgoraService: NgxAgoraService, 
        private podcasterEventService: PodcasterEventService,
        private agoraEventService: AgoraEventService) { }

    ngOnInit(): void {
        this.registerPodcasterEvent();
        this.enableSendButton = false;
        this.showGiftBoard = false;
        this.showEnterButton = true;
        this.uid = Math.floor(Math.random() * 100);
    }

    private registerPodcasterEvent(): void {
        this.podcasterEventService.podcasterSelectedEvent.subscribe(async podcaster => {
            // switch rtc channel
            this.leaveThenJoinChannel(podcaster);
            // switch rtm channel
            await this.LeaveRtmChannel();
            await this.JoinRtmChannel();
        });

        this.podcasterEventService.podcastersEvent.subscribe(async podcasters => {
            // 事件保证了podcasters至少含有一个元素，设置当前主播为第一个主播
            this.podcaster = podcasters[0];

            // 初始化rtc并加入第一个主播的频道
            this.initRtc();
            this.joinChannel(this.podcaster);

            // 初始化rtm
            await this.initRtm();
            // 订阅主播在线状态
            this.rtmClient.subscribePeersOnlineStatus(podcasters.map(podcaster => podcaster.HostId.toString()));
            // 获取频道观众人数
            let memberCounts = await this.rtmClient.getChannelMemberCount(podcasters.map(podcaster => podcaster.ShowId.toString()));
            // 更新当前主播的观众人数
            this.podcaster.AgoraChannelMemberCount = memberCounts[Object.keys(memberCounts).find(channel => channel == this.podcaster.ShowId)];
            // 通知获取到的观众人数
            this.agoraEventService.sendChannelMemberCount(memberCounts);
        });
    }

    private initRtc(): void {
        if (this.rtcClient == null) {
            this.rtcClient = this.ngxAgoraService.createClient({ mode: 'live', codec: 'h264' });
            this.registerRtcClientHandlers();
            this.rtcClient.setClientRole('audience');
        }
    }

    private leaveThenJoinChannel(podcaster: Podcaster): void {
        if (this.rtcClient != null) {
            if (this.podcaster != null) {
                this.stopRemoteStream();

                let log = `VideoBoardComponent: leave ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId}.`;
                this.rtcClient.leave(() => {
                    console.log(`${log} success.`);
                    this.joinChannel(podcaster);
                }, err => {
                    console.log(`${log} failed.`, err);
                });
            } else {
                this.joinChannel(podcaster);
            }
        }
    }

    private joinChannel(podcaster: Podcaster): void {
        if (this.rtcClient != null) {
            this.podcaster = podcaster;
            let log = `VideoBoardComponent: join ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId}`;
            this.rtcClient.join(null, this.podcaster.ShowId, this.uid,
                uid => console.log(`${log} success`),
                err => console.log(`${log} failed.`, err));
        }
    }

    private stopRemoteStream(): void {
        if (this.remoteStream && this.remoteStream.isPlaying()) {
            this.remoteStream.stop();
        }
    }

    private registerRtcClientHandlers(): void {
        this.rtcClient.on(ClientEvent.Error, error => {
            console.log('Got error msg:', error.reason);
            if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
                this.rtcClient.renewChannelKey(
                    '',
                    () => console.log('Renewed the channel key successfully.'),
                    renewError => console.error('Renew channel key failed: ', renewError)
                );
            }
        });

        this.rtcClient.on(ClientEvent.RemoteStreamAdded, evt => {
            console.log('remote stream added.');
            const stream = evt.stream as Stream;
            this.rtcClient.subscribe(stream, { audio: true, video: true }, err => {
                console.log('Subscribe stream failed', err);
            });
        });

        this.rtcClient.on(ClientEvent.RemoteStreamSubscribed, evt => {
            const stream = evt.stream as Stream;
            this.remoteStream = stream;
            const id = this.getRemoteId(stream);
            console.log(`RemoteStreamSubscribed: ${id}`);
            stream.play(id);
        });

        this.rtcClient.on(ClientEvent.RemoteStreamRemoved, evt => {
            const stream = evt.stream as Stream;
            if (stream) {
                stream.stop();
                console.log(`Remote stream is removed ${stream.getId()}`);
            }
        });

        this.rtcClient.on(ClientEvent.PeerLeave, evt => {
            const stream = evt.stream as Stream;
            if (stream) {
                stream.stop();
                console.log(`${evt.uid} left from this channel`);
            }
        });
    }

    private getRemoteId(stream: Stream): string {
        // return `agora_remote-${stream.getId()}`;
        return 'remote-stream';
    }

    private async initRtm(): Promise<void> {
        if (this.rtmClient == null) {
            this.rtmClient = rtm.createInstance(environment.agora.appId);
            this.registerRtmClientHandlers();
            await this.rtmClient.login({ token: null, uid: this.uid.toString() });
            await this.JoinRtmChannel();
            this.enableSendButton = true;

            // this.rtmClient.login({ token: null, uid: this.uid.toString() }).then(() => {
            //     this.rtmClient.subscribePeersOnlineStatus(['20471', '20472', '204106']);
            //     this.rtmChannel = this.rtmClient.createChannel(this.channel); 

            //     this.rtmChannel.join().then(() => {
            //         this.rtmChannel.on('ChannelMessage', ({ text }, senderId) => { 
            //             this.messages.push(JSON.parse(text));
            //         });
            //         this.enableSendButton = true;
            //     }).catch(err => {
            //         console.error('join channel failed.', err);
            //     });
            // }).catch(err => {
            //     console.error('AgoraRTM rtcClient login failure', err);
            // });
        }
    }

    private async JoinRtmChannel(): Promise<void> {
        console.log(`join ${this.podcaster.HostName}'s rtm channel ${this.podcaster.ShowId}`);
        this.rtmChannel = this.rtmClient.createChannel(this.podcaster.ShowId); 
        this.registerRtmChannelHandlers();
        await this.rtmChannel.join();
        let message = await this.sendMessage('我进入了直播间', MessageTypes.system);
        this.messages.push(message);
    }

    private async LeaveRtmChannel(): Promise<void> {
        console.log(`leave ${this.podcaster.HostName}'s rtm channel ${this.podcaster.ShowId}`);
        let message = await this.sendMessage('我离开了直播间', MessageTypes.system);
        this.messages.push(message);
        await this.rtmChannel.leave();
        this.messages = [];
    }

    private registerRtmClientHandlers(): void {
        this.rtmClient.on('PeersOnlineStatusChanged', (status) => {
            this.agoraEventService.sendPeersOnlineStatus(status);
        });

        this.rtmClient.on('ConnectionStateChanged', (newState, reason) => {
            console.log(`on connection state changed to ${newState}, reason: ${reason}`);
        });
    }

    private registerRtmChannelHandlers(): void {
        this.rtmChannel.on('ChannelMessage', ({ text }, senderId) => { 
            console.log(text);
            let msg = JSON.parse(text) as Message;
            if (msg.type == MessageTypes.gift)
                this.giftMessage = msg;
            else
                this.messages.push(msg);
        });
    }

    private async sendMessage(messageContent: string, type: MessageTypes): Promise<any> {
        let message = {
            content: messageContent,
            name: null,
            type: MessageTypes[type]
        }
        console.log(message);
        await this.rtmChannel.sendMessage({ text: JSON.stringify(message) });
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

    onClickStopWatching(): void {

    }

    onClickEnterChannel(): void {
        this.showEnterButton = false;
    }

}

// export enum MessageTypes {
//     msg,
//     gift,
//     system
// };
