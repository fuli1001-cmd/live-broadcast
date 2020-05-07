import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiEventService {

  @Output() backToTopRewardsEvent = new EventEmitter();

  constructor() { }

  backToTopRewards(): void {
    this.backToTopRewardsEvent.emit();
  }
}
