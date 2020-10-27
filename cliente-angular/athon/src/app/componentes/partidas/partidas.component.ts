import { Component, OnInit, Output } from '@angular/core';
import { PartidasService} from 'src/app/services/partidas.service';
import { CampeaoService} from 'src/app/services/campeao.service';
import { JogadoresService} from 'src/app/services/jogadores.service';
import { ArmasService} from 'src/app/services/armas.service';
import { TimesService} from 'src/app/services/times.service';
import { ArenasService} from 'src/app/services/Arenas.service';
import { Campeao}  from 'src/app/models/api-node.model';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-partidas',
  templateUrl: './partidas.component.html',
  styleUrls: ['./partidas.component.css']
})

export class PartidasComponent implements OnInit { 
  @Output() partida_id: string

  campeao: Campeao;

  erro: any;  

  partidas: Array<any>
  jogadores: Array<any>  
  armas: Array<any>
  times: Array<any>
  arenas: Array<any>

  partidasRecords: string
  partidasPage: number=1
  partidasPerPage: number=10

  jogadoresRecords: string
  jogadoresPage: number=1
  jogadoresPerPage: number=20
  jogadoresPorTime: true

  armasRecords: string
  armasPage: number=1
  armasPerPage: number=20

  timesRecords: string
  timesPage: number=1
  timesPerPage: number=20

  arenasRecords: string
  arenasPage: number=1
  arenasPerPage: number=20  
    
  constructor(private PartidasService: PartidasService, 
    private CampeaoService: CampeaoService,
    private JogadoresService: JogadoresService,
    private ArmasService: ArmasService,
    private TimesService: TimesService,
    private ArenasService: ArenasService
    ) { 
    this.getCampeao();
    this.getPartidas();    
    this.getJogadores();
    this.getArmas();
    this.getTimes();
    this.getArenas();
  }
    
  ngOnInit(): void {
  }

  getPartidas(){
    this.PartidasService.getPartidas().subscribe(
      (data) =>{
        this.partidas = data
        this.partidasRecords = data.length
    }, (error: any) =>{
        this.erro = error;
    });

  }
  
  getCampeao(){
    this.CampeaoService.getCampeao().subscribe(
      (data) =>{
        this.campeao = data[0]
    }, (error: any) =>{
        this.erro = error;
    });
  }

  getJogadores(){
    this.JogadoresService.getJogadores(this.jogadoresPorTime).subscribe(
      (data) =>{
        this.jogadores = data
    }, (error: any) =>{
        this.erro = error;
    });    

  }

  getArmas(){
    this.ArmasService.getArmas().subscribe(
      (data) =>{
        this.armas = data
        this.armasRecords = data.length
    }, (error: any) =>{
        this.erro = error;
    });
  }  

  getTimes(){
    this.TimesService.getTimes().subscribe(
      (data) =>{
        this.times = data
        this.timesRecords = data.length
    }, (error: any) =>{
        this.erro = error;
    });
  }    

  getArenas(){
    this.ArenasService.getArenas().subscribe(
      (data) =>{
        this.arenas = data
        this.arenasRecords = data.length
    }, (error: any) =>{
        this.erro = error;
    });
  }    

}
