import { Injectable } from '@angular/core';
import { Gift } from '../models/gift';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private generalService: GeneralService) { }

    async getGifts(): Promise<Gift[]> {
      return await this.generalService.get<Gift[]>('Gift/AuthOpGiftByAction', 30003);
    }
}
