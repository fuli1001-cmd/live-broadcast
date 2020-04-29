import { Injectable, Output, EventEmitter } from '@angular/core';
import { Podcaster } from '../../models/podcaster';

@Injectable({
  providedIn: 'root'
})
export class PodcasterEventService {
  @Output() podcasterSelectedEvent: EventEmitter<Podcaster> = new EventEmitter();

  constructor() { }

  selectPodcaster(podcaster: Podcaster): void {
    this.podcasterSelectedEvent.emit(podcaster);
  }
}
