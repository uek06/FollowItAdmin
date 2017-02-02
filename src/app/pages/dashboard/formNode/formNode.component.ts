import {Component} from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Input, Output, EventEmitter} from '@angular/core'
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {TestService} from '../test.service';

@Component({
  selector: 'formNode',
  template: require('./formNode.html'),
})
export class FormNode {
  node:Object;
  pois : Array<Object>;
  beacons : Array<Object>;
   public myForm: FormGroup; // our form model

  constructor(private service: TestService, private _fb: FormBuilder) {
    service.myNodeObject$.subscribe((nodeData: Object) => {
      this.service.getBeacons().then((data) => {
        this.beacons = data;

      });
      this.service.getPOIs().then((data) => {
        this.pois = data;

      });

      this.myForm = this._fb.group({
            id: ['', Validators.required],
            pois: this._fb.array([
                this.initStore(),
            ]),
            beacon: ['', Validators.required]
        });
      this.node = nodeData;
this.loadPOIs();
console.log(this.myForm.controls["pois"]);
    });
  }

  loadPOIs() {
    const control = <FormArray>this.myForm.controls['pois'];
    control.removeAt(0);
this.node["POI"].forEach(
      function (element) {
        control.push(this.initStoreWithID(element));
      }.bind(this));
    }

    initStoreWithID(givenId : string) {
          return this._fb.group({
              id: ['', Validators.required],
              storedId : givenId
          });
      }

  initStore() {
        return this._fb.group({
            id: ['', Validators.required]
        });
    }

    addStore() {
    const control = <FormArray>this.myForm.controls['pois'];
    control.push(this.initStore());
}

removeAddress(i: number) {
    const control = <FormArray>this.myForm.controls['pois'];
    control.removeAt(i);
}
  save(model: Object) {
        // call API to save customer
        console.log(model);
    }
}
