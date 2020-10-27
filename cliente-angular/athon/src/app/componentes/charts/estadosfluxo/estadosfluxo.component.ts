import {EstadosfluxoService} from 'src/app/services//charts/estadosfluxo.service'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';


@Component({
  selector: 'app-estadosfluxo',
  templateUrl: './estadosfluxo.component.html',
  styleUrls: ['./estadosfluxo.component.css']
})

export class EstadosfluxoComponent implements OnInit{
  private chart: am4charts.XYChart;
  data: any
  chartsdata = []

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private EstadosfluxoService: EstadosfluxoService) {   }
  async ngOnInit() {this.getData()}

  
  getData(){
    // buscando os dados do serviço e trasformando em array de dicionários  
    this.EstadosfluxoService.getChart().subscribe(data => {
      this.data = data;
      this.data.forEach(values => {
        this.chartsdata.push({
          origem: values.origem,
          destino: values.destino,
          total: Number(values.total)
        });
      });    
      this.zone.runOutsideAngular(() => {      
        this.browserOnly(() => {

          //construção do gráfico
          am4core.useTheme(am4themes_animated);
          let chart = am4core.create("chartdiv-estadosfluxo", am4charts.SankeyDiagram);
          chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

          chart.data = this.chartsdata;
          let hoverState = chart.links.template.states.create("hover");
          hoverState.properties.fillOpacity = 0.6;

          chart.dataFields.fromName = "origem";
          chart.dataFields.toName = "destino";
          chart.dataFields.value = "total";

          // for right-most label to fit
          chart.paddingRight = 30;

          // make nodes draggable
          const nodeTemplate : any = chart.nodes.template;
          nodeTemplate.inert = true;
          nodeTemplate.readerTitle = "Fluxo";
          nodeTemplate.showSystemTooltip = true;
          nodeTemplate.width = 20;
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
