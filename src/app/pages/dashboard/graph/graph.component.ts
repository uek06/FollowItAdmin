import {Component, ViewEncapsulation} from '@angular/core';

import {GraphService} from './graph.service';

import './graph.loader.ts';
import {cytoscape} from "./graph.loader";

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
      //this._loadGraph();
      this._updatePieCharts();
      this._init = true;
    }
  }

  private _loadGraph() {
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
        inside["id"] = start+finish;
        inside["source"] = start;
        inside["target"] = finish;
        var o = {};
        o["data"] = inside;
        newJson.push(o);
      });
    this.cy = cytoscape({
      container: $('#cy'),
      elements:newJson,

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        }
      ]


    });
    var options = {
      name: 'random',

      fit: true, // whether to fit to viewport
      padding: 30, // fit padding
      boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
      animate: false, // whether to transition the node positions
      animationDuration: 500, // duration of animation in ms if enabled
      animationEasing: undefined, // easing of animation if enabled
      ready: undefined, // callback on layoutready
      stop: undefined // callback on layoutstop
    };

    this.cy.layout( options );
    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }


  private clicked(event) {
    event.preventDefault();

    this._pieChartService.sendUpdatedGraph( this.cy.json().elements);
  }

  private addNode(event){
    event.preventDefault();

    this.cy.add([
      { group: "nodes", data: { id: "n0" }, },
      { group: "nodes", data: { id: "n1" },  },
      { group: "edges", data: { id: "e0", source: "n0", target: "n1" }, },
      { group: "edges", data: { id: "a0", source: "a", target: "n0" } }
    ]);
  }

  private _updatePieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts .chart').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
