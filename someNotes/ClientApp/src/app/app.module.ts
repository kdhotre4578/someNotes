import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './Components/NoteContents/to-do-list/to-do-list.component';
import { ToDoItemComponent } from './Components/NoteContents/to-do-item/to-do-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextNoteComponent } from './Components/NoteContents/text-note/text-note.component';
import { NoteContentsComponent } from './Components/NoteContents/note-contents/note-contents.component';
import { NoteListComponent } from './Components/NoteList/note-list/note-list.component';
import { NoteItemComponent } from './Components/NoteList/note-item/note-item.component';
import { routes } from './Common/routes';
import { PageHeaderComponent } from './Components/PageLayout/page-header/page-header.component';
import { PageFooterComponent } from './Components/PageLayout/page-footer/page-footer.component';
import { PageBodyComponent } from './Components/PageLayout/page-body/page-body.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { LogoutComponent } from './Components/Auth/logout/logout.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { NoteTypeSelectDialogComponent } from './Components/Dialog/note-type-select-dialog/note-type-select-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoItemComponent,
    TextNoteComponent,
    NoteContentsComponent,
    NoteListComponent,
    NoteItemComponent,
    PageHeaderComponent,
    PageFooterComponent,
    PageBodyComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    NoteTypeSelectDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
