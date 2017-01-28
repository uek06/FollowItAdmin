import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
@Injectable()
export class EditTableService {
  constructor(private http: Http) {

  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://followit-backend.herokuapp.com/api/getAllBeacons')
        .subscribe(response => {
          resolve(response.json())
        });
    });
  }

  sendUpdatedBeacons(promise :Promise<any>) {
    promise.then((data) => {
      var beacons ={};
      beacons["beacons"] = data;
      this.http.post('https://followit-backend.herokuapp.com/api/updateBeacons', beacons).subscribe(res => {
        console.log("HTTP post OK");
      });
    });

  }
}
