import { Component, OnInit, Input } from '@angular/core';
import { Reward } from 'src/app/models/reward';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css']
})
export class RewardComponent implements OnInit {

  @Input() reward: Reward

  constructor() { }

  ngOnInit(): void {
  }

}
