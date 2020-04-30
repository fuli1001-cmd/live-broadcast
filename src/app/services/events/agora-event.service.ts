import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgoraEventService {
  @Output() PeersOnlineStatusChangedEvent: EventEmitter<any> = new EventEmitter();
  @Output() ChannelMemberCountEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendPeersOnlineStatus(status: any): void {
    this.PeersOnlineStatusChangedEvent.emit(status);
  }

  sendChannelMemberCount(counts: any): void {
    this.ChannelMemberCountEvent.emit(counts);
  }
}
