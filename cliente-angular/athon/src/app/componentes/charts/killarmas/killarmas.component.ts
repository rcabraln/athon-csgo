import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { KillarmasService} from 'src/app/services//charts/killarmas.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-killarmas',
  templateUrl: './killarmas.component.html',
  styleUrls: ['./killarmas.component.css']
})

export class KillarmasComponent implements OnInit{
  private chart: am4charts.XYChart;
  data: any
  chartsdata = []

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private KillarmasService: KillarmasService) {   }
  async ngOnInit() {this.getData()}

  
  getData(){
    // buscando os dados do serviço e trasformando em array de dicionários  
    this.KillarmasService.getChart().subscribe(data => {
      this.data = data;
      this.data.forEach(values => {
        this.chartsdata.push({
          nome: values.nome,
          kills: Number(values.kills),
          href: values.logo
        });
      });    
      this.zone.runOutsideAngular(() => {      
        this.browserOnly(() => {

          //construção do gráfico
          am4core.useTheme(am4themes_animated);                
          let chart = am4core.create("chartdiv-killarmas", am4charts.XYChart);
          chart.padding(40, 40, 40, 40);               
          chart.data = this.chartsdata;

          let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "nome";
          categoryAxis.renderer.grid.template.strokeOpacity = 0;
          categoryAxis.renderer.minGridDistance = 10;
          categoryAxis.renderer.labels.template.dx = -40;
          categoryAxis.renderer.minWidth = 120;
          categoryAxis.renderer.tooltip.dx = -40;
          
          let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.inside = true;
          valueAxis.renderer.labels.template.fillOpacity = 0.3;
          valueAxis.renderer.grid.template.strokeOpacity = 0;
          valueAxis.min = 0;
          valueAxis.cursorTooltipEnabled = false;
          valueAxis.renderer.baseGrid.strokeOpacity = 0;
          valueAxis.renderer.labels.template.dy = 20;
          
          let series = chart.series.push(new am4charts.ColumnSeries);
          series.dataFields.valueX = "kills";
          series.dataFields.categoryY = "nome";
          series.tooltipText = "{valueX.value}";
          series.tooltip.pointerOrientation = "vertical";
          series.tooltip.dy = - 30;
          series.columnsContainer.zIndex = 100;
          
          let columnTemplate = series.columns.template;
          columnTemplate.height = am4core.percent(50);
          columnTemplate.maxHeight = 50;
          columnTemplate.column.cornerRadius(60, 10, 60, 10);
          columnTemplate.strokeOpacity = 0;
          
          series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueX", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
          series.mainContainer.mask = undefined;
          
          let cursor = new am4charts.XYCursor();
          chart.cursor = cursor;
          cursor.lineX.disabled = true;
          cursor.lineY.disabled = true;
          cursor.behavior = "none";
          
          let bullet = columnTemplate.createChild(am4charts.CircleBullet);
          bullet.circle.radius = 30;
          bullet.valign = "middle";
          bullet.align = "left";
          bullet.isMeasured = true;
          bullet.interactionsEnabled = false;
          bullet.horizontalCenter = "right";
          bullet.interactionsEnabled = false;
          
          let hoverState = bullet.states.create("hover");
          let outlineCircle = bullet.createChild(am4core.Circle);
          outlineCircle.adapter.add("radius", function (radius, target) {
            const circleBullet : any = target.parent;
              return circleBullet.circle.pixelRadius + 10;
          })
          
          let image = bullet.createChild(am4core.Image);
          image.width = 60;
          image.height = 60;
          image.horizontalCenter = "middle";
          image.verticalCenter = "middle";
          image.propertyFields.href = "href";
          
          image.adapter.add("mask", function (mask, target) {
              const circleBullet : any = target.parent;
              return circleBullet.circle;
          })
          
          let previousBullet;
          chart.cursor.events.on("cursorpositionchanged", function (event) {
              const dataItem : any = series.tooltipDataItem;
              if (dataItem.column) {
                  let bullet = dataItem.column.children.getIndex(1);
          
                  if (previousBullet && previousBullet != bullet) {
                      previousBullet.isHover = false;
                  }
          
                  if (previousBullet != bullet) {
          
                      let hs = bullet.states.getKey("hover");
                      hs.properties.dx = dataItem.column.pixelWidth;
                      bullet.isHover = true;
          
                      previousBullet = bullet;
                  }
              }
          })
            
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



