import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Podcaster } from '../../models/podcaster';
import { PodcasterEventService } from '../../services/events/podcaster-event.service';

@Component({
  selector: 'app-podcaster',
  templateUrl: './podcaster.component.html',
  styleUrls: ['./podcaster.component.css']
})
export class PodcasterComponent implements OnInit {
  @Input() podcaster: Podcaster;
  @Input() rMargin: boolean;

  constructor(private podcasterEventService: PodcasterEventService) { }

  ngOnInit(): void {

  }

  onClickPodcaster(): void {
    this.podcasterEventService.selectPodcaster(this.podcaster);
  }

}
