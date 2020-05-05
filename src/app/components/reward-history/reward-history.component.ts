import { Component, OnInit } from '@angular/core';
import { Reward } from '../../models/reward';
import { RewardService } from '../../services/data/reward.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-reward-history',
  templateUrl: './reward-history.component.html',
  styleUrls: ['./reward-history.component.css']
})
export class RewardHistoryComponent implements OnInit {
  rewards: Reward[];

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
        Price: 123,
        Time: '2019-12-17 12:35:23',
            Avatar: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968'
      },
      {
        Name: '讽刺的是',
        FromUser: '大厦',
        Price: 765754,
        Time: '2019-12-17 12:35:23',
        Avatar: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968'
      },
      {
        Name: '不规范',
        FromUser: '地方',
        Price: 43567,
        Time: '2019-12-17 12:35:23',
        Avatar: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968'
      },
    ]
  }

}
