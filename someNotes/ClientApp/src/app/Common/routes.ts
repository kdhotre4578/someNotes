import { Routes } from '@angular/router';
import { TextNoteComponent } from '../Components/NoteContents/text-note/text-note.component';
import { ToDoListComponent } from '../Components/NoteContents/to-do-list/to-do-list.component';

export const routes: Routes = [
  { path: 'todo/:noteId', component: ToDoListComponent },
  { path: 'textnote/:noteId', component: TextNoteComponent }
]
