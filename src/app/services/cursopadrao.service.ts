import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlbase = environment.protocolo + '://' + environment.servidor + ':' + environment.porta + '/cursopadrao';
const urlBuscaPorNome = urlbase + '/buscapornome/{nome}/pagina/{pagina}';

@Injectable()
export class CursopadraoService {

  constructor(private http: Http) { }

  getServer(url) {
    return this.http.get(url)
      .map(res => res.json());
  }

  salvarCurso(curso) {

    const bodyString = JSON.stringify(curso);

    const headers = new Headers({ 'Content-Type': 'application/json' });

    const options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(urlbase, bodyString, options) // ...using post request
      .map(res => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')) //...errors if
      .subscribe();
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
