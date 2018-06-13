import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent implements OnInit {

  public prova = {
    'titulo' : 'Prova A1: 20/05/2018 09:00',
    'disciplinas' : [
      {'nome' : 'disciplina1'},
      {'nome' : 'disciplina2'},
      {'nome' : 'disciplina3'}
    ]
  };

  constructor() { }

  ngOnInit() {
  }


}
