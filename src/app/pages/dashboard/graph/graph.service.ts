import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class GraphService {
  loadedContent: any; // will create a real type later

  constructor(private http: Http) {
  }


  sendUpdatedGraph(cyObject: Array<Object>) {
    var options = {};
    options["directed"] = true;
    options["multigraph"] = false;
    options["compound"] = false;

    var nodes = [];
    var elements = cyObject["elements"];
    elements["nodes"].forEach(
      function (element) {
        var node = {};
        node["v"] = element.data.id;
        var value = {};
        value["label"] = "node " + element.data.id;
        value["POI"] = element.data.POI;
        value["beacon"] = element.data.beacon;
        var coord = {};
        coord["x"] = element.position.x;
        coord["y"] = element.position.y;
        value["coord"] = coord;
        node["value"] = value;
        nodes.push(node);
      });

    var edges = [];
    elements["edges"].forEach(
      function (element) {
        var edge = {};
        edge["v"] = element.data.source;
        edge["w"] = element.data.target;
        var value = {};
        value["label"] = "edge " + element.data.source + "->" + element.data.target;
        value["weight"] = 2;
        edge["value"] = value;
        edges.push(edge);
        var edge2 = {};
        edge2["v"] = element.data.target;
        edge2["w"] = element.data.source;
        var value2 = {};
        value2["label"] = "edge " + element.data.target + "->" + element.data.source;
        value2["weight"] = 2;
        edge2["value"] = value2;
        edges.push(edge2);
      });

    var jsonToSend = {};
    jsonToSend["options"] = options;
    jsonToSend["nodes"] = nodes;
    jsonToSend["edges"] = edges;
    jsonToSend["temp"] = cyObject;


    this.http.post('https://followit-backend.herokuapp.com/api/updateGraph', jsonToSend).subscribe(res => {
      console.log("HTTP post OK");
    });
  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://followit-backend.herokuapp.com/api/graph')
        .subscribe(response => {
          resolve(response.json())
        });
    });
  }
}
