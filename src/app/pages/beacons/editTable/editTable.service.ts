import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {GlobalService} from '../../global.service';
@Injectable()
export class EditTableService {
  constructor(private http: Http, private globalService: GlobalService) {

  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://followit-backend.herokuapp.com/api/getAllBeacons')
        .subscribe(response => {
          resolve(response.json())
        });
    });
  }
  sendUpdatedBeacons(promise: Promise<any>, temp: Array<Object>) {
    promise.then((data) => {
      var newIDs = [];
      data.forEach(
        function(element) {
          newIDs.push(element["beaconID"]);
        });
      //var temp2 = temp;
      temp["elements"]["nodes"].forEach(
        function(element) {
          if ($.inArray(element['data']['beaconID'], newIDs) < 0) {
            delete element['data']['beaconID'];
          }
        });
      this.globalService.sendUpdatedGraph(temp);

      var beacons = {};
      beacons["beacons"] = data;
      this.http.post('https://followit-backend.herokuapp.com/api/updateBeacons', beacons).subscribe(res => {
        console.log("HTTP post OK");
      });
    });

  }
}
