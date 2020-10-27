import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ArenasService {
  constructor(private http: HttpClient) { }
  public getArenas():Observable<any> {
      let url:string = environment.api + "/arenas"
      return this.http.get<any>(url)
  }
}

