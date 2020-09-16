import { Routes } from '@angular/router';
import { TextNoteComponent } from '../Components/NoteContents/text-note/text-note.component';
import { ToDoListComponent } from '../Components/NoteContents/to-do-list/to-do-list.component';
import { LoginComponent } from '../Components/Auth/login/login.component';
import { LogoutComponent } from '../Components/Auth/logout/logout.component';
import { RegisterComponent } from '../Components/Auth/register/register.component';
import { AuthGuard } from '../Guards/auth.guard';

export const routes: Routes = [
  { path: 'todo/:noteId', component: ToDoListComponent, canActivate: [AuthGuard] },
  { path: 'textnote/:noteId', component: TextNoteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'register', component: RegisterComponent }
]
