import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor(private http: HttpClient) {
    // this.getJSON().subscribe(data => {
    //     console.log(data);
    // });
   }

  getCountryCode(): Observable<any> {
    return this.http.get("./assets/data/countryCode.json");
  }
}
