import {Component, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Output()
  imageUpload = new EventEmitter<File>();

  constructor(
    private host: ElementRef<HTMLInputElement> ) {
  }

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    if (file) {
      this.imageUpload.emit(file);
      this.host.nativeElement.files = null;
    }
  }



}
