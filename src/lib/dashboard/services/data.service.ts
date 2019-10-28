import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  SERVER_URL = 'http://13.59.35.198:8000/logout';
  LOCAL_URL = 'http://127.0.0.1:8000/logout';

  isMenuOpened = false;

  constructor(
    private httpClient: HttpClient
  ) { }

  toggleMenu() {
    this.isMenuOpened  = !this.isMenuOpened;
  }

  logout() {
    this.httpClient.get(this.SERVER_URL).subscribe(
      (res: any) => {
        console.log('Logout');
      });
  }
}
