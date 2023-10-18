import { Component, OnInit } from '@angular/core';
import { Database } from '@angular/fire/database';
import { onChildAdded, onValue, ref, remove, set, update } from 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'firebase-realtime-db';
  todoItem: any = '';
  todolist: any[] = ['']
  editMode: boolean = false;
  editableItem: any;
  dataSaved: boolean = false;
  private isTodoListFetched: boolean = false;

  constructor(public database: Database) {
    //constructor

  }

  ngOnInit(): void {
    //on initialise
    this.getAllTodoList()
  }

  getAllTodoList() {
    //getAll list
  }

  saveTodoItem() {
    //save item

  }

  getTodoList() {
    this.getAllTodoList();
  }

  editItem(id: number) {
    //edit
    let index = this.todolist.filter((value) => value.id === id)
    this.editableItem = index[0];
    this.editMode = true;
  }

  updateItem() {
    //update item
  }

  deleteItem(index: number) {
    //delete item
  }

  cancelEditMode() {
    this.editMode = false;
  }
}
