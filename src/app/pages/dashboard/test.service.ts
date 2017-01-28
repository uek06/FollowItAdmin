import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable,Subject} from "rxjs";

@Injectable()
export class TestService {
  myNodeObject$: Observable<Object>;
  private nodeObjectSubject: Subject<Object>;
  constructor(private http: Http) {
    this.nodeObjectSubject = new Subject<Object>();
    this.myNodeObject$ = this.nodeObjectSubject.asObservable();
  }

  getData(): string {
    return "getdata";
  }

  sendData(data : Object) {
    this.nodeObjectSubject.next(data);
  }
}
