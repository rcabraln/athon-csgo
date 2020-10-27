import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LinhadotempovencedorService} from 'src/app/services//charts/linhadotempovencedor.service';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import * as am4plugins_bullets from "@amcharts/amcharts4/plugins/bullets";

@Component({
  selector: 'app-linhadotempovencedor',
  templateUrl: './linhadotempovencedor.component.html',
  styleUrls: ['./linhadotempovencedor.component.css']
})

export class LinhadotempovencedorComponent implements OnInit{
  private chart: am4charts.XYChart;
  private colorSet = new am4core.ColorSet();
  data: any
  chartsdata = []

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private LinhadotempovencedorService: LinhadotempovencedorService) {   }
  async ngOnInit() {this.getData()}

  
  getData(){
    // buscando os dados do serviço e trasformando em array de dicionários  
    this.LinhadotempovencedorService.getChart().subscribe(data => {
      this.data = data;
      this.data.forEach(values => {
        this.chartsdata.push({
          category: "",
          start: values.inicio,
          end: values.fim,
          text: values.texto,
          icon: values.icone,          
          textDisabled: true,
          color: this.colorSet.getIndex(9)
        });
      });    
      this.zone.runOutsideAngular(() => {      
        this.browserOnly(() => {

          //construção do gráfico
          am4core.useTheme(am4themes_animated);
          // Themes end
          
          let chart = am4core.create("chartdiv-linhadotempovencedor", am4plugins_timeline.SerpentineChart);
          chart.curveContainer.padding(100, 20, 50, 20);
          chart.levelCount = 3;
          chart.yAxisRadius = am4core.percent(20);
          chart.yAxisInnerRadius = am4core.percent(2);
          chart.maskBullets = false;     
          
          chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm";
          chart.dateFormatter.dateFormat = "HH";
          console.log(this.chartsdata);
          chart.data = this.chartsdata
          
          chart.fontSize = 10;
          chart.tooltipContainer.fontSize = 10;
          
          let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis<any>());
          categoryAxis.dataFields.category = "category";
          categoryAxis.renderer.grid.template.disabled = true;
          categoryAxis.renderer.labels.template.paddingRight = 25;
          categoryAxis.renderer.minGridDistance = 10;
          
          let dateAxis = chart.xAxes.push(new am4charts.DateAxis<any>());
          dateAxis.renderer.minGridDistance = 70;
          dateAxis.baseInterval = { count: 1, timeUnit: "day" };
          dateAxis.renderer.tooltipLocation = 0;
          dateAxis.renderer.line.strokeDasharray = "1,4";
          dateAxis.renderer.line.strokeOpacity = 0.5;
          dateAxis.tooltip.background.fillOpacity = 0.2;
          dateAxis.tooltip.background.cornerRadius = 5;
          dateAxis.tooltip.label.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
          dateAxis.tooltip.label.paddingTop = 7;
          dateAxis.endLocation = 0;
          dateAxis.startLocation = -0.5;
          
          let labelTemplate = dateAxis.renderer.labels.template;
          labelTemplate.verticalCenter = "middle";
          labelTemplate.fillOpacity = 0.4;
          labelTemplate.background.fill = new am4core.InterfaceColorSet().getFor("background");
          labelTemplate.background.fillOpacity = 1;
          labelTemplate.padding(7, 7, 7, 7);
          
          let series = chart.series.push(new am4plugins_timeline.CurveColumnSeries());
          series.columns.template.height = am4core.percent(15);
          
          series.dataFields.openDateX = "start";
          series.dataFields.dateX = "end";
          series.dataFields.categoryY = "category";
          series.baseAxis = categoryAxis;
          series.columns.template.propertyFields.fill = "color"; // get color from data
          series.columns.template.propertyFields.stroke = "color";
          series.columns.template.strokeOpacity = 0;
          series.columns.template.fillOpacity = 0.6;
          
          let imageBullet1 = series.bullets.push(new am4plugins_bullets.PinBullet());
          imageBullet1.locationX = 1;
          imageBullet1.propertyFields.stroke = "color";
          imageBullet1.background.propertyFields.fill = "color";
          imageBullet1.image = new am4core.Image();
          imageBullet1.image.propertyFields.href = "icon";
          imageBullet1.image.scale = 0.5;
          imageBullet1.circle.radius = am4core.percent(100);
          imageBullet1.dy = -5;
          
          
          let textBullet = series.bullets.push(new am4charts.LabelBullet());
          textBullet.label.propertyFields.text = "text";
          textBullet.disabled = true;
          textBullet.propertyFields.disabled = "textDisabled";
          textBullet.label.strokeOpacity = 0;
          textBullet.locationX = 1;
          textBullet.dy = - 100;
          textBullet.label.textAlign = "middle";        

          
          let cursor = new am4plugins_timeline.CurveCursor();
          chart.cursor = cursor;
          cursor.xAxis = dateAxis;
          cursor.yAxis = categoryAxis;
          cursor.lineY.disabled = true;
          cursor.lineX.strokeDasharray = "1,4";
          cursor.lineX.strokeOpacity = 1;
          
          dateAxis.renderer.tooltipLocation2 = 0;
          categoryAxis.cursorTooltipEnabled = false;
          
          
          let label = chart.createChild(am4core.Label);
          label.text = "Caminho do Campeonato: Estados por onde passou até a Final"
          label.isMeasured = false;
          label.y = am4core.percent(40);
          label.x = am4core.percent(50);
          label.horizontalCenter = "middle";
          label.fontSize = 20;
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
