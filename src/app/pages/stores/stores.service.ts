import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable,Subject} from "rxjs";

@Injectable()
export class StoresService {
  myPOIObject$: Observable<Object>;
  private POIObjectSubject: Subject<Object>;

  myUpdatedPicture$: Observable<Object>;
  private updatedPictureSubject: Subject<Object>;

  myEndSelection$: Observable<Object>;
  private endSelectionSubject: Subject<Object>;

  constructor(private http: Http) {
    this.POIObjectSubject = new Subject<Object>();
    this.myPOIObject$ = this.POIObjectSubject.asObservable();

    this.updatedPictureSubject = new Subject<Object>();
    this.myUpdatedPicture$ = this.updatedPictureSubject.asObservable();
    
    this.endSelectionSubject = new Subject<Object>();
    this.myEndSelection$ = this.endSelectionSubject.asObservable();
  }

  sendEndSelection() {
    this.endSelectionSubject.next();
  }

  sendPOISelected(data : Object) {
    this.POIObjectSubject.next(data);
  }
  sendNewPicture(picture : string) {
    this.updatedPictureSubject.next(picture);
  }
}
