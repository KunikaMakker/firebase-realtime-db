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
    let listRef = ref(this.database, 'todolist/');
    onValue(listRef, snapshot => {
      console.log('initial',snapshot.val())
      this.todolist=[]
      let value= snapshot.val()
      if(value){
        Object.values(value)?.forEach((value: any) => {
          this.todolist.push({id:value.id,name:value.name});
        })
        console.log(this.todolist, 'list')
      }
    })
  }

  saveTodoItem() {
    //save item
    set(ref(this.database, 'todolist/' + (new Date().getTime())), {
      id: new Date().getTime(),
      name: this.todoItem
    })
    .then(() => {
      console.log('Data Saved');
      this.getTodoList();
      this.todoItem = ''
    })
    .catch(() => {
      console.log('Data Not Saved');
    });
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
    update(ref(this.database, 'todolist/' + this.editableItem?.id), {
      name: this.todoItem
    }).then(()=>{
      console.log('updated value at index ', this.editableItem.id);
      this.editableItem = {};
      this.editMode = false;
      this.todoItem = '';
      this.getTodoList()
    });
  }

  deleteItem(index: number) {
    //delete item
    if(index){
      remove(ref(this.database, 'todolist/' + index)).then(() => {
        console.log(index,' removed successfully')
        this.getTodoList()
      });
    }
  }

  cancelEditMode() {
    this.editMode = false;
  }
}
