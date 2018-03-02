import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlbase = environment.protocolo + '://' + environment.servidor + ':' + environment.porta + '/disciplina';
const urlDisciplinas = urlbase + '/ies/{ies}/list/{pagina}';
const urlDisciplina = urlbase;
const urlContaPaginas = urlbase + '/contapaginas';
const urlBuscaPorNome = urlbase + '/nome/{nome}/pagina/{pagina}';
const urlAssocia = urlbase + '/autoassociacao/{id}';
const urlDesassocia = urlbase + '/desassocia/{id}';

@Injectable()
export class DisciplinaService {

  constructor(private http: Http) { }

  getServer(url) {
    return this.http.get(url)
      .map(res => res.json());
  }

  salvarDisciplina(disciplina) {

    const headers      = new Headers({ 'Content-Type': 'application/json' });

    const options       = new RequestOptions({ headers: headers });

    this.http.post(urlbase, JSON.stringify(disciplina), options)
                     .map(res => res.json())
                     .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
                     .subscribe();
  }

  obtemDisciplina(id: number) {
    return this.getServer(urlDisciplina.concat('/').concat(id.toString()));
  }

  obtemDisciplinas(ies: number, pagina: number) {
    return this.getServer(
      urlDisciplinas
      .replace('{ies}', ies.toString())
      .replace('{pagina}', pagina.toString())
    );
  }

  buscaPorNome(nome: string, pagina: number) {
    return this.getServer(
      urlBuscaPorNome
      .replace('{nome}', nome)
      .replace('{pagina}', pagina.toString())
    );

  }

  associa(id: number) {
    return this.getServer(urlAssocia.replace('{id}', id.toString()));
  }

  desassocia(id: number) {
    return this.getServer(urlDesassocia.replace('{id}', id.toString()));
  }

  contaPaginas() {
    return this.getServer(urlContaPaginas);
  }

}
