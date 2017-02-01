import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'stores',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./stores.scss')],
  template: require('./stores.html')
})
export class Stores {

  constructor() {
  }

}
