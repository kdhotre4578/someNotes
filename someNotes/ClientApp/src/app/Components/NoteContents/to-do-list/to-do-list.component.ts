import { Component, OnInit } from '@angular/core';
import { NotesRepositoryService } from '../../../Services/notes-repository.service';
import { NoteItem } from '../../../Common/note-item';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  initialData;
  toDoIItems: NoteItem[];
  noteTitle;
  noteId: number;

  constructor(private noteRepoService: NotesRepositoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router)
  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void
  {
    let idParam = this.activatedRoute.snapshot.paramMap.get('noteId');
    this.noteId = Number.parseInt(idParam);

    this.RefreshList();
  }

  RefreshList()
  {
    this.noteRepoService.GetNoteItems(this.noteId).subscribe(data => this.SetDetails(data));
  }

  SetDetails(data)
  {
    this.initialData = data;
    this.noteTitle = data.Title;
    this.toDoIItems = data.NoteItems ;
  }

  AddNoteItem(newItemText: string)
  {
      this.noteRepoService.AddNoteItem(newItemText, this.noteId).subscribe(x => this.RefreshList());
  }

  UpdateTitle()
  {
    if (this.noteTitle != this.initialData.Title)
    {
      this.noteRepoService.UpdateNote(this.noteId, this.noteTitle, 1).subscribe(x => alert("Updated title"));
    }
  }

  SetFontStyle(isCompleted: boolean)
  {
      return isCompleted ? "isCompleted" : "isPending";
  }

  SetItem(item: NoteItem)
  {
    item.IsCompleted = !item.IsCompleted;
    this.noteRepoService.UpdateNoteItem(item).subscribe();
  }

  RemoveItem(item: NoteItem)
  {
    if (confirm("Are you sure? '" + item.Text + "' will removed permanently..."))
    {
      this.noteRepoService.RemoveNoteItem(item).subscribe(x => this.RefreshList());
    }
  }
}
