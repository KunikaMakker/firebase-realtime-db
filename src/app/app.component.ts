import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'firebase-realtime-db';
  todoItem: any = '';
  todolist: any[] = []
  editMode: boolean = false;
  editableItem: string = '';

  constructor() {
    //constructor
  }

  ngOnInit(): void {
    //on initialise
  }

  saveTodoItem() {
    //save item
  }

  editItem(index: number) {
    //edit
    this.editableItem = this.todolist[index];
    this.editMode = true;
  }

  updateItem() {
    //update item
    this.editMode = false;
  }

  deleteItem(index: number) {
    //delete item
  }
}
