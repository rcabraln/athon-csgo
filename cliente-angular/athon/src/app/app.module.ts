import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { PartidasComponent } from './componentes/partidas/partidas.component';
import { PartidaComponent } from './componentes/partidas/partida/partida.component';
import { AnalisesComponent } from './componentes/analises/analises.component';
import { DiagramaComponent } from './componentes/diagrama/diagrama.component';
import { AudienciadataComponent } from './componentes/charts/audienciadata/audienciadata.component';
import { ArenaslatlngComponent } from './componentes/charts/arenaslatlng/arenaslatlng.component';
import { EstadosfluxoComponent } from './componentes/charts/estadosfluxo/estadosfluxo.component';
import { EstadospartidasComponent } from './componentes/charts/estadospartidas/estadospartidas.component';
import { JogadoresprimeirakillComponent } from './componentes/charts/jogadoresprimeirakill/jogadoresprimeirakill.component';
import { KillarmasComponent } from './componentes/charts/killarmas/killarmas.component';
import { KilltimesComponent } from './componentes/charts/killtimes/killtimes.component';
import { LinhadotempovencedorComponent } from './componentes/charts/linhadotempovencedor/linhadotempovencedor.component';
import { MediakilljogadoresComponent } from './componentes/charts/mediakilljogadores/mediakilljogadores.component';
import { RegioespublicoComponent } from './componentes/charts/regioespublico/regioespublico.component';
import { TimesmaximosminimosComponent } from './componentes/charts/timesmaximosminimos/timesmaximosminimos.component';
import { TimesprimeirakillComponent } from './componentes/charts/timesprimeirakill/timesprimeirakill.component';
import { TimesvitoriasComponent } from './componentes/charts/timesvitorias/timesvitorias.component';
import { VitoriaprimeirakillComponent } from './componentes/charts/vitoriaprimeirakill/vitoriaprimeirakill.component';




@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,    
    PartidasComponent, 
    PartidaComponent,
    AnalisesComponent, 
    DiagramaComponent, 
    AudienciadataComponent, 
    ArenaslatlngComponent, 
    EstadosfluxoComponent, 
    EstadospartidasComponent, 
    JogadoresprimeirakillComponent, 
    KillarmasComponent, 
    KilltimesComponent, 
    LinhadotempovencedorComponent, 
    MediakilljogadoresComponent, 
    RegioespublicoComponent, 
    TimesmaximosminimosComponent, 
    TimesprimeirakillComponent, 
    TimesvitoriasComponent, 
    VitoriaprimeirakillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
