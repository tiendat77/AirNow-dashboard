import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  SERVER_URL = 'http://13.59.35.198:8000/login';
  LOCAL_URL = 'http://127.0.0.1:8000/login';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'authkey',
    })
  };

  loading = false;
  error = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string) {

    this.loading = true;

    const user = {
      username,
      password
    };
    this.httpClient.post(this.LOCAL_URL, user, this.httpOptions)
    .subscribe(
      (res: any) => {
        setTimeout(() => {
          this.loading = false;
        }, 200);

        if (res.valid) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Something went wrong';
        }
      },
      (error) => {
        setTimeout(() => {
          this.loading = false;
        }, 200);

        if (error.status === 401) {
          this.error = 'Incorrect username or password';
        }
        console.error(error);
      }
    );
  }

  getError(): Observable<string> {
    return of(this.error);
  }

  getLoading(): Observable<boolean> {
    return of(this.loading);
  }

}
