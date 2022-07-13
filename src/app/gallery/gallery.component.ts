import { Component, OnInit } from '@angular/core';
import { IImage } from '../shared/image';
import { ImageService } from '../shared/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  imagesArray: IImage[] = []
  imageShowed: IImage;

  indexOfImageArray: number = 0;
  openedImage: boolean = false;

  ngOnInit(): void {
    this.imagesArray = this.imageService.images;
  }

  openImage(index: number) {
    this.openedImage = true;
    this.indexOfImageArray = index
    this.imageShowed = this.imagesArray[this.indexOfImageArray]
  }

  closeImage() {
    this.openedImage = false;
    this.imageShowed = {url: ''};
  }

  nextImage() {
    if(this.indexOfImageArray >= this.imagesArray.length - 1)
      this.indexOfImageArray = -1;
    this.imageShowed = this.imagesArray[++this.indexOfImageArray]
  }

  previousImage() {
    if(this.indexOfImageArray <= 0)
      this.indexOfImageArray = this.imagesArray.length;
    this.imageShowed = this.imagesArray[--this.indexOfImageArray]
  }

}
