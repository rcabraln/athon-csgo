import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campeao }  from 'src/app/models/api-node.model';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogadoresService {
  constructor(private http: HttpClient) { }
  public getJogadores(times:boolean):Observable<any> {
      if(times){        
        let url:string = environment.api + "/jogadores/lista/times"
        return this.http.get<Campeao>(url)
      }
      else{
        let url:string = environment.api + "/jogadores/lista/pontos"  
        return this.http.get<Campeao>(url)      
      }    
      
  }
}

