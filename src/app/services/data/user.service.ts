import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private generalService: GeneralService) { }

  async getBalance(): Promise<number> {
    let data = {
      opCode: 22027
    };
    return await this.generalService.doAction<number>('User/AuthOpUserByAction', data);
  }
}
