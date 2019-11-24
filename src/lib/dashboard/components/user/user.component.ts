import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatSidenav, MatSnackBar } from '@angular/material';
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
  isConfirm = false;
  userForm: FormGroup;

  constructor(
    private zone: NgZone,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
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

    this.zone.run(() => {
      this.sidenav.open();
    });
  }

  closeSidenav() {
    this.zone.run(() => {
      this.sidenav.close();
    });
  }

  onSelect({ selected }: any) {
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      return;
    } else if (selected.length === 1) {
      const current = selected[0];
      this.userForm.controls['username'].setValue(current.username);
      this.userForm.controls['email'].setValue(current.email);
      this.userForm.controls['name'].setValue(current.name);

      this.isCreate = false;
      this.isChangePassword = false;
      this.userForm.get('username').disable();

      this.zone.run(() => {
        this.sidenav.open();
      });

    }
  }

  // Create button on sidenav is clicked
  onCreateUser() {
    if (this.isNull(this.username.value) || this.isNull(this.email.value) || this.isNull(this.name.value)) {
      this.snackBar.open('Please fulfill the form!', 'OK', { duration: 3000 });
      return;
    }

    if (this.userForm.controls['email'].errors) {
      this.snackBar.open('Invalid email!', 'OK', { duration: 3000 });
      return;
    }

    const user = {
      username: this.username.value,
      email: this.email.value,
      name: this.name.value,
    };

    this.userService.createUser(user);
    this.closeSidenav();
  }

  // Reset button on the table is clicked
  onResetPassword(event, current) {
    event.preventDefault();
    event.stopPropagation();

    this.isChangePassword=true;
    this.isCreate = false;
    this.userForm.reset();
    this.userForm.controls['username'].setValue(current.username);
    this.userForm.get('username').disable();
    this.userForm.controls['password'].setValue('');
    this.userForm.controls['passwordConfirm'].setValue('');

    this.zone.run(() => {
      this.sidenav.open();
    });
  }

  // Update button on sidenav is clicked
  onUpdateUser() {
    if (this.isChangePassword) {
      if (this.isNull(this.password.value) || this.isNull(this.passwordConfirm.value)) {
        this.snackBar.open('Please fulfill the form!', 'OK', { duration: 3000 });
        return;
      }

      if (this.password.value.length < 6 || this.passwordConfirm.value.length < 6) {
        this.snackBar.open('New password is too short!', 'OK', { duration: 3000 });
        return;
      }

      if (this.password.value !== this.passwordConfirm.value) {
        this.snackBar.open('Password and confirm password does not match!', 'OK', { duration: 3000 });
        return;
      }

      const user = {
        username: this.username.value,
        password: this.password.value
      };

      this.userService.changePassword(user);
    } else {
      if (this.isNull(this.username.value) || this.isNull(this.email.value) || this.isNull(this.name.value)) {
        this.snackBar.open('Please fulfill the form!', 'OK', { duration: 3000 });
        return;
      }

      const user = {
        username: this.username.value,
        email: this.email.value,
        name: this.name.value
      };

      this.userService.updateUser(user);
    }

    this.closeSidenav();
  }

  // Confirm remove button on sidenav is clicked
  onRemoveUser() {
    const user = {
      username: this.username.value
    };
    this.userService.removeUser(user);

    this.isConfirm = false;
    this.closeSidenav();
  }

  isNull(data) {
    return data === undefined || data === null || data.length === 0;
  }

  get name() { return this.userForm.get('name') }
  get username() { return this.userForm.get('username') }
  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }
  get passwordConfirm() { return this.userForm.get('passwordConfirm') }

}
