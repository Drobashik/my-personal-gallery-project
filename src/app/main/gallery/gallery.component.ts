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
export class GalleryComponent implements OnInit {

  imagesArray: Image[] = []
  imageShowed: Image;
  
  loadingHandler = new LoadingHandler();
  smallLoadingHandler = new LoadingHandler();
  
  chosenIndex: number;
  indexOfImageArray: number = 0;

  openedImage: boolean = false;
  isEmptyArray: boolean = false;


  constructor(private imageService: ImageService, public userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.isEmptyArray = false;

    this.loadingHandler.beginLoading()

    this.imageService.getImages().subscribe({
      next: (images) => {
        images.forEach(element => this.imagesArray.push(element))
      },
      error: (error) => {
        this.isEmptyArray = true
        this.loadingHandler.endLoading()
      },
      complete: () => {
        this.loadingHandler.endLoading()
      }
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

  deleteImage(imageId: string, index: number, fileName: number) {
    this.chosenIndex = index
    this.smallLoadingHandler.beginLoading()
    this.imageService.deleteImage(imageId, fileName).subscribe({
      next: () => {
        this.imagesArray = this.imagesArray.filter(image => image.id !== imageId)
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        if (!this.imagesArray.length) {
          this.isEmptyArray = !this.isEmptyArray;
        }
        this.smallLoadingHandler.endLoading()
      },
    });
  }
  
}
