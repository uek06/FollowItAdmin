export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Polytech3000\'s map',
            icon: 'ion-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'stores',
        data: {
          menu: {
            title: 'Points of interest',
            icon: 'ion-ios-cart-outline',
            selected: false,
            expanded: false,
            order: 50
          }
        }
      },
      {
        path: 'beacons',
        data: {
          menu: {
            title: 'Beacons',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 50
          }
        }
      },
      {
        path: 'stats',
        data: {
          menu: {
            title: 'Stats',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 50
          }
        }
      }

    ]
  }
];
