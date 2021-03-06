import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as pako from "pako";
import { User } from '../../models/user';
import { Md5 } from 'ts-md5/dist/md5';
import { ConfigService } from '../config/config.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {
    user: User;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        responseType: 'blob' as 'json'
    };

    constructor(private http: HttpClient) { }

    async doAction<T>(actionUrl: string, data: any, authenticate: boolean = true): Promise<T> {
        console.log(`-----action url: ${actionUrl}-----`);
        console.log(data);
        try {
            if (authenticate && !this.httpOptions.headers.get('Authorization')) {
                this.user = await this.login();
                this.httpOptions.headers = this.httpOptions.headers.append('Authorization', 'BasicAuth ' + this.user.token);
            }

            let apiUrl = ConfigService.config.serviceBaseUrl + actionUrl;
            let blob = await this.http.post<Blob>(apiUrl, data, this.httpOptions).toPromise();
            let result = await this.inflate<T>(blob);
            return result;
        } catch (err) {
            console.log(`-----error: ${err}-----`);
            return null;
        }
    }

    async inflate<T>(blob: Blob): Promise<T> {
        let uint8Array = new Uint8Array(await new Response(blob).arrayBuffer());
        let response = JSON.parse(pako.inflate(uint8Array, { to: 'string' }));
        if (response.result === 0)
            return response.data as T;
        else {
            console.log(`-----response error code: ${response.result}-----`);
            return null;
        }
    }

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
        return await this.doAction<User>('User/OpUserByAction', request, false);
    }
}
