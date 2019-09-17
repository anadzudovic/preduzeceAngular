import { Component, OnInit, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatTable } from '@angular/material';
import { ApiService } from 'src/app/shared/api.service';
import { IgrackaDto } from 'src/app/model/igracka';
import { KatalogFormaService } from 'src/app/shared/katalog-forma.service';


@Component({
  selector: 'app-igracke-tabela',
  templateUrl: './igracke-tabela.component.html',
  styleUrls: ['./igracke-tabela.component.css']
})
export class IgrackeTabelaComponent implements OnInit {
  igracke: IgrackaDto[] = [];
  displayedColumns: string[] = ['igrackaId', 'naziv', 'trenutnaCena', 'stanjeNaZalihama', 'pozicija', 'opis', 'actions'];
  dataSource: MatTableDataSource<any>;
  constructor(private api: ApiService, private dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef, private service: KatalogFormaService) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.getAll();
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
        location.reload();
      }

    );

  }
  logData(row) {
    console.log(row);
    console.log(this.igracke);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  add(row) {
    this.service.dodaj.next(row);
  }
}
