import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KatalogDeleteDialogComponent } from './katalog-delete-dialog.component';

describe('KatalogDeleteDialogComponent', () => {
  let component: KatalogDeleteDialogComponent;
  let fixture: ComponentFixture<KatalogDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KatalogDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KatalogDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
