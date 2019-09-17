import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { IgrackaFormaService } from 'src/app/shared/igracka-forma.service';
import { MatDialogRef } from '@angular/material';
import { NotificationsService } from 'src/app/shared/notifications.service';


@Component({
  selector: 'app-igracka-dialog',
  templateUrl: './igracka-dialog.component.html',
  styleUrls: ['./igracka-dialog.component.css']
})
export class IgrackaDialogComponent implements OnInit {
  constructor(private api: ApiService, private service: IgrackaFormaService, public dialogRef: MatDialogRef<IgrackaDialogComponent>,
              private notif: NotificationsService) { }

  ngOnInit() {
  }
  save() {
    this.api.saveIgracka(this.service.form.value).subscribe(res => {
      this.notif.succes('Uspešno sačuvana igračka');
    }, err => {
      this.notif.warn('Neuspešno sačuvana igračka');
    });
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.close();
  }
  update() {
    this.api.updateIgracka(this.service.form.value).subscribe(res => {
      this.notif.succes('Uspešno izmenjena igračka');

    }, err => {
      this.notif.warn('Neuspešno izmenjena igračka');
    });
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.close();

  }
  clear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  close() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
