import {Component, ViewEncapsulation} from '@angular/core';

import { EditTableService } from './editTable.service';
import { LocalDataSource } from 'ng2-smart-table';

import {GlobalService} from '../../global.service';

@Component({
  selector: 'editTable',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./editTable.scss')],
  template: require('./editTable.html')
})
export class EditTable {

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
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string'
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

  constructor(protected service: EditTableService, private globalService: GlobalService) {
    this.service.getBeacons().then((data) => {
      this.source.load(data);
    });
  }

  private clicked(event) {
    event.preventDefault();

    this.globalService.getData().then((data) => {
      this.service.sendUpdatedBeacons(this.source.getElements(), data["temp"]);
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
}
