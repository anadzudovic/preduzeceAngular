
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { IgrackaDto } from '../model/igracka';
import { ApiService } from '../shared/api.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { IgrackaDialogComponent } from './igracka-dialog/igracka-dialog.component';
import { IgrackaDeleteDialogComponent } from './igracka-delete-dialog/igracka-delete-dialog.component';
import { IgrackaFormaService } from '../shared/igracka-forma.service';
import { NotificationsService } from '../shared/notifications.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-igracka',
  templateUrl: './igracka.component.html',
  styleUrls: ['./igracka.component.css']
})
export class IgrackaComponent implements OnInit {
  igracke: IgrackaDto[] = [];
  displayedColumns: string[] = ['igrackaId', 'naziv', 'trenutnaCena', 'stanjeNaZalihama', 'pozicija', 'opis', 'actions'];
  dataSource: MatTableDataSource<any>;

  idFilter = new FormControl('');
  opisFilter = new FormControl('');
  trenutnaCenaFilter = new FormControl('');
  nazivFilter = new FormControl('');
  stanjeNaZalihamaFilter = new FormControl('');
  pozicijaFilter = new FormControl('');
  filterValues = {
    naziv: '',
    stanjeNaZalihama: '',
    opis: '',
    cena: '',
    pozicija: '',
    id: '',


  };
  constructor(private api: ApiService, private dialog: MatDialog, private service: IgrackaFormaService,
              private changeDetectorRefs: ChangeDetectorRef, private notif: NotificationsService) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.tableFilter();
    this.getAll();
    this.applyFilter();

  }
  getAll() {
    this.api.getAllIgracka().subscribe(
      res => {
        this.igracke = res;
        console.log(this.igracke);
        this.dataSource.data = this.igracke;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        alert('Greška prilikom povezivanja na server');
      }

    );

  }

  logData(row) {
    console.log(row);
    console.log(this.igracke);
  }
  applyFilter() {
    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.nazivFilter.valueChanges
      .subscribe(
        naziv => {
          this.filterValues.naziv = naziv;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.stanjeNaZalihamaFilter.valueChanges
      .subscribe(
        stanjeNaZalihama => {
          this.filterValues.stanjeNaZalihama = stanjeNaZalihama;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.pozicijaFilter.valueChanges
      .subscribe(
        pozicija => {
          this.filterValues.pozicija = pozicija;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.trenutnaCenaFilter.valueChanges
      .subscribe(
        cena => {
          this.filterValues.cena = cena;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.opisFilter.valueChanges
      .subscribe(
        opis => {
          this.filterValues.opis = opis;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
  }
  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.create();
    this.dialog.open(IgrackaDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.sleep(3000).then(() => {
        location.reload();
      });
    }
    );
  }
  edit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.update(row);
    this.dialog.open(IgrackaDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.sleep(3000).then(() => {
        location.reload();
      });
    }
    );
  }
  delete(row) {
    const index = this.igracke.indexOf(row);
    this.openConfigDialog('Da li ste sigurni da želite da obrišete igračku?').afterClosed().
      subscribe(res => {
        if (res) {
          this.api.deleteIgracka(row.igrackaId).subscribe(() => {
            this.igracke.splice(index, 1);
            this.dataSource.data = this.igracke;
            this.changeDetectorRefs.detectChanges();
            this.notif.succes('Uspešno izbrisana igračka');
          }, err => {
            this.notif.warn('Nespešno izbrisana igračka');
          });

        }
      })
      ;
  }
  view(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.service.view(row);
    this.dialog.open(IgrackaDialogComponent, dialogConfig);
  }
  openConfigDialog(msg) {
    return this.dialog.open(IgrackaDeleteDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: '20px' },
      disableClose: true
    });
  }
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }
  sortingDataAccessor(item, property) {
    if (property.includes('.')) {
      return property.split('.')
        .reduce((object, key) => object[key] || '', item);
    }
    return item[property];
  }
  tableFilter(): (data: any, filter: string) => boolean {
    // tslint:disable-next-line: only-arrow-functions
    const filterFunction = function(data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.igrackaId.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.naziv.toString().toLowerCase().indexOf(searchTerms.naziv) !== -1
        && data.opis.toString().toLowerCase().indexOf(searchTerms.opis) !== -1
        && data.trenutnaCena.toString().toLowerCase().indexOf(searchTerms.cena) !== -1
        && data.stanjeNaZalihama.toString().toLowerCase().indexOf(searchTerms.stanjeNaZalihama) !== -1
        && data.pozicija.toString().toLowerCase().indexOf(searchTerms.pozicija) !== -1;

    };
    return filterFunction;
  }
}

