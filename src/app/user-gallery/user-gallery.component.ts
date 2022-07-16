import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.scss']
})
export class UserGalleryComponent implements OnInit {

  constructor( private imageService: ImageService ) { }

  ngOnInit(): void {
  }

  fileName: string = 'Upload image'


  uploadFile(event: Event) {
    const file = (<HTMLInputElement>event.target).files![0]
    this.fileName = file.name;
    this.imageService.uploadImage(file, `images/${new Date()}`).subscribe(data => {
      this.imageService.postImage(data).subscribe(data => {
        console.log(data);
      })
    })
  }
}
