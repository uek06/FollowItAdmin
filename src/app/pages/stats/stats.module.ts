import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './stats.routing';
import { Stats } from './stats.component';
import { ChartistJs } from './chartistJs/chartistJs.component';
import { ChartistJsService } from './chartistJs/chartistJs.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Stats,
    ChartistJs
  ],
  providers: [
    ChartistJsService
  ]
})
export default class StatsModule {}
