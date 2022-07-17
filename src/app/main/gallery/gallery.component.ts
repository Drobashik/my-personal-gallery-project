import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Image } from '../../models/image.model';
import { ImageService } from '../../services/image.service';
import { LoadingHandler } from '../../services/loading-handler';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {

  constructor(private imageService: ImageService, public userAuthService: UserAuthService) { }

  imagesArray: Image[] = []
  imageShowed: Image;

  loadingHandler = new LoadingHandler();
  smallLoadingHandler = new LoadingHandler();

  chosenIndex: number

  indexOfImageArray: number = 0;
  openedImage: boolean = false;

  ngOnInit(): void {
    this.loadingHandler.beginLoading()
    this.imageService.getImages().subscribe(imageUrl => {
      console.log(imageUrl);
      imageUrl.forEach(element => this.imagesArray.push(element))
      this.loadingHandler.endLoading()
    })
  }
  openImage(index: number) {
    this.openedImage = true;
    this.indexOfImageArray = index
    this.imageShowed = this.imagesArray[this.indexOfImageArray]
  }

  closeImage() {
    this.openedImage = false;
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

  deleteImage(imageId: string, index: number) {
    this.chosenIndex = index
    this.smallLoadingHandler.beginLoading()
    this.imageService.deleteImage(imageId).subscribe(data => {
      this.imagesArray = this.imagesArray.filter(image => image.id !== imageId)
      this.smallLoadingHandler.endLoading()
    });
  }

  ngOnDestroy(): void {
    this.imagesArray = []
  }

}
