import { environment } from './../../environments/environment';
import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlbase = environment.protocolo + '://' + environment.servidor + ':' + environment.porta + '/ies';
const urlIesCombo = urlbase + '/combo';
const urlIesLita: string = urlbase + '/ies/lista';
const urlPaginas: string = urlbase + '/ies/contapaginas';
const urlIes: string = urlbase + '/ies/';

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
    return this.getServer(urlIesLita.concat(pagina.toString()));
  }

  contaPaginas(paginas: number) {
    return this.getServer(urlPaginas);
  }


}
