import { Injectable } from '@angular/core';
import { Gift } from '../../models/gift';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private generalService: GeneralService) { }

    async getGifts(): Promise<Gift[]> {
        let data = { opCode: 30003 };
        return await this.generalService.doAction<Gift[]>('Gift/AuthOpGiftByAction', data);
    }

    async sendGift(giftId: number, toHostId: number, showId: string): Promise<number> {
        let data = {
            opCode: 30004,
            GiftId: giftId,
            ToHostId: toHostId,
            ShowId: showId
        };
        let request = {
          opCode: 30004,
          data: JSON.stringify(data)
        };

        return await this.generalService.doAction<number>('Gift/AuthOpGiftByAction', request);
    }
}
