import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private generalService: GeneralService) { }

  async getErrors(): Promise<any[]> {
    return await this.generalService.get<any[]>('Other/OpByAction', 29002);
  }
}
