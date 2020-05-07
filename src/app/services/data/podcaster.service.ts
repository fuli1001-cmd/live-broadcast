import { Injectable } from '@angular/core';
import { Podcaster } from '../../models/podcaster';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PodcasterService {

    constructor(private generalService: GeneralService) { }

    async getHotPodcasters(): Promise<Podcaster[]> {
        let data = { opCode: 23001 };
        return await this.generalService.doAction<Podcaster[]>('Show/AuthOpShowByAction', data);
    }

    async getFollowedPodcasters(): Promise<Podcaster[]> {
        let request = { opCode: 23005 };
        return await this.generalService.doAction<Podcaster[]>('Show/AuthOpShowByAction', request);
    }

    async followPodcaster(podcasterId: number): Promise<any> {
        let data = { Id: podcasterId };
        let request = {
            opCode: 23004,
            data: JSON.stringify(data)
        };
        return await this.generalService.doAction<any>('Show/AuthOpShowByAction', request);
    }

    async getRewardAmount(showId: string): Promise<any> {
        let data = { ShowId: showId };
        let request = {
            opCode: 23007,
            data: JSON.stringify(data)
        };
        return await this.generalService.doAction<any>('Show/AuthOpShowByAction', request);
    }
}
