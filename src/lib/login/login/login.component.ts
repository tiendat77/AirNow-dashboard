import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ngxLoadingAnimationTypes } from 'ngx-loading';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // ngx-loading
  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  config =
  {
    animationType: ngxLoadingAnimationTypes.chasingDots,
    primaryColour: '#dd0031',
    secondaryColour: '#1a73e8',
    tertiaryColour: '#dd0031',
    backdropBorderRadius: '3px'
  };

  SigninForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public loginService: LoginService,
    private router: Router,
    ) { }

  ngOnInit() {
    if (this.loginService.isLogged()) {
      console.log('dashboar')
      this.router.navigate(['/dashboard']);
    } else {
      console.log('login')
      this.router.navigate(['/login']);
    }

    this.SigninForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.required]
    });
  }

  validate() {
    this.loginService.error = '';

    if (this.SigninForm.controls.username.errors && (this.username.dirty || this.username.touched)) {

      if (this.username.errors.required) {

        this.loginService.error = 'Username is required';

      } else if (this.username.errors.minlength) {

        this.loginService.error = 'Username must at least 6 character';

      }

      return true;

    } else {

      this.loginService.error = '';

      return false;

    }
  }

  submit() {
    const username = this.SigninForm.get('username').value;
    const password = this.SigninForm.get('password').value;
    this.loginService.login(username, password);
    this.password.setValue('');
  }

  get username() { return this.SigninForm.get('username'); }
  get password() { return this.SigninForm.get('password'); }

}
