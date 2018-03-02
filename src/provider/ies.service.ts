import { environment } from '../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlbase = environment.protocolo + '://' + environment.servidor + ':' + environment.porta + '/ies';
const urlIesCombo = urlbase + '/combo/';
const urlIesLista: string = urlbase + '/list/';
const urlPaginas: string = urlbase + '/contapaginas';
const urlIes: string = urlbase;
const urlBuscaPorNome = urlbase + '/nome/{nome}/pagina/{pagina}';

@Injectable()
export class IesService {

  constructor(private http: Http) { }

  getServer(url) {
    return this.http.get(url)
      .map(res => res.json());
  }

  obterIesCombo() {
    return this.getServer(urlIesCombo);
  }

  obtemIes(id: number) {
    return this.getServer(urlIes.concat(id.toString()));
  }

  obtemListaIes(pagina: number) {
    return this.getServer(urlIesLista.concat(pagina.toString()));
  }

  contaPaginas() {
    return this.getServer(urlPaginas);
  }

  buscaPorNome(nome: string, pagina: number) {
    console.log(nome);
    return this.getServer(
      urlBuscaPorNome
      .replace('{nome}', nome)
      .replace('{pagina}', pagina.toString())
    );

  }

}
