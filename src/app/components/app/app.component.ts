import { Component, OnInit, Input } from '@angular/core';
import { RewardTypesEnum } from '../rewards/rewards.component';
import { GeneralService } from '../../services/data/general.service';
import { UiEventService } from '../../services/events/ui-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayProfileEditing: boolean;
  displayRewards: boolean;
  inRoom: boolean;

  @Input() rewardType: RewardTypesEnum;
  RewardTypes = RewardTypesEnum;

  constructor(public generalService: GeneralService, private uiEventService: UiEventService) { }

  async ngOnInit(): Promise<void> {
    this.registerUiEvents();
    this.displayRewards = true;
    this.rewardType = RewardTypesEnum.Top;
  }

  editProfile(): void {
    this.displayProfileEditing = true;
    this.displayRewards = false;
  }

  showRewardHistory(): void {
    this.rewardType = RewardTypesEnum.History;
    this.displayRewards = true;
    this.displayProfileEditing = false;
  }

  onEnterExitRoomEvent(status: boolean): void {
      this.inRoom = status;
  }

  private registerUiEvents(): void {
    this.uiEventService.backToTopRewardsEvent.subscribe(() => {
      this.displayRewards = true;
      this.rewardType = RewardTypesEnum.Top;
    });
  }
}
