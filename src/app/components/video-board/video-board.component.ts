import { Component, OnInit } from '@angular/core';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { environment } from 'src/environments/environment';
import * as rtm from "agora-rtm-sdk";
import { Message } from 'src/app/models/message';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';
import { Podcaster } from '../../models/podcaster';

@Component({
    selector: 'app-video-board',
    templateUrl: './video-board.component.html',
    styleUrls: ['./video-board.component.css']
})
export class VideoBoardComponent implements OnInit {
    remoteCalls: string[] = [];
    private channel = '143e7c89a93f4922b2f4154c33a11ae6';

    private uid: number;

    private rtcClient: AgoraClient;
    private remoteStream: Stream;
    
    private rtmClient: any;
    private rtmChannel: any;

    messageContent: string;
    messages: Message[] = [];

    enableSendButton: boolean;
    showGiftBoard: boolean;

    podcaster: Podcaster;

    constructor(private ngxAgoraService: NgxAgoraService, 
        private podcasterEventService: PodcasterEventService) { }

    ngOnInit(): void {
        this.registerPodcasterEvent();

        this.enableSendButton = false;
        this.showGiftBoard = false;
        this.uid = Math.floor(Math.random() * 100);
        // this.rtc();
        // this.rtm();
    }

    private registerPodcasterEvent(): void {
        this.podcasterEventService.podcasterSelectedEvent.subscribe(podcaster => {
            this.joinPodcasterChannel(podcaster);
            console.log(`*****************set ${podcaster.HostName} in VideoBoardComponent*****************`);
        });
    }

    private joinPodcasterChannel(podcaster: Podcaster): void {
        if (this.rtcClient == null)
            this.rtc();
        
        if (this.podcaster != null)
        {
            console.log(`***************leave ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId}****************`);
            this.rtcClient.leave(() => {
                console.log(`***************leave ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId} success.***************`);
                if (this.remoteStream)
                    this.remoteStream.stop();
                this.remoteCalls = [];
                this.podcaster = podcaster;
                console.log(`***************join ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId}****************`);
                this.rtcClient.join(null, this.podcaster.ShowId, this.uid, uid => console.debug(`***************join ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId} success.***************`), err => console.debug(`***************join ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId} failed.***************`, err));
            }, err => {
                console.log(`***************leave ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId} failed.***************`);
            });
        }
        else
        {
            this.podcaster = podcaster;
            console.log(`***************join ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId}****************`);
            this.rtcClient.join(null, this.podcaster.ShowId, this.uid, uid => console.debug(`***************join ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId} success.***************`), err => console.debug(`***************join ${this.podcaster.HostName}'s channel ${this.podcaster.ShowId} failed.***************`, err));
        }
    }

    private rtc(): void {
        this.rtcClient = this.ngxAgoraService.createClient({ mode: 'live', codec: 'h264' });
        this.registerRtcClientHandlers();
        this.rtcClient.setClientRole('audience');
        // this.rtcClient.join(null, this.channel, this.uid, uid => console.debug('join success.'), err => console.debug(err));
    }

    private registerRtcClientHandlers(): void {
        this.rtcClient.on(ClientEvent.Error, error => {
            console.debug('Got error msg:', error.reason);
            if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
                this.rtcClient.renewChannelKey(
                    '',
                    () => console.debug('Renewed the channel key successfully.'),
                    renewError => console.error('Renew channel key failed: ', renewError)
                );
            }
        });

        this.rtcClient.on(ClientEvent.RemoteStreamAdded, evt => {
            console.debug('remote stream added.');
            const stream = evt.stream as Stream;
            this.rtcClient.subscribe(stream, { audio: true, video: true }, err => {
                console.debug('Subscribe stream failed', err);
            });
        });

        this.rtcClient.on(ClientEvent.RemoteStreamSubscribed, evt => {
            const stream = evt.stream as Stream;
            this.remoteStream = stream;
            const id = this.getRemoteId(stream);
            console.debug(`RemoteStreamSubscribed: ${id}`);
            if (!this.remoteCalls.length) {
                this.remoteCalls.push(id);
                stream.play(id);
                // setTimeout(() => stream.play(id), 1000);
            }
        });

        this.rtcClient.on(ClientEvent.RemoteStreamRemoved, evt => {
            const stream = evt.stream as Stream;
            if (stream) {
                stream.stop();
                this.remoteCalls = [];
                console.debug(`Remote stream is removed ${stream.getId()}`);
            }
        });

        this.rtcClient.on(ClientEvent.PeerLeave, evt => {
            const stream = evt.stream as Stream;
            if (stream) {
                stream.stop();
                this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
                console.debug(`${evt.uid} left from this channel`);
            }
        });
    }

    private getRemoteId(stream: Stream): string {
        // return `agora_remote-${stream.getId()}`;
        return 'remote-stream';
    }

    private rtm(): void {
        this.rtmClient = rtm.createInstance(environment.agora.appId);

        this.rtmClient.on('ConnectionStateChanged', (newState, reason) => {
            console.debug(`on connection state changed to ${newState}, reason: ${reason}`);
        });

        this.rtmClient.login({ token: null, uid: this.uid.toString() }).then(() => {
            this.rtmChannel = this.rtmClient.createChannel(this.channel); 

            this.rtmChannel.join().then(() => {
                this.rtmChannel.on('ChannelMessage', ({ text }, senderId) => { 
                    this.messages.push(JSON.parse(text));
                });
                this.enableSendButton = true;
            }).catch(err => {
                console.error('join channel failed.', err);
            });
        }).catch(err => {
            console.error('AgoraRTM rtcClient login failure', err);
        });
    }

    onClickSendMessage(): void {
        let message = {
            content: this.messageContent,
            name: null,
            type: 'msg'
        }
        this.rtmChannel.sendMessage({ text: JSON.stringify(message) }).then(() => {
            this.messages.push(message);
            this.messageContent = null;
        }).catch(err => {
            console.error('send msg failed', err);
        });
    }

    onClickShowGiftBoard(): void {
        this.showGiftBoard = true;
    }

    closeGiftBoard(): void {
        this.showGiftBoard = false;
    }

    onClickStopWatching(): void {

    }

}
