import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartidasComponent } from './componentes/partidas/partidas.component';
import { PartidaComponent } from './componentes/partidas/partida/partida.component';
import { DiagramaComponent } from './componentes/diagrama/diagrama.component';
import { AnalisesComponent } from './componentes/analises/analises.component';

const routes: Routes = [  
  {path: 'partidas', component: PartidasComponent},
  {path: 'partida', component: PartidaComponent},
  {path: 'diagrama', component: DiagramaComponent},
  {path: 'analises', component: AnalisesComponent},
  {path: '', redirectTo: 'partidas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
