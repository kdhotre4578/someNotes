import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-note-type-select-dialog',
  templateUrl: './note-type-select-dialog.component.html',
  styleUrls: ['./note-type-select-dialog.component.css']
})
export class NoteTypeSelectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoteTypeSelectDialogComponent>) { }

  ngOnInit(): void {
  }

  SetText() {
    this.dialogRef.close();
  }
}

export interface DialogData{
}
