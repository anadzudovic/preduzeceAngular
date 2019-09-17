import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IgrackaDto } from '../model/igracka';
import { KatalogDto } from '../model/katalog';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private GET_ALL_IGRACKA_URL = 'http://localhost:9000/igracka/get/all';
  private GET_BY_ID_IGRACKA_URL = 'http://localhost:9000/igracka/get/';
  private DELETE_IGRACKA_URL = 'http://localhost:9000/igracka/delete/';
  private SAVE_IGRACKA_URL = 'http://localhost:9000/igracka/save';
  private UPDATE_IGRACKA_URL = 'http://localhost:9000/igracka/update';
  private GET_ALL_KATALOG_URL = 'http://localhost:9000/katalog/get/all';
  private GET_BY_ID_KATALOG_URL = 'http://localhost:9000/katalog/get/';
  private DELETE_KATALOG_URL = 'http://localhost:9000/katalog/delete/';
  private SAVE_KATALOG_URL = 'http://localhost:9000/katalog/save';
  private UPDATE_KATALOG_URL = 'http://localhost:9000/katalog/update/';
  getAllIgracka(): Observable<IgrackaDto[]> {
    return this.http.get<IgrackaDto[]>(this.GET_ALL_IGRACKA_URL);
  }
  getIgracka(id: string): Observable<any> {
    return this.http.get(this.GET_BY_ID_IGRACKA_URL + id);
  }
  deleteIgracka(id: string): Observable<any> {
    return this.http.delete(this.DELETE_IGRACKA_URL + id);
  }
  saveIgracka(igracka: IgrackaDto): Observable<IgrackaDto> {
    return this.http.post<IgrackaDto>(this.SAVE_IGRACKA_URL, igracka);
  }
  updateIgracka(igracka: IgrackaDto): Observable<IgrackaDto> {
    return this.http.put<IgrackaDto>(this.UPDATE_IGRACKA_URL, igracka);
  }

  getAllKatalog(): Observable<KatalogDto[]> {
    return this.http.get<KatalogDto[]>(this.GET_ALL_KATALOG_URL);
  }
  getKatalog(id: string): Observable<any> {
    return this.http.get(this.GET_BY_ID_KATALOG_URL + id);
  }
  deleteKatalog(id: string): Observable<any> {
    return this.http.delete(this.DELETE_KATALOG_URL + id);
  }
  saveKatalog(katalog: KatalogDto): Observable<KatalogDto> {
    return this.http.post<KatalogDto>(this.SAVE_KATALOG_URL, katalog);
  }
  updateKatalog(katalog: KatalogDto, id: string): Observable<KatalogDto> {
    return this.http.put<KatalogDto>(this.UPDATE_KATALOG_URL + id, katalog);
  }

}
