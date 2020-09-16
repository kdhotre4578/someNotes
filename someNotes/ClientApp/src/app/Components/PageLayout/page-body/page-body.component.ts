import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../Common/user';

@Component({
  selector: 'app-page-body',
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.css']
})
export class PageBodyComponent implements OnInit {

  constructor() { }

  @Input() user: User = null;

  ngOnInit(): void
  {
  }

  GetCSSClass(): string
  {
    return this.user == null ? "noteContentContainer1 noteContentContainer2location" : "noteContentContainer1 noteContentContainer1location";
  }

  GetContentDivId(): string
  {
    return this.user == null ? "divNoteContents1" : "divNoteContents"; 
  }
}
