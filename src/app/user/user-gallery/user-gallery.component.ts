import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { LoadingHandler } from '../../services/loading-handler';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.scss']
})

export class UserGalleryComponent implements OnInit {

  loadingHandler = new LoadingHandler();
  fileName: string = 'Upload image'

  constructor( private imageService: ImageService ) { }

  ngOnInit(): void {
  }

  uploadFile(event: Event) {
    this.loadingHandler.beginLoading()
    const file = (<HTMLInputElement>event.target).files![0]
    this.imageService.uploadImage(file, `images/${new Date()}`).subscribe(data => {
      this.fileName = file.name;
      this.loadingHandler.endLoading()
      this.imageService.postImage(data).subscribe(data => {
        console.log(data);
      })
    })
  }
}
