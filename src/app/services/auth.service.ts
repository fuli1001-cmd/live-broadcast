import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://139.155.70.130:8080/api/Show/AuthOpShowByAction';

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'Authorization': 'BasicAuth oN1DGOcylbegBTwsYUq/rMbSi1QuYlSO'
    }),
    responseType: 'blob' as 'json'
  };

  constructor(private http: HttpClient) { }

  async login(opCode: number): Promise<Blob> {
    let data = {
      opCode: opCode
    };
    console.log("login");
    return await this.http.post<Blob>(this.loginUrl, data, this.httpOptions).toPromise();
  }
}
