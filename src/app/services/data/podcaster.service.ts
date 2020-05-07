import { Injectable } from '@angular/core';
import { Podcaster } from '../../models/podcaster';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class PodcasterService {

    constructor(private generalService: GeneralService) { }

    async getPodcasters(): Promise<Podcaster[]> {
        let data = { opCode: 23001 };
        return await this.generalService.doAction<Podcaster[]>('Show/AuthOpShowByAction', data);
    }
}
