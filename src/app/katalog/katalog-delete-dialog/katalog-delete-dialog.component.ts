import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-katalog-delete-dialog',
  templateUrl: './katalog-delete-dialog.component.html',
  styleUrls: ['./katalog-delete-dialog.component.css']
})
export class KatalogDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<KatalogDeleteDialogComponent  >) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close(false);
  }

}
