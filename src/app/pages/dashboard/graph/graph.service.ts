import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class GraphService {
  loadedContent: any; // will create a real type later

  constructor(private http: Http) {
  }
}
