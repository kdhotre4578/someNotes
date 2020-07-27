import { Component, OnInit } from '@angular/core';
import { NotesRepositoryService } from '../../../Services/notes-repository.service';
import { Note } from '../../../Common/note';
import { isObject } from 'util';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  newNoteTitle;
  NoteList: Note[] = [];
  isConnected: boolean = false;
  constructor(private noteRepoService: NotesRepositoryService) { }

  ngOnInit(): void
  {
    this.RefreshNotesList();
  }

  RefreshNotesList()
  {
    this.noteRepoService.GetNoteList(1).subscribe(data => this.SetData(data), error => { this.DisplayError()});
  }

  DisplayError()
  {
    alert("Issue appeared while connecting with server...");
    this.isConnected = false;
  }

  SetData(data)
  {
    this.NoteList = data;
    this.isConnected = true;
  }

  AddNewNote()
  {
    let isTodo: boolean = false;

    if (confirm("Do you want to create To Do List ?"))
    {
        isTodo = true;
    }

    let newNote: Note = { Id: -1, NoteTitle: this.newNoteTitle, UserId: 1, IsToDo: isTodo };

    this.noteRepoService.AddNote(newNote).subscribe(x => this.RefreshNotesList());
  }
}
