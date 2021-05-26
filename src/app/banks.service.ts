import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BanksService {

  baseURL: string = "https://vast-shore-74260.herokuapp.com/banks?city="
  constructor(private http: HttpClient) { }

  getBanks(city: string):Observable<any>{
    return this.http.get(this.baseURL + city)
  }
}
