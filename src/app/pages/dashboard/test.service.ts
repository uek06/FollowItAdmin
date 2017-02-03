import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable,Subject} from "rxjs";

@Injectable()
export class TestService {
  myNodeObject$: Observable<Object>;
  private nodeObjectSubject: Subject<Object>;

  myUpdatedNode$: Observable<Object>;
  private updatedNodeSubject: Subject<Object>;

  constructor(private http: Http) {
    this.nodeObjectSubject = new Subject<Object>();
    this.myNodeObject$ = this.nodeObjectSubject.asObservable();

    this.updatedNodeSubject = new Subject<Object>();
    this.myUpdatedNode$ = this.updatedNodeSubject.asObservable();
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

  sendNodeSelected(data : Object) {
    this.nodeObjectSubject.next(data);
  }
  sendUpdatedNode(data : Object) {
    this.updatedNodeSubject.next(data);
  }
}
