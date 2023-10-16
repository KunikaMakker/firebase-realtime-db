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
  dataSaved:boolean=false
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
    }, {
      onlyOnce: true
    })
  }

  saveTodoItem() {
    
      set(ref(this.database, 'todolist/' + (this.todolist.length + 1)), {
        id: this.todolist.length + 1,
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
    this.getAllTodoList()
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
    }).then(()=>{
      console.log('updated value at index ', this.editableItem);
      this.editableItem = 0;
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
}
