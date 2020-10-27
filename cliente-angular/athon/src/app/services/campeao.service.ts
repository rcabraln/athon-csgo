import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CampeaoService {
  constructor(private http: HttpClient) { }
  public getCampeao():Observable<any> {
    let url:string = environment.api + "/times/campeao"
    return this.http.get<any>(url)
  }
}

