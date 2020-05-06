import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { User } from '../../models/user';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private generalService: GeneralService) { }

  async login(): Promise<User> {
    let data = { 
      username: 'test002',
      password: Md5.hashAsciiStr('123123'),
      clientType: 136,
      clientVer: '1.0.0',
      regstrationId: null
    };
    let request = {
      opCode: 22001,
      data: JSON.stringify(data)
    };
    return await this.generalService.doAction<User>('User/OpUserByAction', request);

    // let data = {
    //   opCode: opCode
    // };
    // console.log("login");
    // return await this.http.post<Blob>(this.loginUrl, data, this.httpOptions).toPromise();
  }
}
