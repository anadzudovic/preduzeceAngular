import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { KatalogFormaService } from 'src/app/shared/katalog-forma.service';
import { MatDialogRef } from '@angular/material';
import { StavkaKatalogaDto } from 'src/app/model/stavkaKataloga';
import { KatalogDto } from 'src/app/model/katalog';
import { DatePipe } from '@angular/common';
import { NotificationsService } from 'src/app/shared/notifications.service';

@Component({
  selector: 'app-katalog-dialog',
  templateUrl: './katalog-dialog.component.html',
  styleUrls: ['./katalog-dialog.component.css']
})
export class KatalogDialogComponent implements OnInit {
  stavkaKatalogaDto: StavkaKatalogaDto;
  katalog: KatalogDto;
  constructor(private api: ApiService, private service: KatalogFormaService, public dialogRef: MatDialogRef<KatalogDialogComponent>,
              private datePipe: DatePipe, private notif: NotificationsService ) { }
  ngOnInit() {
  }
  save() {
    this.napraviKatalog();
    this.api.saveKatalog(this.katalog).subscribe(res => {
      this.notif.succes('Uspešno sačuvan kalendar');
     },
     err => {
      this.notif.warn('Neuspešno sačuvan kalendar');
     });
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.service.initializeDataTable();
    this.close();
}
update() {
  this.napraviKatalog();
  this.api.updateKatalog(this.katalog, this.katalog.katalogId.toString()).subscribe(res => {
    this.notif.succes('Uspešno izmenjen katalog');
   },
   err => {
    this.notif.warn('Neuspešno izmenjen katalog');
   });
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.service.initializeDataTable();
  this.close();

}
updateZakljuci() {
  this.napraviKatalog();
  this.katalog.status = 'Zakljucen';
  this.api.updateKatalog(this.katalog, this.katalog.katalogId.toString()).subscribe(res => {
  this.notif.succes('Uspešno izmenjen katalog');
  },
  err => {
   this.notif.warn('Neuspešno izmenjen katalog');
  });
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.service.initializeDataTable();
  this.close();
}
clear() {
  this.service.form.reset();
  this.service.initializeFormGroup();
}
close() {
  this.service.form.reset();
  this.service.initializeFormGroup();
  this.service.initializeDataTable();
  this.dialogRef.close();
}
napraviKatalog() {
  this.service.form.value.datumOd = this.datePipe.transform(this.service.form.value.datumOd, 'yyyy-MM-dd');
  this.service.form.value.datumDo = this.datePipe.transform(this.service.form.value.datumDo, 'yyyy-MM-dd');
  this.katalog = {
  katalogId: this.service.form.value.katalogId,
  naziv: this.service.form.value.naziv,
  status: 'U pripremi',
  datumOd: this.service.form.value.datumOd,
  datumDo: this.service.form.value.datumDo,
  stavkeKataloga: this.service.stavkeKataloga
  };
}

}
