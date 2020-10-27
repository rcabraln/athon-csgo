import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  constructor(private http: HttpClient) { }
  public getPartidas():Observable<any> {
      let url:string = environment.api + "/partidas"
      return this.http.get<any>(url)
  }
}

