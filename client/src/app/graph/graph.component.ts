import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  constructor(
    private helper: HelperService,
    private spinner: Ng4LoadingSpinnerService,
    private router: Router) { }
  graphData;
  graphInterval;
  showGraph;
  loadingSpinner = false;
  errorSpinner = false;
  noData = false;
  @ViewChild('graph') graph: ElementRef;
  ngOnInit() {
    this.spinner.show();
    this.loadingSpinner = true;
    this.helper.getGraphData().subscribe((data) => {
      if (data) {
        this.graphData = data;
        this.renderGraph();
      } else {
        this.noData = true;
      }
    }, error => {
      this.errorSpinner = true;
      this.loadingSpinner = false;
      setTimeout(() => {
        this.spinner.hide();
        this.errorSpinner = false;
        this.router.navigate(['']);
      }, 3000);
    });
  }

  renderGraph() {
    this.spinner.hide();
    this.loadingSpinner = false;
    am4core.options.commercialLicense = true;
    const chart = am4core.create(this.graph.nativeElement, am4charts.XYChart);
    chart.data = this.graphData;
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'count';
    series.dataFields.categoryX = 'year';
    series.name = 'Average Temperature';
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = .8;

    const columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    chart.legend = new am4charts.Legend();
  }


}
