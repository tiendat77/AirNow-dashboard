import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  SERVER_URL = 'http://13.59.35.198:8000/api/';

  isMenuOpened = false;

  constructor(
  ) { }

  toggleMenu() {
    this.isMenuOpened  = !this.isMenuOpened;
  }

}
