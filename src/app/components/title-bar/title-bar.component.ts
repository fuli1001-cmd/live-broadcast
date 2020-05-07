import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UiEventService } from '../../services/events/ui-event.service'

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  @Input() title: string;
  @Input() backButton: boolean;

  constructor(private uiEventService: UiEventService) { }

  ngOnInit(): void {
  }

  onClickBackButton(): void {
    this.uiEventService.backToTopRewardsEvent.emit();
  }

}
