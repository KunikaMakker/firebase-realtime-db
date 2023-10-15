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
  todolist: any[] = []
  editMode: boolean = false;
  editableItem: number = 0;

  constructor(public database: Database) {
    //constructor
    
  }

  ngOnInit(): void {
    //on initialise
    this.getAllTodoList()
  }

  getAllTodoList() {
    let listRef = ref(this.database, 'todolist/');
    onValue(listRef, snapshot => {
      console.log('initial',snapshot.val())
      Object.values(snapshot.val()).forEach((value: any) => {
        this.todolist.push(value.name);
      })
      console.log(this.todolist, 'list')
    }, {
      onlyOnce: true
    })
  }

  saveTodoItem() {
    //save item
    set(ref(this.database, 'todolist/' + (this.todolist.length + 1)), {
      id: this.todolist.length+1,
      name: this.todoItem
    });

    console.log('Data Saved')
    this.getTodoList()
  }

  getTodoList() {
    let listRef = ref(this.database, 'todolist/');
    onValue(listRef, snapshot => {
      if (snapshot.exists()) {
        let value: any = snapshot.val();
        console.log('date changed', value, 'current todo', this.todolist);
        this.todolist[value.id] = value.name;
      }
    })
    this.todoItem = '';
  }

  editItem(index: number) {
    //edit
    this.editableItem = index;
    this.editMode = true;
  }

  updateItem() {
    //update item
    update(ref(this.database, 'todolist/' + this.editableItem), {
      name: this.todoItem
    });
    console.log('updated value at index ', this.editableItem);
    this.editableItem = 0;
    this.editMode = false;
    this.todoItem = '';
  }

  deleteItem(index: number) {
    //delete item
    remove(ref(this.database, 'todolist/' + index)).then(() => {
      console.log(index,' removed successfully')
    });
    
  }
}
