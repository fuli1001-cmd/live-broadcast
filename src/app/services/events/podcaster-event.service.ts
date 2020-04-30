import { Injectable, Output, EventEmitter } from '@angular/core';
import { Podcaster } from '../../models/podcaster';

@Injectable({
  providedIn: 'root'
})
export class PodcasterEventService {
  @Output() podcasterSelectedEvent: EventEmitter<Podcaster> = new EventEmitter();
  @Output() podcastersEvent: EventEmitter<Podcaster[]> = new EventEmitter();

  constructor() { }

  selectPodcaster(podcaster: Podcaster): void {
    this.podcasterSelectedEvent.emit(podcaster);
  }

  sendPodcasters(podcasters: Podcaster[]): void {
    if (podcasters != null && podcasters.length > 0)
      this.podcastersEvent.emit(podcasters);
  }

}
