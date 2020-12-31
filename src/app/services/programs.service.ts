import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  constructor(
    private httpClient : HttpClient,
  ) { }

  getAllPrograms(params) {
    let httpParams = new HttpParams();
    httpParams = params;
    let url = "https://api.spacexdata.com/v3/launches";
    return this.httpClient.get<any>(url,{params: httpParams});
  }

}
