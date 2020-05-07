import { Injectable, Output, EventEmitter } from '@angular/core';
import * as rtc from "agora-rtc-sdk";
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class AgoraRtcService {
    @Output() streamSubscribedEvent: EventEmitter<any> = new EventEmitter();
    @Output() streamRemovedEvent: EventEmitter<any> = new EventEmitter();
    @Output() peerLeaveEvent: EventEmitter<any> = new EventEmitter();

    client: any;
    channelId: string;

    constructor() { }

    async init(): Promise<void> {
        if (!this.client) {
            this.client = rtc.createClient({ mode: "live", codec: "h264" });
            return new Promise((resolve, reject) => {
                this.client.init(ConfigService.config.agora.appId, () => {
                    this.registerClientHandlers();
                    this.client.setClientRole('audience');
                    resolve();
                }, err => {
                    reject(err);
                });
            })
        } else {
            return new Promise(resolve => resolve());
        }
    }

    async joinChannel(channelId: string): Promise<void> {
        if (this.channelId != null) {
            if (this.channelId != channelId)
                await this.leaveChannel();
            else
                return new Promise(resolve => resolve());
        }

        return new Promise((resolve, reject) => {
            this.client.join(null, channelId, null, uid => {
                this.channelId = channelId;
                resolve();
            }, err => {
                reject(err);
            });
        });
    }

    async leaveChannel(): Promise<void> {
        if (this.channelId != null) {
            return new Promise((resolve, reject) => {
                this.client.leave(() => {
                    this.channelId = null;
                    resolve();
                }, err => {
                    reject(err);
                });
            });
        } else {
            return new Promise(resolve => resolve());
        }
    }

    private registerClientHandlers(): void {
        this.client.on("stream-added", evt => {
            let remoteStream = evt.stream;
            this.client.subscribe(remoteStream, function (err) {
                console.log('----stream subscribe failed----', err);
            });
            console.log('----stream-added----: ', remoteStream.getId());
        });

        this.client.on("stream-subscribed", evt => {
            let remoteStream = evt.stream;
            this.streamSubscribedEvent.emit(remoteStream);
            console.log('----stream-subscribed----: ', remoteStream.getId());
        });

        this.client.on('stream-removed', evt => {
            let remoteStream = evt.stream;
            this.streamRemovedEvent.emit(remoteStream);
            console.log('----stream-removed----: ', remoteStream.getId());
        });

        this.client.on('peer-leave', evt => {
            this.peerLeaveEvent.emit(evt.stream);
            console.log('----peer-leave----');
        });
    }
}
