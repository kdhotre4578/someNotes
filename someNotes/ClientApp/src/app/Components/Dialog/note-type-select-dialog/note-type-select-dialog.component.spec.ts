import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTypeSelectDialogComponent } from './note-type-select-dialog.component';

describe('NoteTypeSelectDialogComponent', () => {
  let component: NoteTypeSelectDialogComponent;
  let fixture: ComponentFixture<NoteTypeSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteTypeSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteTypeSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
