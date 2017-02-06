import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Stores } from './stores.component';
import { routing }       from './stores.routing';

import { EditTableStores } from './editTableStores/editTableStores.component';
import { EditTableStoresService } from './editTableStores/editTableStores.service';
import { Ng2SmartTableModule } from './../ng2-smart-table/build/ng2-smart-table';

import { PictureUploader } from './pictureUploader/pictureUploader.component';
import { StoresService } from './stores.service';

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    EditTableStores,
    Stores,
    PictureUploader
  ],
  providers: [
    EditTableStoresService,
    StoresService
  ]
})
export default class StoresModule {}
