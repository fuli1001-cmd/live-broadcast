import { Injectable } from '@angular/core';
import { Reward } from '../models/reward';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(private generalService: GeneralService) { }

  async getRewardHistory(): Promise<Reward[]> {
    return await this.generalService.get<Reward[]>('Show/AuthOpShowByAction', 30006);
  }
}
