import {Component, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { EditTableService } from './editTable.service';
import { LocalDataSource } from '../../ng2-smart-table/build/ng2-smart-table';

import {GlobalService} from '../../global.service';

@Component({
  selector: 'editTable',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./editTable.scss')],
  template: require('./editTable.html')
})
export class EditTable {

  inProgress: boolean = false;

  query: string = '';

  settings = {
    noDataMessage : "Please wait...",
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
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      beaconID: {
        title: 'ID',
        type: 'string',
        editable : false
      },
      name: {
        title: 'Name',
        type: 'string',
        sortDirection: 'asc'
      },
      UUID: {
        title: 'UUID',
        type: 'string'
      },
      major: {
        title: 'Major',
        type: 'string'
      },
      minor: {
        title: 'Minor',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: EditTableService, private globalService: GlobalService, public modal: Modal, vcRef: ViewContainerRef) {
    modal.overlay.defaultViewContainer = vcRef;
    this.service.getBeacons().then((data) => {
      this.source.load(data);
    });
  }

  private clicked(event) {
    event.preventDefault();
    this.inProgress = true;
    this.globalService.getData().then((root) => {
      this.source.getAll().then((beacons) => {
        this.service.sendUpdatedBeacons(beacons, root["temp"]).then(() => {
          this.inProgress = false;
          this.showAlert();
        });
      });
    });

  }

  onCreateConfirm(event): void {
    this.source.getElements().then((data) => {
      var max = 0;
      data.forEach(
        function(element) {
          if (element['beaconID'] > max) {
            max = element['beaconID'];
          }
        }.bind(this));

      event.newData['beaconID'] = "" + ++max;
      event.confirm.resolve(event.newData);
    });

  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {

      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  showAlert() {
    this.modal.alert()
      .size('sm')
      .showClose(true)
      .title('Well done')
      .body('Updated with success')
      .open();
  }
}
