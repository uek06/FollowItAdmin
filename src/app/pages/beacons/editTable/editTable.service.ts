import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
@Injectable()
export class EditTableService {
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

  sendUpdatedBeacons(promise :Promise<any>) {
    promise.then((data) => {
      this.http.post('https://followit-backend.herokuapp.com/api/updateBeacons', data).subscribe(res => {
        console.log("HTTP post OK");
      });
    });

  }
}
