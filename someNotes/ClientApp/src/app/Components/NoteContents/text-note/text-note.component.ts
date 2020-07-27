import { Component, OnInit } from '@angular/core';
import { NotesRepositoryService } from '../../../Services/notes-repository.service';
import { NoteItem } from '../../../Common/note-item';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteDetail } from '../../../Common/note-detail';

@Component({
  selector: 'app-text-note',
  templateUrl: './text-note.component.html',
  styleUrls: ['./text-note.component.css']
})
export class TextNoteComponent implements OnInit {

  noteTitle: string = '';
  noteText: string = '';
  noteId: number;
  noteDetails: NoteDetail;

  constructor(private notesRepositoryService: NotesRepositoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void
  {
    let id = this.activatedRoute.snapshot.paramMap.get('noteId');
    this.noteId = Number.parseInt(id);
    this.RefreshNote();

  }

  RefreshNote()
  {
    this.notesRepositoryService.GetNoteItems(this.noteId).subscribe(data => this.SetDetails(data));
  }

  SetDetails(data)
  {
    this.noteDetails = data;
    this.noteTitle = data.Title;

    if (data.NoteItems)
    {
      this.noteText = data.NoteItems[0].Text;
    }
  }

  UpdateTitle()
  {
    if (this.noteTitle !== this.noteDetails.Title)
    {
      this.notesRepositoryService.UpdateNote(this.noteId, this.noteTitle, 1)
        .subscribe(success => { alert("Title updated") }, error => { alert("Failed to update title") });
    }
  }

  SaveNote()
  {
    this.UpdateTitle();

    if (this.noteDetails.NoteItems != null && this.noteDetails.NoteItems[0].Text == this.noteText)
    {
        // no change
        alert('No change in note');
        return;
    }
    else if (this.noteDetails.NoteItems == null && this.noteText.trim() != '')
    {
      // Add
      this.notesRepositoryService.AddNoteItem(this.noteText, this.noteId).subscribe(x => alert('Note ' + this.noteTitle + ' added'));
    }
    else if (this.noteDetails.NoteItems && this.noteDetails.NoteItems[0].Text != this.noteText.trim())
    {
      // update

      if (this.noteText.trim() == '' && !confirm('Are you sure ? you want wipe out the text'))
      {
        this.noteText = this.noteDetails.NoteItems[0].Text;
        return;
      }

      let noteItem: NoteItem = { Id: this.noteDetails.NoteItems[0].Id, Text: this.noteText, IsCompleted: false, NoteId: this.noteId };

      this.notesRepositoryService.UpdateNoteItem(noteItem).subscribe(x => alert('Note ' + this.noteTitle + ' updated'));
    }
  }
}
