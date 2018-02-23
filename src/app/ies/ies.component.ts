import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NgModel,ReactiveFormsModule } from '@angular/forms';

import { IesService } from '../services/ies.service';

@Component({
  selector: 'app-ies',
  templateUrl: './ies.component.html',
  styleUrls: ['./ies.component.css']
})
export class IesComponent implements OnInit {

  ies = {};
  listaIes: any[] = [];
  

  constructor() { }

  ngOnInit() {
  }

}
