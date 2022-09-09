import { Pipe, PipeTransform } from '@angular/core';
import {imagesUrl} from "../app.component";

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string | null): string {
    if (value == null || value?.length == 0) return "none";
    return "url('" + imagesUrl + value + "')";
  }

}
