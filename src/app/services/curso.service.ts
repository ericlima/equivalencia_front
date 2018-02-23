import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlbase = environment.protocolo + '://' + environment.servidor + ':' + environment.porta + '/curso';
const urlcursoCombo = urlbase + '/combo';
const urlcursoLista: string = urlbase + "/list/";
const urlPaginas: string = urlbase + "/contapaginas";
const urlCurso: string = urlbase + "/";

@Injectable()
export class CursoService {

  constructor(private http: Http) { }

  getServer(url) {
    return this.http.get(url)
      .map(res => res.json());
  }

  obterCursoCombo() {
    return this.getServer(urlcursoCombo);
  }

  obtemCurso(id:number) {
    return this.getServer(urlCurso.concat(id.toString()));
  }

  obtemListaCurso(pagina:number) {
    return this.getServer(urlcursoLista.concat(pagina.toString()));
  }

  contaPaginas(paginas:number) {
    return this.getServer(urlPaginas);
  }
}
