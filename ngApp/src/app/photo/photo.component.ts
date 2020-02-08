import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
 images1;
  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getImages()
    .subscribe(
      res => this.images1 = res,
      err => console.log(err)
    )
  }

  photoArray = [
    { title : "CAR" , imageUrl : "../../assets/img/car.jpg" , description : 'still dre' },
    { title : "Christmas-Event" , imageUrl : "../../assets/img/city.jpeg" , description : 'still dre' },
    { title : "Holi-Event" , imageUrl : "../../assets/img/fall.jpeg" , description : 'still dre' },
    { title : "Hunt-Event" , imageUrl : "../../assets/img/fog.jpeg" , description : 'still dre' },
    { title : "Unknown" , imageUrl : "../../assets/img/god.jpeg" , description : 'still dre' },
    { title : "Music Event" , imageUrl : "../../assets/img/green.png" , description : 'still dre' },
    { title : "Winter-TREE" , imageUrl : "../../assets/img/greenery.jpeg" , description : 'still dre' },
    { title : "Blur" , imageUrl : "../../assets/img/waters.jpeg" , description : 'still dre' },
 
  ]

}
