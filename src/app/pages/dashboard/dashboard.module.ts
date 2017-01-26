import { NgModule }      from '@angular/core';
import {Input} from 'angular2/angular2'
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';
import { FormsModule as AngularFormsModule } from '@angular/forms';

import { PopularApp } from './popularApp';
import { PieChart } from './pieChart';
import { Graph } from './graph';
import { FormNode } from './formNode';
import { TrafficChart } from './trafficChart';
import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Feed } from './feed';
import { Todo } from './todo';
import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';
import { FeedService } from './feed/feed.service';
import { LineChartService } from './lineChart/lineChart.service';
import { PieChartService } from './pieChart/pieChart.service';
import { GraphService } from './graph/graph.service';
import { TodoService } from './todo/todo.service';
import { TrafficChartService } from './trafficChart/trafficChart.service';
import { UsersMapService } from './usersMap/usersMap.service';

import {ModalModule } from 'ng2-bootstrap/ng2-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    ModalModule
  ],
  declarations: [
    PopularApp,
    PieChart,
    Graph,
    FormNode,
    TrafficChart,
    UsersMap,
    LineChart,
    Feed,
    Todo,
    Calendar,
    Dashboard
  ],
  providers: [
    CalendarService,
    FeedService,
    LineChartService,
    PieChartService,
    GraphService,
    TodoService,
    TrafficChartService,
    UsersMapService
  ]
})
export default class DashboardModule {}
