import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'stores', loadChildren: () => System.import('./stores/stores.module') },
      { path: 'beacons', loadChildren: () => System.import('./beacons/beacons.module') },
      //{ path: 'components', loadChildren: () => System.import('./components/components.module') }
      { path: 'stats', loadChildren: () => System.import('./stats/stats.module') }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
