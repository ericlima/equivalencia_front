import { Response } from '@angular/http';
import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { headersToString } from 'selenium-webdriver/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public aba = 1;

  constructor() {
  }

  seleciona(numAba: number) {
    this.aba = numAba;
  }


}
