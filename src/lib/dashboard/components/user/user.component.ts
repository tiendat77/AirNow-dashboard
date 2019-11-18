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
  userForm: FormGroup;

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
      password: new FormControl({ value: '', Validators: [Validators.required] }),
      passwordConfirm: new FormControl({ value: '', Validators: [Validators.required] }),
    });


    this.userService.getData();
  }

  openSidenav() {
    this.isCreate = true;

    this.zone.run(() => {
      this.sidenav.open();
    });
  }

  closeSidenav() {

  }

  onSelect({ selected }: any) {
    console.log('select ', selected);
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      return;
    } else if (selected.length === 1) {
      const current = selected[0];

      this.isCreate = false;

      this.zone.run(() => {
        this.sidenav.open();
      });

    }
  }

  resetPassword(event, row) {
    event.preventDefault();
    event.stopPropagation();

    this.zone.run(() => {
      console.log('reset pass', row);
    });
  }

  get name() { return this.userForm.get('name') }
  get username() { return this.userForm.get('username') }
  get password() { return this.userForm.get('password') }
  get passwordConfirm() { return this.userForm.get('passwordConfirm') }

}
