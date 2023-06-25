import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';
import { TodoKeyLocalStore } from '../models/enum/todoKeyLocalStore';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {
  public todosState = signal<Array<Todo>>([]);

  public updateTodos({id, title, description, done}: Todo): void {
    if ((title && id && description !== null) || undefined) {
      this.todosState.mutate((todos) => {
        if (todos != null) {
          todos.push(new Todo(id, title, description, done));
        }
      });
      this.saveTodosInLocalStorage();
    }
  }

  public saveTodosInLocalStorage(): void {
    const todos = JSON.stringify(this.todosState());
    todos && localStorage.setItem(TodoKeyLocalStore.TODO_LIST, todos);
  }

}
