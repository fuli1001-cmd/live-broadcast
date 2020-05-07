import { Component, OnInit, Input } from '@angular/core';
import { Reward } from 'src/app/models/reward';
import { RewardTypesEnum } from '../rewards/rewards.component';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {

  @Input() index: number;
  @Input() reward: Reward;
  @Input() type: RewardTypesEnum;
  RewardTypes = RewardTypesEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
