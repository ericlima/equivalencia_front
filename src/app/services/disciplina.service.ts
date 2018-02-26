import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlbase = environment.protocolo + '://' + environment.servidor + ':' + environment.porta + '/disciplina';
const urlDisciplinas = urlbase + '/ies/{ies}/list/{pagina}';
const urlDisciplina = urlbase;
const urlContaPaginas = urlbase + '/contapaginas';
const urlBuscaPorNome = urlbase + '/nome/{nome}/pagina/{pagina}';

@Injectable()
export class DisciplinaService {

  constructor(private http: Http) { }

  getServer(url) {
    return this.http.get(url)
      .map(res => res.json());
  }

  obtemDisciplina(id: number) {
    return this.getServer(urlDisciplina.concat(id.toString()));
  }

  obtemDisciplinas(ies: number, pagina: number) {
    return this.getServer(
      urlDisciplinas
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
