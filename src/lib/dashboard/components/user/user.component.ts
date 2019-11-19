import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('userSidenav', { static: true }) sidenav: MatSidenav;

  // Sidenav
  isCreate = true;
  isChangePassword = false;
  userForm: FormGroup;

  nameModel = '';
  usrNameModel = '';
  emailModel = '';
  pwdModel = '';
  pwdConfirmModel = '';

  // Table
  rows = [
    { id: '1', name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { id: '2', name: 'Dany', gender: 'Male', company: 'KFC' },
    { id: '3',name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];

  constructor(
    private zone: NgZone,
    public userService: UserService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userForm = this._formBuilder.group({
      name: new FormControl({ value: '', Validators: [Validators.required] }),
      username: new FormControl({ value: '', Validators: [Validators.required] }),
      email: new FormControl({ value: '', Validators: [Validators.required, Validators.email] }),
      password: new FormControl({ value: '', Validators: [Validators.required] }),
      passwordConfirm: new FormControl({ value: '', Validators: [Validators.required] }),
    });


    this.userService.getData();
  }

  openSidenav() {
    this.isCreate = true;
    this.isChangePassword = false;
    this.userForm.get('username').enable();
    this.userForm.reset();
    this.resetModel();

    this.zone.run(() => {
      this.sidenav.open();
    });
  }

  closeSidenav() {
    this.zone.run(() => {
      this.sidenav.close();
    });
  }

  resetModel() {
    this.nameModel = '';
    this.usrNameModel = '';
    this.emailModel= '';
    this.pwdModel = '';
    this.pwdConfirmModel = '';
  }

  onSelect({ selected }: any) {
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      return;
    } else if (selected.length === 1) {
      const current = selected[0];
      console.log('select ', current);
      this.nameModel = current.name;
      this.emailModel = current.email;
      this.usrNameModel = current.username;

      this.isCreate = false;
      this.isChangePassword = false;
      this.userForm.get('username').enable();

      this.zone.run(() => {
        this.sidenav.open();
      });

    }
  }

  createUser() {

    this.closeSidenav();
  }

  updateUser() {
    if (this.isChangePassword) {
      console.log('change passworde', this.usrNameModel);
    } else {
      console.log('update user', this.usrNameModel);
    }

    this.closeSidenav();
  }

  resetPassword(event, row) {
    event.preventDefault();
    event.stopPropagation();

    this.isChangePassword=true;
    this.userForm.get('username').disable();

    this.zone.run(() => {
      this.sidenav.open();
      console.log('reset pass', row);
    });
  }

  get name() { return this.userForm.get('name') }
  get username() { return this.userForm.get('username') }
  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }
  get passwordConfirm() { return this.userForm.get('passwordConfirm') }

}
