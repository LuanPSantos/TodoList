import { Component } from '@angular/core';
import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {
  private todoDataService: TodoDataService;

  constructor(todoDataService: TodoDataService){
    this.todoDataService = todoDataService;
  }

  onAddTodo(todo: Todo){
    this.todoDataService.addTodo(todo);
  }

  toggleTodoComplete(todo){
    this.todoDataService.toggleTodoComplete;
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos(){
    return this.todoDataService.getAllTodos();
  }
}
