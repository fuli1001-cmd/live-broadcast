import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Auth } from '../../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private generalService: GeneralService) { }

  async login(): Promise<Auth> {
    let data = { 
      opCode: 22001,
      username: 'test01',
      password: '111111',
      clientType: 135,
      clientVer: null,
      regstrationId: null
    };
    return await this.generalService.doAction<Auth>('User/OpUserByAction', data);

    // let data = {
    //   opCode: opCode
    // };
    // console.log("login");
    // return await this.http.post<Blob>(this.loginUrl, data, this.httpOptions).toPromise();
  }
}
