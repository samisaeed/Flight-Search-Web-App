import {Inject, Injectable, Optional} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected readonly _baseUrl = `${environment.baseUrl}${this.customUrl}`;
  public query: string;
  constructor(protected http: HttpClient, @Inject('customUrl') @Optional() protected customUrl: string) {
  }


  getAll(urlParameters?): Observable<any> {
    return this.http.get(`${this._baseUrl}`, {params: urlParameters ? urlParameters : null});
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this._baseUrl}/${id}`);
  }

  create(resource: any): Observable<any> {
    return this.http.post(`${this._baseUrl}`, resource);
  }

  update(resource: any): Observable<any> {
    return this.http.put(`${this._baseUrl}/${resource.id}`, resource);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this._baseUrl}/${id}`);
  }

}
