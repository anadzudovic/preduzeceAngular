import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { IgrackaComponent } from './igracka/igracka.component';
import { KatalogComponent } from './katalog/katalog.component';
import { NavigationComponent } from './navigation/navigation.component';
import { IgrackaDialogComponent } from './igracka/igracka-dialog/igracka-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgrackaDeleteDialogComponent } from './igracka/igracka-delete-dialog/igracka-delete-dialog.component';
import { KatalogDeleteDialogComponent } from './katalog/katalog-delete-dialog/katalog-delete-dialog.component';
import { KatalogDialogComponent } from './katalog/katalog-dialog/katalog-dialog.component';
import { IgrackeTabelaComponent } from './katalog/igracke-tabela/igracke-tabela.component';
import { StavkeTabelaComponent } from './katalog/stavke-tabela/stavke-tabela.component';
import { CommonModule, DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    IgrackaComponent,
    KatalogComponent,
    NavigationComponent,
    IgrackaDialogComponent,
    IgrackaDeleteDialogComponent,
    KatalogDeleteDialogComponent,
    KatalogDialogComponent,
    IgrackeTabelaComponent,
    StavkeTabelaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule


  ],

  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [IgrackaDeleteDialogComponent, IgrackaDialogComponent, KatalogDialogComponent, KatalogDeleteDialogComponent]
})
export class AppModule { }
