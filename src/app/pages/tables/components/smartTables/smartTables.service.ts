import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
@Injectable()
export class SmartTablesService {
  constructor(private http: Http) {

  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://followit-backend.herokuapp.com/api/graph')
        .subscribe(response => {
          resolve(response.json().beacons)
        });
    });
  }
}
