import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Stores } from './stores.component';
import { routing }       from './stores.routing';

import { EditTableStores } from './editTableStores/editTableStores.component';
import { EditTableStoresService } from './editTableStores/editTableStores.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import {ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    ModalModule
  ],
  declarations: [
    EditTableStores,
    Stores
  ],
  providers: [
    EditTableStoresService
  ]
})
export default class StoresModule {}
