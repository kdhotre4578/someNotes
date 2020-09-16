import { Component, OnInit, Input } from '@angular/core';
import { NotesRepositoryService } from '../../../Services/notes-repository.service';
import { Note } from '../../../Common/note';
import { User } from '../../../Common/user';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteTypeSelectDialogComponent } from '../../Dialog/note-type-select-dialog/note-type-select-dialog.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  newNoteTitle;
  NoteList: Note[] = [];
  isConnected: boolean = false;

  @Input() activeUser: User = null;

  constructor(private noteRepoService: NotesRepositoryService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void
  {
    this.RefreshNotesList();
  }

  RefreshNotesList()
  {
    this.router.navigateByUrl("");
    this.noteRepoService.GetNoteList(this.activeUser.UserId).subscribe(data => this.SetData(data), error => { this.DisplayError() });
    this.newNoteTitle = '';
  }

  DisplayError()
  {
    alert("Issue appeared while connecting with server...");
    this.isConnected = false;
  }

  SetData(data: Note[])
  {
    this.isConnected = true;
    this.NoteList = data;
  }

  OpenDialog()
  {
    const dialogRef = this.dialog.open(NoteTypeSelectDialogComponent,
      { width: '350px' });

    dialogRef.afterClosed().subscribe(result => this.SetResult(result));
  }

  SetResult(result: string)
  {
    if (result)
    {
      this.AddNewNote(result == 'ToDo');
    }
  }

  AddNewNote(isTodo: boolean)
  {
    let newNote: Note = { Id: -1, NoteTitle: this.newNoteTitle, UserId: this.activeUser.UserId, IsToDo: isTodo };
    this.noteRepoService.AddNote(newNote).subscribe(x => this.RefreshNotesList());
  }
}
