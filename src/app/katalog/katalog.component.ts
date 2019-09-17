import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { KatalogDto } from '../model/katalog';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable, MatDialogConfig, MatSort } from '@angular/material';
import { ApiService } from '../shared/api.service';
import { KatalogDeleteDialogComponent } from './katalog-delete-dialog/katalog-delete-dialog.component';
import { KatalogFormaService } from '../shared/katalog-forma.service';
import { KatalogDialogComponent } from './katalog-dialog/katalog-dialog.component';
import { NotificationsService } from '../shared/notifications.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  katalozi: KatalogDto[] = [];
  displayedColumns: string[] = ['katalogId', 'naziv', 'datumOd', 'datumDo', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;
  idFilter = new FormControl('');
  nazivFilter = new FormControl('');
  datumOdFilter = new FormControl('');
  datumDoFilter = new FormControl('');
  statusFilter = new FormControl('');
  filterValues = {
    naziv: '',
    datumOd: '',
    datumDo: '',
    status: '',
    id: '',


  };

  constructor(private api: ApiService, private dialog: MatDialog, private service: KatalogFormaService,
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
    this.api.getAllKatalog().subscribe(
      res => {
        this.katalozi = res;
        this.dataSource.data = this.katalozi;
        this.changeDetectorRefs.detectChanges();
      },
      err => {
        alert('Greška prilikom povezivanja na server');
        location.reload();
      }

    );

  }
  logData(row) {
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
    this.datumOdFilter.valueChanges
      .subscribe(
        datumOd => {
          this.filterValues.datumOd = datumOd;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.datumDoFilter.valueChanges
      .subscribe(
        datumDo => {
          this.filterValues.datumDo = datumDo;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.statusFilter.valueChanges
      .subscribe(
        status => {
          this.filterValues.status = status;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
  }
  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '95%';
    this.service.create();
    this.dialog.open(KatalogDialogComponent, dialogConfig).afterClosed().subscribe(res => {
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
    dialogConfig.width = '95%';
    this.service.update(row);
    this.dialog.open(KatalogDialogComponent, dialogConfig).afterClosed().subscribe(res => {
      this.sleep(3000).then(() => {
        location.reload();
      });
    }
    );
  }

  delete(row) {
    const index = this.katalozi.indexOf(row);
    this.openConfigDialog('Da li ste sigurni da želite da obrišete katalog?').afterClosed().
      subscribe(res => {
        if (res) {
          this.api.deleteKatalog(row.katalogId).subscribe(() => {
            this.katalozi.splice(index, 1);
            this.dataSource.data = this.katalozi;
            this.changeDetectorRefs.detectChanges();
            this.notif.succes('Uspešno izbrisan katalog');
          },
            err => {
              this.notif.warn('Neuspešno izbrisan katalog');
            });
        }
      })
      ;
  }

  view(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '95%';
    this.service.view(row);
    this.dialog.open(KatalogDialogComponent, dialogConfig);
  }

  openConfigDialog(msg) {
    return this.dialog.open(KatalogDeleteDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      position: { top: '20px' },
      disableClose: true
    });
  }
  priprema(row) {
    if (row.status === 'U pripremi') {
      return true;
    }
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
      return data.katalogId.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        && data.naziv.toString().toLowerCase().indexOf(searchTerms.naziv) !== -1
        && data.datumDo.toString().toLowerCase().indexOf(searchTerms.datumDo) !== -1
        && data.datumOd.toString().toLowerCase().indexOf(searchTerms.datumOd) !== -1
        && data.status.toString().toLowerCase().indexOf(searchTerms.status) !== -1;

    };
    return filterFunction;
  }

}
