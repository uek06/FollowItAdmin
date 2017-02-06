import {Component, ViewEncapsulation, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer} from '@angular/core';
import {Ng2Uploader} from 'ng2-uploader/ng2-uploader';

import { EditTableStoresService } from './editTableStores.service';
import { LocalDataSource } from '../../ng2-smart-table/build/ng2-smart-table';

import {GlobalService} from '../../global.service';
import {StoresService} from '../stores.service';

@Component({
  selector: 'editTableStores',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./editTableStores.scss')],
  template: require('./editTableStores.html'),
  providers: [Ng2Uploader]
})
export class EditTableStores {
  @Input() defaultPicture: string = '';
  @Input() picture: string = '';

  @Input() uploaderOptions: any = {};
  @Input() canDelete: boolean = true;

  onUpload: EventEmitter<any> = new EventEmitter();
  onUploadCompleted: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileUpload') protected _fileUpload: ElementRef;

  public uploadInProgress: boolean = false;

  currentPoiPicture: string;
  pictureHasBeenUpdated:boolean = false;

  public inProgress: boolean = false;

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      poi: {
        title: 'Name',
        type: 'string',
        sortDirection	: 'asc'
      },
      discount: {
        title: 'Discount',
        type: 'string'
      },
      image: {
        title: 'Image',
        type: 'html',
        editable: false,
        valuePrepareFunction: (value) => { return '<img class="vignette" src="' + value + '" />' }
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private storesService: StoresService, protected service: EditTableStoresService, private globalService: GlobalService, private renderer: Renderer, protected _uploader: Ng2Uploader) {
    this.service.getPOIs().then((data) => {
      this.source.load(data);
    });
    this.storesService.myUpdatedPicture$.subscribe((newPictureData: string) => {
      this.pictureHasBeenUpdated = true;
      this.currentPoiPicture = newPictureData;
    });
  }

  onCreateConfirm(event): void {
    this.source.getElements().then((data) => {
      var max = 0;
      data.forEach(
        function(element) {
          if (element['poiID'] > max) {
            max = element['poiID'];
          }
        }.bind(this));

      event.newData['poiID'] = "" + ++max;
      event.confirm.resolve(event.newData);
    });

  }

  private clicked(event) {
    event.preventDefault();
    this.globalService.getData().then((data) => {
      this.service.sendUpdatedPOI(this.source.getAll(), data["temp"]);
    });
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onEdit(event): void {
    this.storesService.sendPOISelected(event.data);
  }
  onEditConfirm(event): void {
    if (this.pictureHasBeenUpdated) {
      event.newData['image'] = this.currentPoiPicture;
    }
    this.storesService.sendEndSelection();
    event.confirm.resolve(event.newData);
    this.pictureHasBeenUpdated = false;
  }


}
