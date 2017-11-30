import { Injectable } from '@angular/core';
import { Bhv } from './bhv';
import { BHVS } from './mock-bhv';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

@Injectable()
export class BhvService {

  constructor(private messageService: MessageService) { }

  getBhvs(): Observable<Bhv[]> {
    // Todo: send the message _after_ fetching the bhvs
    //this.messageService.add('BhvService: fetched bhvs');
    return of(BHVS);
  }

  //obserable for asynchronous calls
  getBhv(id: number): Observable<Bhv> {
    // Todo: send the message _after_ fetching the bhv
    //this.messageService.add(`BhvService: fetched bhv id=${id}`);
    return of(BHVS.find(bhv => bhv.id === id));
  }
}
