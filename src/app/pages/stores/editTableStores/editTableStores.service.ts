import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {GlobalService} from '../../global.service';
@Injectable()
export class EditTableStoresService {
  constructor(private http: Http, private globalService: GlobalService) {

  }

  getPOIs(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://followit-backend.herokuapp.com/api/getallpoi')
        .subscribe(response => {
          resolve(response.json())
        });
    });
  }

  sendUpdatedPOI(promise: Promise<any>, temp: Array<Object>) {
    promise.then((data) => {
      var newIDs = [];
      data.forEach(
        function(element) {
          newIDs.push(element["poiID"]);
        });
      temp["elements"]["nodes"].forEach(
        function(element) {
          var idToRemove = [];
          element['data']["poiID"].forEach(
            function(id) {
              if ($.inArray(id, newIDs) < 0) {
                idToRemove.push(id);
              }
            });
          idToRemove.forEach(
            function(id) {
              element['data']["poiID"].splice($.inArray(id, element['data']["poiID"]), 1);
            });

        });
      this.globalService.sendUpdatedGraph(temp);
      var pois = {};
      pois["pois"] = data;
      this.http.post('https://followit-backend.herokuapp.com/api/updatePOIs', pois).subscribe(res => {
        console.log("HTTP post OK");
      });
    });

  }
}
