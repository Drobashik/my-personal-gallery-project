import { Injectable } from "@angular/core";
import { Image } from "../models/image.model";

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    images: Image[] = [
        {url: './assets/imgtest/1.jpg'},
        {url: './assets/imgtest/2.jpg'},
        {url: './assets/imgtest/3.jpg'},
        {url: './assets/imgtest/4.jpg'}
    ];


}