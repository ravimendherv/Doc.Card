import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomCommonService {

  private _eventBus: Subject<EventModal>;

  constructor() { 
    this._eventBus = new Subject<EventModal>();
  }

  emit(key:string, data?:any){
    this._eventBus.next({key, data});
  }

  on<T>(key:any):Observable<T> {
    return this._eventBus.pipe(
      filter(event => event.key === key),
      map((event) => event.data)
    )
  }
}

interface EventModal {
  key: string;
  data?:any;
}