import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class IgrackaFormaService {
  createIgracka = false;
  updateIgracka = false;
  viewIgracka = false;

  form: FormGroup = new FormGroup({
    igrackaId: new FormControl(''),
    naziv: new FormControl('', Validators.required),
    trenutnaCena: new FormControl(''),
    stanjeNaZalihama: new FormControl(''),
    pozicija: new FormControl(''),
    opis: new FormControl(''),
  });
  constructor() { }
  initializeFormGroup() {
    this.form.setValue({
      igrackaId: '',
      naziv: '',
      trenutnaCena: '',
      stanjeNaZalihama: '',
      pozicija: '',
      opis: ''

    });
  }
  populateForm(igracka) {
    this.form.setValue({
      igrackaId: igracka.igrackaId,
      naziv: igracka.naziv,
      trenutnaCena: igracka.trenutnaCena,
      stanjeNaZalihama: igracka.stanjeNaZalihama,
      pozicija: igracka.pozicija,
      opis: igracka.opis

    });
  }
  view(row) {
    this.createIgracka = false;
    this.viewIgracka = true;
    this.updateIgracka = false;
    this.populateForm(row);

  }
  update(row) {
    this.createIgracka = false;
    this.viewIgracka = false;
    this.updateIgracka = true;
    this.populateForm(row);
  }
  create() {
    this.createIgracka = true;
    this.viewIgracka = false;
    this.updateIgracka = false;
  }
}
