import {Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {Ng2Uploader} from 'ng2-uploader/ng2-uploader';

import {StoresService} from '../stores.service';

@Component({
  selector: 'picture-uploader',
  styles: [require('./pictureUploader.scss')],
  template: require('./pictureUploader.html'),
  providers: [Ng2Uploader]
})
export class PictureUploader {

  @Input() defaultPicture: string = '';
  @Input() picture: string = '';

  @Input() canDelete: boolean = true;

  onEdit: boolean = false;

  @ViewChild('fileUpload') protected _fileUpload: ElementRef;


  public uploadInProgress: boolean = false;

  constructor(private storesService: StoresService, private renderer: Renderer, protected _uploader: Ng2Uploader) {
    storesService.myPOIObject$.subscribe((poiData: Object) => {
      this.picture = poiData["image"];
      this.onEdit = true;
    });
    storesService.myEndSelection$.subscribe(() => {
      this.onEdit = false;
    });
  }



  public onFiles(): void {
    let files = this._fileUpload.nativeElement.files;

    if (files.length) {
      const file = files[0];
      this._changePicture(file);

      this.uploadInProgress = true;

    }
  }

  public bringFileSelector(): boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  public removePicture(): boolean {
    this.picture = '';
    this.storesService.sendNewPicture(this.picture);
    return false;
  }

  protected _changePicture(file: File): void {
    const reader = new FileReader();
    reader.addEventListener('load', (event: Event) => {
      this.picture = (<any>event.target).result;
      this.uploadInProgress = false;
      this.storesService.sendNewPicture(this.picture);
    }, false);
    reader.readAsDataURL(file);
  }


}
