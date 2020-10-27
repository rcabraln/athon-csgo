import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class EstadosfluxoService {
  constructor(private http: HttpClient) { }
  public getChart():Observable<any> {
      let url:string = environment.api + "/chats/estados/fluxo"
      return this.http.get(url)
  }
}
