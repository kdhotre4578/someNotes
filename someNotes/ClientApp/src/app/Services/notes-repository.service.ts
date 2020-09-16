import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Note } from '../Common/note';
import { NoteItem } from '../Common/note-item';
import { NoteDetail } from '../Common/note-detail';

@Injectable({
  providedIn: 'root'
})
export class NotesRepositoryService {

  items: NoteItem[] = [];
  notesList: Note[] = [];

  baseUrl: string = "https://localhost:44314/api";
  noteUri: string = this.baseUrl + "/note/";
  noteItemUri: string = this.baseUrl + "/noteitem/";
  reqHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient)
  {
  }

   //---------------- Notes -------------------------------------

  GetNoteList(userId: number)
  {
    return this.httpClient.get<Note[]>(this.noteUri + userId);
  }

  AddNote(newNote: Note)
  {
    return this.httpClient.post(this.noteUri, newNote, { headers: this.reqHeaders });
  }

  UpdateNote(id: number, title: string, userId: number) {
    let updatedNote: Note = { Id: id, NoteTitle: title, IsToDo: false, UserId: userId };
    return this.httpClient.put(this.noteUri + id, updatedNote, { headers: this.reqHeaders });
  }

  //---------------- Note Items -------------------------------------

  GetNoteItems(noteId: number)
  {
    return this.httpClient.get<NoteDetail>(this.noteItemUri + noteId);
  }

  AddNoteItem(item: string, noteId: number)
  {
    let newNoteItem: NoteItem = { Id: 0, Text: item, IsCompleted: false, NoteId: noteId };
    return this.httpClient.post(this.noteItemUri, newNoteItem, { headers: this.reqHeaders });
  }

  UpdateNoteItem(item: NoteItem)
  {
    let noteItem: NoteItem = { Id: item.Id, Text: item.Text, IsCompleted: item.IsCompleted, NoteId: item.NoteId };
    return this.httpClient.put(this.noteItemUri + item.Id, noteItem, { headers: this.reqHeaders });
  }

  RemoveNoteItem(item)
  {
    return this.httpClient.delete(this.noteItemUri + item.Id, { headers: this.reqHeaders });
  }
}
