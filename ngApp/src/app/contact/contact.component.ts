import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts = []

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getContacts()
      .subscribe(
        res => this.contacts = res,
        err => console.log(err)
      )
  }

}
