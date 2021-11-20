import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUlr = environment.apiUlr;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinePage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {

    query = apiUlr + query

    return this.http.get<T>( query, { headers } );
  }

  getTopHeadlines() {
    this.headLinePage++;

    return this.ejecutarQuery<RespuestaTopHeadlines>(
      `/top-headlines?country=us&page=${this.headLinePage}`
      );
    // return this.http.get<RespuestaTopHeadlines>(
    //   `${apiUlr}/top-headlines?country=us&apiKey=${apiKey}`)
  }

  getTopHeadLinesCategoria( categoria: string ) {

    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(
      `/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);

    // return this.http.get(
    //   `${apiUlr}/top-headlines?country=us&category=${categoria}&apiKey=${apiKey}`)
  }

}
