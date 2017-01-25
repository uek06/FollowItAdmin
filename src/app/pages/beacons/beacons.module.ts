import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Beacons } from './beacons.component';
import { routing }       from './beacons.routing';

import { EditTable } from './editTable/editTable.component';
import { EditTableService } from './editTable/editTable.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    Ng2SmartTableModule
  ],
  declarations: [
    EditTable,
    Beacons
  ],
  providers: [
    EditTableService
  ]
})
export default class BeaconsModule {}
