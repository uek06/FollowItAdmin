import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
@Injectable()
export class EditTableStoresService {
  constructor(private http: Http) {

  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://followit-backend.herokuapp.com/api/getallpoi')
        .subscribe(response => {
          resolve(response.json())
        });
    });
  }

  sendUpdatedPOI(promise :Promise<any>) {
    promise.then((data) => {
      var pois ={};
      pois["pois"] = data;
      this.http.post('https://followit-backend.herokuapp.com/api/updatePOIs', pois).subscribe(res => {
        console.log("HTTP post OK");
      });
    });

  }
}
