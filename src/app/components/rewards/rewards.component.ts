import { Component, OnInit, Input } from '@angular/core';
import { Reward } from '../../models/reward';
import { RewardService } from '../../services/reward.service';

@Component({
    selector: 'app-rewards',
    templateUrl: './rewards.component.html',
    styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
    @Input() rewards: Reward[];
    @Input() type: string;

    constructor(private rewardService: RewardService) { }

    ngOnInit(): void {
        this.type = 'ranking-list';
        // this.getRewardHistory();
    }

    async getRewardHistory(): Promise<void> {
        this.rewards = await this.rewardService.getRewardHistory();
    }

}
