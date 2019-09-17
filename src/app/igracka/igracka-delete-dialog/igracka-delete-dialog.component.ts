import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-igracka-delete-dialog',
  templateUrl: './igracka-delete-dialog.component.html',
  styleUrls: ['./igracka-delete-dialog.component.css']
})
export class IgrackaDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<IgrackaDeleteDialogComponent  >) { }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
