import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Podcaster } from '../models/podcaster';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class PodcasterService {

    private baseUrl = 'http://139.155.70.130:8080/api/';

    httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type': 'application/json' ,
          'Authorization': 'BasicAuth oN1DGOcylbegBTwsYUq/rMbSi1QuYlSO'
        }),
        responseType: 'blob' as 'json'
      };

    constructor(private http: HttpClient, private utilsServicce: UtilsService) { }

    async getPodcasters(opCode: number): Promise<Podcaster[]> {
        let apiUrl = this.baseUrl + 'Show/AuthOpShowByAction';
        let data = {
            opCode: opCode
        };
        let podcasters = await this.http.post<Blob>(apiUrl, data, this.httpOptions).toPromise();
        return await this.utilsServicce.inflate<Podcaster[]>(podcasters)
    }
}
