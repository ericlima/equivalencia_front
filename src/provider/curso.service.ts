import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlbase = environment.protocolo + '://' + environment.servidor + ':' + environment.porta + '/curso';
const urlCursos = urlbase + '/ies/{ies}/list/{pagina}';
const urlCurso = urlbase;
const urlContaPaginas = urlbase + '/contapaginas';
const urlBuscaPorNome = urlbase + '/nome/{nome}/pagina/{pagina}';

@Injectable()
export class CursoService {

  constructor(private http: Http) { }

  getServer(url) {
    return this.http.get(url)
      .map(res => res.json());
  }

  salvarCurso(curso) {

    let bodyString = JSON.stringify(curso);

    let headers = new Headers({ 'Content-Type': 'application/json' });

    let options = new RequestOptions({ headers: headers }); // Create a request option

    this.http.post(urlbase, bodyString, options) // ...using post request
      .map(res => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) //...errors if
      .subscribe();
  }

  obtemCurso(id: number) {
    return this.getServer(urlCurso.concat('/').concat(id.toString()));
  }

  obtemCursos(ies: number, pagina: number) {
    return this.getServer(
      urlCursos
        .replace('{ies}', ies.toString())
        .replace('{pagina}', pagina.toString())
    );
  }

  buscaPorNome(nome: string, pagina: number) {
    console.log(nome);
    return this.getServer(
      urlBuscaPorNome
        .replace('{nome}', nome)
        .replace('{pagina}', pagina.toString())
    );

  }

  contaPaginas() {
    return this.getServer(urlContaPaginas);
  }

}
