import {Component, ViewEncapsulation} from '@angular/core';
import {GraphService} from './graph.service';

import './graph.loader.ts';
import {cytoscape} from "./graph.loader";
import {contextMenus} from "./graph.loader";
import {edgehandles} from "./graph.loader";
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
    //var newJson = this.jsonFromServerToCY();
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

    this.loadContextMenus();
    this.loadEdgehandles();

  }


  private clicked(event) {
    event.preventDefault();
/*    var apoi = [];
    apoi.push('Bat forum');
    this.cy.$('#a').data('POI', apoi);
    var bpoi = [];
    bpoi.push('RDC Bat Ouest');
    this.cy.$('#b').data('POI', bpoi);
    var cpoi = [];
    cpoi.push('Intersection c');
    this.cy.$('#c').data('POI', cpoi);
    var dpoi = [];
    dpoi.push('Parking prof');
    this.cy.$('#d').data('POI', dpoi);
    var epoi = [];
    epoi.push('Foyer côté est');
    this.cy.$('#e').data('POI', epoi);
    var fpoi = [];
    fpoi.push('Foyer côté ouest');
    this.cy.$('#f').data('POI', fpoi);*/
    this._pieChartService.sendUpdatedGraph(this.cy.json());
  }

  private loadContextMenus() {
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


  private loadEdgehandles() {
      // the default values of each option are outlined below:
      var defaults = {
        preview: true, // whether to show added edges preview before releasing selection
        stackOrder: 4, // Controls stack order of edgehandles canvas element by setting it's z-index
        handleSize: 10, // the size of the edge handle put on nodes
        handleColor: '#3e45ff', // the colour of the handle and the line drawn from it
        handleLineType: 'ghost', // can be 'ghost' for real edge, 'straight' for a straight line, or 'draw' for a draw-as-you-go line
        handleLineWidth: 1, // width of handle line in pixels
        handleIcon: false, // Pass an Image-object to use as icon on handle. Icons are resized according to zoom and centered in handle.
        handleOutlineColor: '#000000', // the colour of the handle outline
        handleOutlineWidth: 0, // the width of the handle outline in pixels
        handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
        handlePosition: 'middle bottom', // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
        hoverDelay: 150, // time spend over a target node before it is considered a target selection
        cxt: false, // whether cxt events trigger edgehandles (useful on touch)
        enabled: true, // whether to start the extension in the enabled state
        toggleOffOnLeave: false, // whether an edge is cancelled by leaving a node (true), or whether you need to go over again to cancel (false; allows multiple edges in one pass)
        edgeType: function( sourceNode, targetNode ) {
          // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
          // returning null/undefined means an edge can't be added between the two nodes
          return 'flat';
        },
        loopAllowed: function( node ) {
          // for the specified node, return whether edges from itself to itself are allowed
          return false;
        },
        nodeLoopOffset: -50, // offset for edgeType: 'node' loops
        nodeParams: function( sourceNode, targetNode ) {
          // for edges between the specified source and target
          // return element object to be passed to cy.add() for intermediary node
          return {};
        },
        edgeParams: function( sourceNode, targetNode, i ) {
          // for edges between the specified source and target
          // return element object to be passed to cy.add() for edge
          // NB: i indicates edge index in case of edgeType: 'node'
          return {};
        },
        start: function( sourceNode ) {
          // fired when edgehandles interaction starts (drag on handle)
        },
        complete: function( sourceNode, targetNodes, addedEntities ) {
          // fired when edgehandles is done and entities are added
        },
        stop: function( sourceNode ) {
          // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
        }
      };

      edgehandles( cytoscape ); // register extension
      this.cy.edgehandles( defaults );
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
