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
      poi: {
        title: 'Name',
        type: 'string'
      },
      discount: {
        title: 'Discount',
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

  onCreateConfirm(event): void {
     if (window.confirm('Are you sure you want to create?')) {
       this.source.getElements().then((data) => {
         var max = 0;
         data.forEach(
      function (element) {
        if (element['poiID'] > max) {
          max = element['poiID'];
        }
      }.bind(this));

             event.newData['poiID'] = ""+ ++max;
             event.confirm.resolve(event.newData);
       });

     } else {
       event.confirm.reject();
     }
   }

  private clicked(event) {
    event.preventDefault();
    this.service.sendUpdatedPOI(this.source.getElements());
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
