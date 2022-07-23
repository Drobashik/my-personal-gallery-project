import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { LoadingHandler } from '../../services/loading-handler';

@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.scss']
})

export class UserGalleryComponent implements OnInit {

  loadingHandler = new LoadingHandler();

  file: File | null;

  previewFile: SafeUrl;
  
  isShowingPreview: boolean = false;

  constructor( private imageService: ImageService,
    private domSanitizer: DomSanitizer ) { }

  ngOnInit(): void {
  }

  uploadFile() {
    if (this.file) {
      const imageId = Date.now()
      this.loadingHandler.beginLoading()
      this.imageService.uploadImage(this.file, `images/${imageId}`)
      .pipe( switchMap((dataUrl) => this.imageService.postImage(dataUrl, imageId)) )
      .subscribe({
        next: () => {
          this.isShowingPreview = false;
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.file = null;
          this.loadingHandler.endLoading()
        }
      })
    }
  }
  
  chooseFile(file: File) {
    if (file) {
      this.file = file
      this.isShowingPreview = true;
      const fileUrl = URL.createObjectURL(file);
      this.previewFile = this.domSanitizer.bypassSecurityTrustUrl(fileUrl)
      return;
    }
    this.isShowingPreview = false;
  }

  deletePhotoFromPreview() {
    this.isShowingPreview = false
    this.file = null;
  }
}
