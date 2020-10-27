import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TimesprimeirakillService} from 'src/app/services//charts/timesprimeirakill.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-timesprimeirakill',
  templateUrl: './timesprimeirakill.component.html',
  styleUrls: ['./timesprimeirakill.component.css']
})

export class TimesprimeirakillComponent implements OnInit{
  private chart: am4charts.XYChart;
  data: any
  chartsdata = []

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private TimesprimeirakillService: TimesprimeirakillService) {   }
  async ngOnInit() {this.getData()}

  
  getData(){
    // buscando os dados do serviço e trasformando em array de dicionários  
    this.TimesprimeirakillService.getChart().subscribe(data => {
      this.data = data;
      this.data.forEach(values => {
        this.chartsdata.push({
          nome: values.nome,
          first_kills: values.first_kills,
          href: values.logo_angular
        });
      });    
      this.zone.runOutsideAngular(() => {      
        this.browserOnly(() => {
          //construção do gráfico
          am4core.useTheme(am4themes_animated);                
          let chart = am4core.create("chartdiv-timesprimeirakill", am4charts.XYChart);
          chart.padding(40, 40, 40, 40);
          
          let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.dataFields.category = "nome";
          categoryAxis.renderer.minGridDistance = 1;
          categoryAxis.renderer.inversed = true;
          categoryAxis.renderer.grid.template.disabled = true;
          
          let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
          valueAxis.min = 0;
          
          let series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.categoryY = "nome";
          series.dataFields.valueX = "first_kills";
          series.tooltipText = "{valueX.value}"
          series.columns.template.strokeOpacity = 0;
          series.columns.template.column.cornerRadiusBottomRight = 5;
          series.columns.template.column.cornerRadiusTopRight = 5;
          
          let labelBullet = series.bullets.push(new am4charts.LabelBullet())
          labelBullet.label.horizontalCenter = "left";
          labelBullet.label.dx = 10;
          labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
          labelBullet.locationX = 1;
                
          series.columns.template.adapter.add("fill", function(fill, target){
            return chart.colors.getIndex(target.dataItem.index);
          });
          
          categoryAxis.sortBySeries = series;                    
          chart.data = this.chartsdata;
        });      
      });
    });
  }    
  
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  
  ngAfterViewInit() {
  }

  ngOnDestroy() {    
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}