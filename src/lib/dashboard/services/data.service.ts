import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isMenuOpened = false;

  constructor() { }

  toggleMenu() {
    this.isMenuOpened  = !this.isMenuOpened;
  }
}
