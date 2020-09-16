import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../Common/user';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  @Input() appTitle: string = '';

  @Input() user: User = null;

  constructor() { }

  ngOnInit(): void {
  }

  GetUserLog(): string {
    return this.user == null ? "login" : "logout";
  }
}
