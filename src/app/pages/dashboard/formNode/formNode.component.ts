import {Component} from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Input, Output, EventEmitter} from '@angular/core'
import {TestService} from '../test.service';

@Component({
  selector: 'formNode',
  template: require('./formNode.html'),
})
export class FormNode {
  node:Object;
  constructor(private service: TestService) {
    service.myNodeObject$.subscribe((nodeData: Object) => {
      this.node = nodeData;
    });
  }
}
