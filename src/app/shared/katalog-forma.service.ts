import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StavkaKatalogaDto } from '../model/stavkaKataloga';
import { BehaviorSubject } from 'rxjs';
import { KatalogDto } from '../model/katalog';
@Injectable({
  providedIn: 'root'
})
export class KatalogFormaService {
  constructor() {
    this.dodaj.asObservable().subscribe((data) => {
      console.log(data);
      this.dodajStavkuKataloga(data);
    });
  }
  createKatalog = false;
  updateKatalog = false;
  viewKatalog = false;
  stavkeKataloga: StavkaKatalogaDto[] = [];
  dodaj = new BehaviorSubject<any>(null);
  redniBroj: number;
  stavkaKatalogaDto: StavkaKatalogaDto;
  form: FormGroup = new FormGroup({
    katalogId: new FormControl(''),
    naziv: new FormControl('', Validators.required),
    datumOd: new FormControl(''),
    datumDo: new FormControl(''),
    status: new FormControl(''),
  });
  katalog: KatalogDto;
  minDate() {
    if (this.form.getRawValue().datumOd === '') {
     return   new Date(1900, 0, 1);
    } else {
      return this.form.getRawValue().datumOd;
    }
  }
  initializeFormGroup() {
    this.form.setValue({
      katalogId: '',
      naziv: '',
      datumOd: '',
      datumDo: '',
      status: ''
    });
  }
  populateForm(katalog) {
    this.form.setValue({
      katalogId: katalog.katalogId,
      naziv: katalog.naziv,
      datumOd: katalog.datumOd,
      datumDo: katalog.datumDo,
      status: katalog.status

    });
  }
  populateDataTable(row) {
    this.stavkeKataloga = row.stavkeKataloga;
    console.log(this.stavkeKataloga);
  }
  initializeDataTable() {
    this.stavkeKataloga = [];
    this.katalog = null;
  }
  view(row) {
    this.createKatalog = false;
    this.viewKatalog = true;
    this.updateKatalog = false;
    this.populateForm(row);
    this.populateDataTable(row);

  }
  update(row) {
    this.createKatalog = false;
    this.viewKatalog = false;
    this.updateKatalog = true;
    this.populateForm(row);
    this.populateDataTable(row);
  }
  create() {
    this.createKatalog = true;
    this.viewKatalog = false;
    this.updateKatalog = false;
    this.stavkeKataloga = [];
  }
  dodajStavkuKataloga(data) {
    if (!this.stavkeKataloga.some(st => st.igracka.igrackaId === data.igrackaId)) {
      this.redniBroj = this.stavkeKataloga.length + 1;

      this.stavkaKatalogaDto = {
        stavkaKatalogaId: {
          redniBroj: this.redniBroj,
        },
        igracka: data
      };
      this.stavkeKataloga.push(this.stavkaKatalogaDto);
    }
  }
}
