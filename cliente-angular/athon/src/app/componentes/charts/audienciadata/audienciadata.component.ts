import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AudienciadataService} from 'src/app/services//charts/audienciadata.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";


@Component({
  selector: 'app-audienciadata',
  templateUrl: './audienciadata.component.html',
  styleUrls: ['./audienciadata.component.css']
})

export class AudienciadataComponent implements OnInit{
  private chart: am4charts.XYChart;
  private colorSet = new am4core.ColorSet();
  data: any
  chartsdata = []

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private AudienciadataService: AudienciadataService) {   }
  async ngOnInit() {this.getData()}

  
  getData(){
    // buscando os dados do serviço e trasformando em array de dicionários  
    this.AudienciadataService.getChart().subscribe(data => {
      this.data = data;
      this.data.forEach(values => {
        this.chartsdata.push({
          title: values.title,
          id: values.id,
          color: values.color,
          regiao: values.regiao,
          x: values.x,
          y: values.y,
          value: values.value
        });
      });    
      this.zone.runOutsideAngular(() => {      
        this.browserOnly(() => {

          //construção do gráfico
          am4core.useTheme(am4themes_animated);                    
          let chart = am4core.create("chartdiv-audienciadata", am4charts.XYChart);

          let categoryAxisY = chart.yAxes.push(new am4charts.CategoryAxis());
          categoryAxisY.title.text = "Estado do Evento";          
          categoryAxisY.dataFields.category = "y";
          categoryAxisY.renderer.grid.template.strokeOpacity = 0;
          categoryAxisY.renderer.minGridDistance = 10;
          categoryAxisY.renderer.labels.template.dx = -40;
          categoryAxisY.renderer.minWidth = 120;
          categoryAxisY.renderer.tooltip.dx = -40;


          let categoryAxisX = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxisX.title.text = "Data da Partida";          
          categoryAxisX.dataFields.category = "x";
          categoryAxisX.renderer.grid.template.strokeOpacity = 0;
          categoryAxisX.renderer.minGridDistance = 10;
          categoryAxisX.renderer.labels.template.dx = -40;
          categoryAxisX.renderer.minWidth = 120;
          categoryAxisX.renderer.tooltip.dx = -40;                   

          let series = chart.series.push(new am4charts.LineSeries());
          series.dataFields.categoryX = "x";
          series.dataFields.categoryY = "y";
          series.dataFields.value = "value";
          series.strokeOpacity = 0;
          series.sequencedInterpolation = true;
          series.tooltip.pointerOrientation = "vertical";

          let bullet = series.bullets.push(new am4core.Circle());
          bullet.fill = am4core.color("#ff0000");
          bullet.propertyFields.fill = "color";
          bullet.strokeOpacity = 0;
          bullet.strokeWidth = 2;
          bullet.fillOpacity = 0.5;
          bullet.stroke = am4core.color("#ffffff");
          bullet.hiddenState.properties.opacity = 0;
          bullet.tooltipText = "[bold]{title}:[/]\nPúblico: {value.value}\nData: {categoryX}\nEstado do Evento: {categoryY}";

          let outline = chart.plotContainer.createChild(am4core.Circle);
          outline.fillOpacity = 0;
          outline.strokeOpacity = 0.8;
          outline.stroke = am4core.color("#ff0000");
          outline.strokeWidth = 2;
          outline.hide(0);

          let blurFilter = new am4core.BlurFilter();
          outline.filters.push(blurFilter);

          bullet.events.on("over", function(event) {
              let target = event.target;
              outline.radius = target.pixelRadius + 2;
              outline.x = target.pixelX;
              outline.y = target.pixelY;
              outline.show();
          })

          bullet.events.on("out", function(event) {
              outline.hide();
          })

          let hoverState = bullet.states.create("hover");
          hoverState.properties.fillOpacity = 1;
          hoverState.properties.strokeOpacity = 1;

          series.heatRules.push({ target: bullet, min: 2, max: 60, property: "radius" });

          bullet.adapter.add("tooltipY", function (tooltipY, target) {
              return -target.radius;
          })

          chart.cursor = new am4charts.XYCursor();
          chart.cursor.behavior = "zoomXY";
          chart.cursor.snapToSeries = series;
          chart.data = this.chartsdata;
          console.log(this.chartsdata);
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
