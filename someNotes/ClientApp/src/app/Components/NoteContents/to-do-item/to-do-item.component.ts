import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit {

  txtNewItem;

  @Output() notifyItemAdded = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  AddItem()
  {
    this.notifyItemAdded.emit(this.txtNewItem);
    this.txtNewItem = '';
  }

}
