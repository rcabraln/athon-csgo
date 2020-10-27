import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EstadospartidasService} from 'src/app/services//charts/estadospartidas.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


@Component({
  selector: 'app-estadospartidas',
  templateUrl: './estadospartidas.component.html',
  styleUrls: ['./estadospartidas.component.css']
})

export class EstadospartidasComponent implements OnInit{
  private chart: am4charts.RadarChart;
  data: any
  chartsdata = []

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private EstadospartidasService: EstadospartidasService) {   }
  async ngOnInit() {this.getData()}  
  getData(){
    // buscando os dados do serviço e trasformando em array de dicionários  
    this.EstadospartidasService.getChart().subscribe(data => {
      this.data = data;      
      this.data.forEach(values => {
        this.chartsdata.push({
          title: values.nome,
          latitude: Number(values.lat),
          longitude: Number(values.lng) ,
          url: values.href
        });
      });    
      this.zone.runOutsideAngular(() => {      
        this.browserOnly(() => {               
          //construção do gráfico         
          /*
          am4core.useTheme(am4themes_animated);
          let chart = am4core.create("chartdiv-estadospartidas", am4charts.RadarChart);
          chart.padding(40, 40, 40, 40);       
          
          const agoryAxis = chart.yAxes.push(new am4charts.ValueAxis<any>());
          //const agoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());

          const categoryAxis = chart.xAxes.push(new am4charts.ValueAxis<any>());
          //let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          //categoryAxis.dataFields.data  = "direction";

          const valueAxis = chart.yAxes.push(new am4charts.ValueAxis<any>());          

          let range = categoryAxis.axisRanges.create();
          range.setProperty("category", "NW");
          range.setProperty("endCategory", "NW");          
          range.axisFill.fill = am4core.color("#0066CC");
          range.axisFill.fillOpacity = 0.3;

          let range2 = categoryAxis.axisRanges.create();          
          range2.setProperty("category", "N");
          range2.setProperty("endCategory", "N");
          range2.axisFill.fill = am4core.color("#0066CC");
          range2.axisFill.fillOpacity = 0.3;

          let range3 = categoryAxis.axisRanges.create();
          range3.setProperty("category", "SE");
          range3.setProperty("endCategory", "SW");          
          
          range3.axisFill.fill = am4core.color("#CC3333");
          range3.axisFill.fillOpacity = 0.3;
          range3.locations.endCategory = 0;

          
          let series = chart.series.push(new am4charts.RadarSeries());
          series.dataFields.valueY = "value";
          series.dataFields.categoryX = "direction";
          series.name = "Wind direction";
          series.strokeWidth = 3;
          series.fillOpacity = 0.2;
          chart.data = */          
          

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
