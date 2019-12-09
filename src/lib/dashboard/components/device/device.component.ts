import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { DeviceService } from './device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  @ViewChild('deviceSidenav', { static: true }) sidenav: MatSidenav;

  // Sidenav
  isCreate = true;
  isConfirm = false;
  deviceForm: FormGroup;

  // Table
  rows = [
    { id: '123456', location: 'Austin' },
    { id: '123456', location: 'Dany' },
    { id: '123456',location: 'Molly' },
  ];

  constructor(
    private zone: NgZone,
    public deviceService: DeviceService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.deviceForm = this.formBuilder.group({
      id: new FormControl({ value: '', Validators: [Validators.required] }),
      location: new FormControl({ value: '', Validators: [Validators.required] }),
    });

    this.deviceService.getData();
  }

  // Open sidenav when add button clicked
  openSidenav() {
    this.isCreate = true;
    this.deviceForm.get('id').enable();
    this.deviceForm.reset();

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

      this.deviceForm.controls['id'].setValue(current.id);
      this.deviceForm.controls['location'].setValue(current.location);
      this.deviceForm.get('id').disable();

      this.isCreate = false;

      this.zone.run(() => {
        this.sidenav.open();
      });
    }
  }

  // Create button clicked
  onCreateDevice() {
    if (this.isNull(this.id.value) || this.isNull(this.location.value)) {
      this.snackBar.open('Please fulfill the form!', 'OK', { duration: 3000 });
      return;
    }

    const device = {
      id: this.id.value,
      location: this.location.value
    };
    this.deviceService.createDevice(device);
    this.closeSidenav();
  }

  // Update button clicked
  onUpdateDevice() {
    if (this.isNull(this.id.value) || this.isNull(this.location.value)) {
      this.snackBar.open('Please fulfill the form!', 'OK', { duration: 3000 });
      return;
    }

    const device = {
      id: this.id.value,
      location: this.location.value
    };
    this.deviceService.updateDevice(device);
    this.closeSidenav();
  }

  // Confirm button clicked
  onRemoveDevice() {
    const device = {
      id: this.id.value
    };
    this.deviceService.removeDevice(device);

    this.isConfirm = false;
    this.closeSidenav();
  }



  isNull(data) {
    return data === undefined || data === null || data.length === 0;
  }

  get id() { return this.deviceForm.get('id') }
  get location() { return this.deviceForm.get('location') }

}
