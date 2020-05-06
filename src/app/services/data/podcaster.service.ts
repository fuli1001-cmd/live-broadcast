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

        // // fake data
        // return [
        //     {
        //         HostName: 'HostName1',
        //         ShowId: '143e7c89a93f4922b2f4154c33a11ae6',
        //         IsFavorited: true,
        //         NumFans: 10,
        //         HostId: 20472,
        //         CoverImage: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968',
        //         Avatar: '',
        //         AgoraOnlineStatus: 'OFFLINE',
        //         AgoraChannelMemberCount: 10
        //     }
        // ]
    }
}
