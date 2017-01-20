import {Component, ViewEncapsulation} from '@angular/core';

import {GraphService} from './graph.service';

import './graph.loader.ts';
import {cytoscape} from "./graph.loader";
import {contextMenus} from "./graph.loader";
import {jquery} from "./graph.loader";
@Component({
  selector: 'graph',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./graph.scss')],
  template: require('./graph.html')
})
export class Graph {

  public charts: Array<Object>;
  public graphModel: Object;
  private _init = false;
  content: any; // real type to come later
  cy: any;

  constructor(private _pieChartService: GraphService) {
    //this.charts = this._pieChartService.getData();
    this._pieChartService.getContent().subscribe(content => {
      this.content = content;
      this._loadGraph();
    });
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._updatePieCharts();
      this._init = true;
    }
  }

  private jsonFromServerToCY() {
    var newJson = [];

    this.content.nodes.forEach(
      function (element) {
        var inside = {};
        inside["id"] = element.v;
        var o = {};
        o["data"] = inside;
        newJson.push(o);
      });
    this.content.edges.forEach(
      function (element) {
        let start = element.v;
        let finish = element.w;
        var inside = {};
        inside["id"] = start + finish;
        inside["source"] = start;
        inside["target"] = finish;
        var o = {};
        o["data"] = inside;
        newJson.push(o);
      });
    return newJson;
  }

  private _loadGraph() {
    var newJson = this.jsonFromServerToCY();
    this.cy = cytoscape({
      container: $('#cy')
    });
    this.cy.json(this.content.temp);


   /* this.cy = cytoscape({
      container: $('#cy'),
      elements: newJson,
      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'label': 'data(id)'
          }
        },
        {
          selector: 'edge',
          style: {
            'target-arrow-shape': 'triangle'
          }
        },
        {
          selector: ':selected',
          style: {}
        }
      ],
      layout: {
        name: 'grid',
        rows: 1
      }
    });*/

    var options = {
      // List of initial menu items
      menuItems: [
        {
          id: 'remove',
          title: 'remove',
          selector: 'node, edge',
          onClickFunction: function (event) {
            event.cyTarget.remove();
          },
          hasTrailingDivider: true
        },
        {
          id: 'rename',
          title: 'rename',
          selector: 'node',
          onClickFunction: function (event) {
            //event.cyTarget.id = "yolo";
            this.cy.$('#a').data('label', 'newName');
            this.cy.$('#a').data('id', 'newName')
          }.bind(this),
          hasTrailingDivider: true
        },
        {
          id: 'add-node',
          title: 'add node',
          coreAsWell: true,
          onClickFunction: function (event) {
            var data = {
              group: 'nodes'
            };

            this.cy.add({
              data: data,
              position: {
                x: event.cyPosition.x,
                y: event.cyPosition.y
              }
            });
            console.log('add node');
          }.bind(this)
        }
      ],
      // css classes that menu items will have
      menuItemClasses: [
        // add class names to this list
      ],
      // css classes that context menu will have
      contextMenuClasses: [
        // add class names to this list
      ]
    };
    contextMenus(cytoscape, jquery); // register extension

    this.cy.contextMenus(options);
  }


  private clicked(event) {
    event.preventDefault();
    console.log(this.cy.json());
    this._pieChartService.sendUpdatedGraph(this.cy.json());
  }

  private addNode(event) {
    event.preventDefault();
    console.log(this.cy.json().elements);
    this.cy.add([
      {group: "nodes", data: {id: "n0"},},
      {group: "nodes", data: {id: "n1"},},
      {group: "edges", data: {id: "e0", source: "n0", target: "n1"},},
      {group: "edges", data: {id: "a0", source: "a", target: "n0"}}
    ]);
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    jQuery('.pie-charts .chart').each(function (index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
