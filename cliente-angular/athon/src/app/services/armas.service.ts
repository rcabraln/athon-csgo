import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ArmasService {
  constructor(private http: HttpClient) { }
  public getArmas():Observable<any> {
      let url:string = environment.api + "/armas/lista/mortes"
      return this.http.get<any>(url)
  }
}
