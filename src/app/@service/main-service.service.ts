import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  rowId: number = 0;

  constructor(private http: HttpClient) { }

  Getdata():Observable<any> {
    let json = {
      'RowId': 0
    }
    return this.http.post(`http://68.178.166.216/api/API/BillToPartyMaster/GetData`,json);
  }

  getById(id: number):Observable<any> {
    let json = {
      'RowId': id
    }
    return this.http.post(`http://68.178.166.216/api/API/BillToPartyMaster/GetData`,json);

  }

  deleteData(id:number):Observable<any> {
    let json = {
      'RowId': id,
      'ActionId': 1,
      'ContactPersonDetails': '[]'
    }
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new HttpParams({ fromObject: json });
    return this.http.post(`http://68.178.166.216/api//API/BillToPartyMaster/SaveData`, formData, { headers });
  }

  saveData(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    // const formData = new HttpParams({ fromObject: data });
    const formData = this.convertToFormUrlEncoded(data);
    return this.http.post(`http://68.178.166.216/api//API/BillToPartyMaster/SaveData`, formData, { headers });
  }

  private convertToFormUrlEncoded(data: any): string {
    const urlSearchParams = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (typeof data[key] === 'object') {
          urlSearchParams.append(key, JSON.stringify(data[key]));
        } else {
          urlSearchParams.append(key, data[key]);
        }
      }
    }
    return urlSearchParams.toString();
  }
}
