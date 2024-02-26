import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todos: any[] = [];
  todoTitle: string = '';
  todo: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.http.get<any[]>('http://localhost:3000/todos')
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  fetchTodoById(id: string) {
    this.http.get<any>('http://localhost:3000/todos/'+id)
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  createTodo() {
    this.http.post<any>('http://localhost:3000/todos/create', { title: this.todoTitle, isCompleted: false })
      .subscribe(todo => {
        this.todos.push(todo);
        this.todoTitle = '';
      });
  }

  doneTodo(todo: any) {
    this.http.put<any>('http://localhost:3000/todos/'+todo._id, { title: todo.title, isCompleted: true })
      .subscribe(todo => {
        this.fetchTodos()
      });
  }

  notDoneTodo(todo: any) {
    this.http.put<any>('http://localhost:3000/todos/'+todo._id, { title: todo.title, isCompleted: false })
      .subscribe(todo => {
        this.fetchTodos()
      });
  }

  removeTodo(id: string) {
    this.http.delete<any>('http://localhost:3000/todos/'+id)
      .subscribe(todo => {
        this.fetchTodos()
      });
  }
}
