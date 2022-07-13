import { Injectable } from "@angular/core";
import { IImage } from "./image";

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    images: IImage[] = [
        {url: './assets/imgtest/1.jpg'},
        {url: './assets/imgtest/2.jpg'},
        {url: './assets/imgtest/3.jpg'},
        {url: './assets/imgtest/4.jpg'}
    ];


}