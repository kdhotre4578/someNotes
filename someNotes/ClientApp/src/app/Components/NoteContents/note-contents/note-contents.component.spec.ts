import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteContentsComponent } from './note-contents.component';

describe('NoteContentsComponent', () => {
  let component: NoteContentsComponent;
  let fixture: ComponentFixture<NoteContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
