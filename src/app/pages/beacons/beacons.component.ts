import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'beacons',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./beacons.scss')],
  template: require('./beacons.html')
})
export class Beacons {

  constructor() {
  }

}
