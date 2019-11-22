import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  SERVER_URL = environment.LoginAPI;

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
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  login(username: string, password: string) {

    this.loading = true;

    const user = {
      username,
      password
    };
    this.httpClient.post(this.SERVER_URL + 'login', user, this.httpOptions)
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

  logout() {
    this.httpClient.get(this.SERVER_URL + 'logout', this.httpOptions).subscribe(
      (res: any) => {
        if (res.logout) {
          this.router.navigate(['/login']);
        } else {
          this.snackbar.open('Something went wrong! Please try again', 'OK', { duration: 2000 });
        }
      },
      (error) => {
        console.error(error);
        this.snackbar.open('Something went wrong! Please try again', 'OK', { duration: 2000 });
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
