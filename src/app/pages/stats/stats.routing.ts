import { Routes, RouterModule }  from '@angular/router';

import { Stats } from './stats.component';
import { ChartistJs } from './chartistJs/chartistJs.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Stats,
    children: [
    ]
  }
];

export const routing = RouterModule.forChild(routes);
