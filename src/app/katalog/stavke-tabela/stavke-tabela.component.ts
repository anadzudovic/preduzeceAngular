import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { KatalogFormaService } from 'src/app/shared/katalog-forma.service';
import { MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { StavkaKatalogaDto } from 'src/app/model/stavkaKataloga';

@Component({
  selector: 'app-stavke-tabela',
  templateUrl: './stavke-tabela.component.html',
  styleUrls: ['./stavke-tabela.component.css']
})
export class StavkeTabelaComponent implements OnInit {
  displayedColumns: string[] = ['redniBroj', 'naziv', 'trenutnaCena', 'stanjeNaZalihama', 'opis', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.service.stavkeKataloga);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  constructor(private service: KatalogFormaService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.pripremi();
    this.service.dodaj.asObservable().subscribe((data) => {
      console.log(this.service.stavkeKataloga);
      this.dataSource.data = this.service.stavkeKataloga;
    });
  }
  pripremi() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;

    console.log(this.service.stavkeKataloga);
    this.dataSource.data = this.service.stavkeKataloga;
    this.dataSource.filterPredicate = (dto: StavkaKatalogaDto, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const listAsFlatString = (obj): string => {
        let returnVal = '';
        Object.values(obj).forEach((val) => {
          if (typeof val !== 'object') {
            returnVal = returnVal + ' ' + val;
          } else if (val !== null) {
            returnVal = returnVal + ' ' + listAsFlatString(val);
          }
        });

        return returnVal.trim().toLowerCase();
      };

      return listAsFlatString(dto).includes(transformedFilter);
    };
  }
  delete(row) {
    const index = this.service.stavkeKataloga.indexOf(row);
    this.service.stavkeKataloga.splice(index, 1);
    this.dataSource.data = this.service.stavkeKataloga;
    this.changeDetectorRefs.detectChanges();
    for (let i = 0; i < this.service.stavkeKataloga.length; i++) {
      this.service.stavkeKataloga[i].stavkaKatalogaId.redniBroj = i + 1;
  }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
