import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private generalService: GeneralService) { }

    async getErrors(): Promise<any[]> {
        let data = { opCode: 29002 };
        return await this.generalService.doAction<any[]>('Other/OpByAction', data);
    }
}
