import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TimesService {
  constructor(private http: HttpClient) { }
  public getTimes():Observable<any> {
      let url:string = environment.api + "/times"
      return this.http.get<any>(url)
  }
}
