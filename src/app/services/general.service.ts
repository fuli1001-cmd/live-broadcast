import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as pako from "pako";
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'BasicAuth oN1DGOcylbfvvkje6YYQNd7OQKdm8ZNi'
        }),
        responseType: 'blob' as 'json'
    };

    constructor(private http: HttpClient) { }

    async doAction<T>(actionUrl: string, data: any): Promise<T> {
        let apiUrl = environment.serviceBaseUrl + actionUrl;
        let blob = await this.http.post<Blob>(apiUrl, data, this.httpOptions).toPromise();
        let result = await this.inflate<T>(blob);
        console.debug(`${apiUrl}: ${result}`);
        return result;
    }

    async inflate<T>(blob: Blob): Promise<T> {
        let uint8Array = new Uint8Array(await blob.arrayBuffer());
        let response = JSON.parse(pako.inflate(uint8Array, { to: 'string' }));
        if (response.result === 0)
            return response.data as T;
        else
            return null;
    }
}
