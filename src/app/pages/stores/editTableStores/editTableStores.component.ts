import {Component, ViewEncapsulation} from '@angular/core';

import { EditTableStoresService } from './editTableStores.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'editTableStores',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./editTableStores.scss')],
  template: require('./editTableStores.html')
})
export class EditTableStores {

  query: string = '';

  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
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

  constructor(protected service: EditTableStoresService) {
    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }

  private clicked(event) {
    event.preventDefault();
    this.service.sendUpdatedBeacons(this.source.getElements());
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
