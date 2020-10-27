import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ArenaslatlngService} from 'src/app/services//charts/arenaslatlng.service';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-arenaslatlng',
  templateUrl: './arenaslatlng.component.html',
  styleUrls: ['./arenaslatlng.component.css']
})

export class ArenaslatlngComponent implements OnInit{
  private chart: am4maps.MapChart;
  data: any
  chartsdata = []

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private ArenaslatlngService: ArenaslatlngService) {   }
  async ngOnInit() {this.getData()}

  
  getData(){
    // buscando os dados do serviço e trasformando em array de dicionários  
    this.ArenaslatlngService.getChart().subscribe(data => {
      this.data = data;
      let colorSet = new am4core.ColorSet();
      this.data.forEach(values => {
        this.chartsdata.push({
          title: values.nome,
          latitude: Number(values.lat),
          longitude: Number(values.lng)
        });
      });    
      this.zone.runOutsideAngular(() => {      
        this.browserOnly(() => {               

          am4core.useTheme(am4themes_animated);

          let targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";          
          this.chart = am4core.create("chartdiv-arenaslatlng", am4maps.MapChart);          
          this.chart.geodata = am4geodata_worldLow;
          this.chart.projection = new am4maps.projections.Miller();          

          let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
          polygonSeries.exclude = ["AQ"];
          polygonSeries.useGeodata = true;

          let polygonTemplate = polygonSeries.mapPolygons.template;
          polygonTemplate.strokeOpacity = 0.5;
          polygonTemplate.nonScalingStroke = true;
          let imageSeries = this.chart.series.push(new am4maps.MapImageSeries());

          let imageSeriesTemplate = imageSeries.mapImages.template;
          let circle = imageSeriesTemplate.createChild(am4core.Sprite);
          circle.scale = 0.4;
          circle.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
          circle.path = targetSVG;

          imageSeriesTemplate.propertyFields.latitude = "latitude";
          imageSeriesTemplate.propertyFields.longitude = "longitude";

          imageSeriesTemplate.horizontalCenter = "middle";
          imageSeriesTemplate.verticalCenter = "middle";
          imageSeriesTemplate.align = "center";
          imageSeriesTemplate.valign = "middle";
          imageSeriesTemplate.width = 8;
          imageSeriesTemplate.height = 8;
          imageSeriesTemplate.nonScaling = true;
          imageSeriesTemplate.tooltipText = "{title}";
          imageSeriesTemplate.fill = am4core.color("#000");
          imageSeriesTemplate.background.fillOpacity = 0;
          imageSeriesTemplate.background.fill = am4core.color("#ffffff");
          imageSeriesTemplate.setStateOnChildren = true;
          imageSeriesTemplate.states.create("hover");

          imageSeries.data = this.chartsdata
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
