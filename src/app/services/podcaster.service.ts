import { Injectable } from '@angular/core';
import { Podcaster } from '../models/podcaster';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PodcasterService {

    constructor(private generalService: GeneralService) { }

    async getPodcasters(): Promise<Podcaster[]> {
      return await this.generalService.get<Podcaster[]>('Show/AuthOpShowByAction', 23001);
    }
}
