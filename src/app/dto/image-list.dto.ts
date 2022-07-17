import { Image } from "../models/image.model";

export type DtoImageKey = {
    name: string;
};
export type ImageKey = string
export type DtoImage = Record<ImageKey, Image>