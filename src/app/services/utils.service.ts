import { Injectable } from '@angular/core';
import * as pako from "pako";
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  async inflate<T>(blob: Blob): Promise<T> {
    let uint8Array = new Uint8Array(await blob.arrayBuffer());
    let response = JSON.parse(pako.inflate(uint8Array, {to:'string'}));
    if (response.result === 0)
      return response.data as T;
    else
      return null; 
  }
}
