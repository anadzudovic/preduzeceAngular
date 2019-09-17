import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatSnackBarModule,
  MatSortModule
} from '@angular/material';
const material = [
  MatButtonModule, MatToolbarModule, MatListModule, MatIconModule, MatTableModule, MatFormFieldModule,
  MatInputModule, MatSelectModule, MatPaginatorModule, MatDialogModule, MatTooltipModule,
  MatDatepickerModule, MatNativeDateModule, MatGridListModule, MatSnackBarModule, MatSortModule

];
@NgModule({

  imports: [material],
  exports: [material]
})
export class MaterialModule { }
