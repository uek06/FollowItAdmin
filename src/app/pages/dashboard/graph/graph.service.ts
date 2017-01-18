import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class GraphService {
  loadedContent: any; // will create a real type later
  obs: Observable<any>;

  constructor(private _baConfig:BaThemeConfigProvider, private http: Http) {
    this.obs = this.http.get('https://followit-backend.herokuapp.com/api/graph')
      .map((res:Response) => res.json())
      .do(res => {
          var newJson = [];

          res.nodes.forEach(
            function (element) {
              var inside = {};
              inside["id"] = element.v;
              var o = {};
              o["data"] = inside;
              newJson.push(o);
            });
          res.edges.forEach(
            function (element) {
              let start = element.v;
              let finish = element.w;
              var inside = {};
              inside["id"] = start+finish;
              inside["source"] = start;
              inside["target"] = finish;
              var o = {};
              o["data"] = inside;
              newJson.push(o);
            });
        //this.loadedContent = newJson;
        }
        );
  }

  getContent() {
    if (this.loadedContent) {
      return Observable.of(this.loadedContent);
    } else {
      return this.obs;
    }
  }

  sendUpdatedGraph(o : Array<Object>){
    var options = {};
    options["directed"] = true;
    options["multigraph"] = false;
    options["compound"] = false;

    var nodes = [];
    o["nodes"].forEach(
      function (element) {
        var node = {};
        node["v"] = element.data.id;
        var label = {};
        label["label"] = "node "+element.data.id;
        node["value"] = label;
        nodes.push(node);
      });

    var edges = [];
    o["edges"].forEach(
      function (element) {
        var edge = {};
        edge["v"] = element.data.source;
        edge["w"] = element.data.target;
        var label = {};
        label["label"] = "edge "+element.data.source+"->"+element.data.target;
        edge["value"] = label;
        edges.push(edge);
      });

    var jsonToSend = {};
    jsonToSend["options"] = options;
    jsonToSend["nodes"] = nodes;
    jsonToSend["edges"] = edges;

     /*$.ajax({
       type: 'POST',
       url: 'https://followit-backend.herokuapp.com/api/updateGraph',
       data: jsonToSend,
       dataType: 'json'
     });*/
    this.http.post('https://followit-backend.herokuapp.com/api/updateGraph',jsonToSend).subscribe(res => {
      console.log("trop sec");
    });
}

  //getItems():Observable<TodoItem> { return this.http.get('/api/todo').map((res: Response) => res.json()); }
  getData() {
    //let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    var newJson = [];
    return this.http.get('https://followit-backend.herokuapp.com/api/graph');
    /*return this.http.get('https://followit-backend.herokuapp.com/api/graph')
      .map(res => res.json())
      .subscribe(races => {
        races.nodes.forEach(
          function (element) {
            var inside = {};
            inside["id"] = element.v;
            var o = {};
            o["data"] = inside;
            newJson.push(o);
          });
        races.edges.forEach(
          function (element) {
            let start = element.v;
            let finish = element.w;
            var inside = {};
            inside["id"] = start+finish;
            inside["source"] = start;
            inside["target"] = finish;
            var o = {};
            o["data"] = inside;
            newJson.push(o);
          });

        //console.log(newJson);
        return newJson;*/
      //}
      //)


    //return[];
/*    return [
      {
        color: pieColor,
        description: 'New Visits',
        stats: '57,820',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Purchases',
        stats: '$ 89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: 'Active Users',
        stats: '178,391',
        icon: 'face',
      }, {
        color: pieColor,
        description: 'Returned',
        stats: '32,592',
        icon: 'refresh',
      }
    ];*/
  }
}
