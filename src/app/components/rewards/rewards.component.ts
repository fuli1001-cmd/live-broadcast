import { Component, OnInit, Input } from '@angular/core';
import { Reward } from '../../models/reward';
import { RewardService } from '../../services/data/reward.service';

@Component({
    selector: 'app-rewards',
    templateUrl: './rewards.component.html',
    styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {

    @Input() type: RewardTypesEnum;
    rewards: Reward[];
    RewardTypes = RewardTypesEnum;

  constructor(private rewardService: RewardService) { }

  async ngOnInit(): Promise<void> {
    await this.getRewardHistory();
  }

  async getRewardHistory(): Promise<void> {
    // this.rewards = await this.rewardService.getRewardHistory();
    
    // fake data
    this.rewards = [
      {
        Name: 'dada',
        FromUser: 'mcfksd',
        Price: 765754,
        Time: '2019-12-17 12:35:23',
        Avatar: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968'
      },
      {
        Name: 'dada',
        FromUser: '小王',
        Price: 43567,
        Time: '2019-12-17 12:35:23',
        Avatar: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968'
      },
      {
        Name: 'dada',
        FromUser: '小李',
        Price: 12456,
        Time: '2019-12-17 12:35:23',
        Avatar: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968'
      },
      {
        Name: 'dada',
        FromUser: '小张',
        Price: 4567,
        Time: '2019-12-17 12:35:23',
        Avatar: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968'
      }];
  }

}

export enum RewardTypesEnum {
    Top,
    History
}
