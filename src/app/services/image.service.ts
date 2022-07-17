import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Image } from "../models/image.model";
import { Storage, ref, uploadBytes } from "@angular/fire/storage";
import { from, map, Observable, switchMap } from "rxjs";
import { getDownloadURL } from "firebase/storage";
import { DtoImage, DtoImageKey } from "../dto/image-list.dto";

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    urlImages: string = 'https://gallery-23284-default-rtdb.firebaseio.com/';

    images: Image[] = [];

    constructor(private http: HttpClient, private storage: Storage) {}

    getImages(): Observable<Image[]> {
        return this.http.get<DtoImage>(`${this.urlImages}/images.json`).pipe(
            map(dataURLs => {
                return Object.entries(dataURLs).map(([key, values]) => {
                    const image: Image = {
                        id: key,
                        url: values.url
                    }
                    return image;
                })
            })
        )
    }

    uploadImage(image: File, path: string): Observable<string> {
        const storageRef = ref(this.storage, path);
        const uploadTask = from(uploadBytes(storageRef, image));

        return uploadTask.pipe(
            switchMap(result =>  {
                return getDownloadURL(result.ref)
            })
        )
    }

    postImage(dataUrl: string): Observable<Image> {
        console.log(dataUrl);
        return this.http.post<DtoImageKey>(`${this.urlImages}/images.json`, {url: dataUrl}).pipe(
            map(response => {
                const image: Image = {
                    id: response.name,
                    url: dataUrl,
                }
                return image;
            })
        )
    }

    deleteImage(imageId: string) {
        return this.http.delete(`${this.urlImages}/images/${imageId}.json`)
    }

}