import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events";
  private _specialEventsUrl = "http://localhost:3000/api/special";
  private _specialContact = "http://localhost:3000/api/contact";

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl)
  }
  getContacts(){
    return this.http.get<any>(this._specialContact)
  }
  getImages(){
    return this.http.get('ngApp/src/assets/img');
  }
}
