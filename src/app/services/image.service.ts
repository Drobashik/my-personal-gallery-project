import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Image } from "../models/image.model";
import { Storage, ref, uploadBytes } from "@angular/fire/storage";
import { from, map, Observable, switchMap } from "rxjs";
import { getDownloadURL } from "firebase/storage";

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    urlImages: string = 'https://gallery-23284-default-rtdb.firebaseio.com/';

    images: Image[] = [];

    constructor(private http: HttpClient, private storage: Storage) {}

    getImages() {
        return this.http.get(`${this.urlImages}/images.json`).pipe(
            map(dataURLs => {
                return Object.keys(dataURLs)
                    .map(keys => {
                        return (dataURLs as any)[keys]
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

    postImage(dataUrl: string) {
        return this.http.post(`${this.urlImages}/images.json`, {url: dataUrl})
    }

}