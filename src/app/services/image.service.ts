import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage, ref, uploadBytes } from "@angular/fire/storage";
import { deleteObject, getDownloadURL } from "firebase/storage";

import { from, map, Observable, switchMap } from "rxjs";
import { Image } from "../models/image.model";
import { DtoImage, DtoImageKey } from "../dto/image-list.dto";

@Injectable({
    providedIn: 'root'
})

export class ImageService {

    urlImages: string = 'https://gallery-23284-default-rtdb.firebaseio.com/';

    constructor(private http: HttpClient, private storage: Storage ) {}

    getImages(): Observable<Image[] | any[]> {
        return this.http.get<DtoImage>(`${this.urlImages}/images.json`).pipe(
            map(dataURLs => {
                return Object.entries(dataURLs).map(([key, values]) => {
                    const image: Image = {
                        id: key,
                        url: values.url,
                        name: values.name
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
            switchMap(result => getDownloadURL(result.ref))
        )
    }

    postImage(dataUrl: string, nameImage: number): Observable<Image> {
        return this.http.post<DtoImageKey>(`${this.urlImages}/images.json`, {url: dataUrl,  name: nameImage}).pipe(
            map(response => {
                const image: Image = {
                    id: response.name,
                    url: dataUrl,
                    name: nameImage
                };
                return image;
            })
        )
    }

    deleteImage(imageId: string, fileName: number) {
        const storage = ref(this.storage, `images/${fileName}`);
        deleteObject(storage);
        return this.http.delete(`${this.urlImages}/images/${imageId}.json`);
    }

}