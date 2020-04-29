import { Injectable } from '@angular/core';
import { Reward } from '../../models/reward';
import { GeneralService } from './general.service';

@Injectable({
    providedIn: 'root'
})
export class RewardService {

    constructor(private generalService: GeneralService) { }

    async getRewardHistory(): Promise<Reward[]> {
        let data = { opCode: 30006 };
        return await this.generalService.doAction<Reward[]>('Show/AuthOpShowByAction', data);
    }
}
