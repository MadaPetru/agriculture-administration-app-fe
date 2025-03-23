import {ImageRequest} from "../../../../shared/dto/request/image-request";

export interface UploadFieldImageRequest {
  at: string,
  images: [ImageRequest]
}
