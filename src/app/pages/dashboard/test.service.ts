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

  getPOIs(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://followit-backend.herokuapp.com/api/getAllPOI')
        .subscribe(response => {
          resolve(response.json())
        });
    });
  }

  getBeacons(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://followit-backend.herokuapp.com/api/getAllBeacons')
        .subscribe(response => {
          resolve(response.json())
        });
    });
  }

  sendData(data : Object) {
    this.nodeObjectSubject.next(data);
  }
}
