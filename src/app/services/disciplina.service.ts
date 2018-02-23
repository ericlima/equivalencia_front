import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

const urlbase = environment.protocolo + '://' + environment.servidor + ':' + environment.porta + '/disciplina';
const urlDisciplinas = urlbase + '/list';
const urlDisciplina = urlbase;
const urlContaPaginas = urlbase + '/contapaginas'

@Injectable()
export class DisciplinaService {

  constructor(private http: Http) { }

  getServer(url) {
    return this.http.get(url)
      .map(res => res.json());
  }

  obtemDisciplina(id:number) {
    return this.getServer(urlDisciplina.concat(id.toString()));
  }

  obtemDisciplinas(pagina:number) {
    return this.getServer(urlDisciplinas.concat(pagina.toString()));
  }

  contaPaginas() {
    return this.getServer(urlContaPaginas);
  }

}
