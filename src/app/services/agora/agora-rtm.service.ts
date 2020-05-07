import { Injectable, Output, EventEmitter } from '@angular/core';
import * as rtm from "agora-rtm-sdk";
import { Message } from 'src/app/models/message';
import { ConfigService } from '../config/config.service';


@Injectable({
  providedIn: 'root'
})
export class AgoraRtmService {
    @Output() peersOnlineStatusChangedEvent: EventEmitter<any> = new EventEmitter();
    @Output() channelMessageEvent: EventEmitter<Message> = new EventEmitter();
    @Output() joinedChannelEvent: EventEmitter<void> = new EventEmitter();
    @Output() leftChannelEvent: EventEmitter<void> = new EventEmitter();

    client: any;
    channel: any;
    private channelId: string;

    constructor() { }

    async init(): Promise<void> {
        this.client = rtm.createInstance(ConfigService.config.agora.appId);
        this.registerClientHandlers();
        await this.client.login({
            token: null, uid: this.newUuid() });
    }

    async joinChannel(channelId: string): Promise<void> {
        if (this.channelId != null) {
            if (this.channelId != channelId)
                await this.leaveChannel();
            else
                return new Promise(resolve => resolve());
        }

        this.channel = this.client.createChannel(channelId);
        this.registerChannelHandlers();
        await this.channel.join();
        this.channelId = channelId;

        console.log(`****joined rtm channel ${channelId}****`);
        this.joinedChannelEvent.emit();
    }

    async leaveChannel(): Promise<void> {
        if (this.channel) {
            this.leftChannelEvent.emit();
            await this.channel.leave();
            this.channel = null;
            this.channelId = null;
        }
    }

    async sendMessage(message: string): Promise<void> {
        await this.channel.sendMessage({ text: message });
    }

    subscribePeersOnlineStatus(peerIds: string[]): void {
        this.client.subscribePeersOnlineStatus(peerIds);
    }

    private registerClientHandlers(): void {
        this.client.on('PeersOnlineStatusChanged', (status) => {
            this.peersOnlineStatusChangedEvent.emit(status);
        });
    }

    private registerChannelHandlers(): void {
        this.channel.on('ChannelMessage', ({ text }, senderId) => {
            let message = JSON.parse(text) as Message;
            this.channelMessageEvent.emit(message);
        });
    }

    private newUuid(): string {
        let dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
}
