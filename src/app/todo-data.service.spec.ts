import { TestBed, inject } from '@angular/core/testing';

import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  it('should be created', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos()', () => {
    it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', 
      inject([TodoDataService], (service: TodoDataService) => {
      
        let todo1 = new Todo({title: 'Hello 1', complete: false});
        let todo2 = new Todo({title: 'Hello 2', complete: true});

        service.addTodo(todo1);
        service.addTodo(todo2);

        expect(service.getAllTodos()).toEqual([todo1, todo2]);

    }));
  });

  describe('#save(todo)', () => {

    it('should automatically assign an incrementing id',
      inject([TodoDataService], (service: TodoDataService) =>{
        let t1 = new Todo({title: 'Hello 1', complete: false});
        let t2 = new Todo({title: 'Hello 2', complete: true});

        service.addTodo(t1);
        service.addTodo(t2);

        expect(service.getTodoById(1)).toEqual(t1);
        expect(service.getTodoById(2)).toEqual(t2);
      }));
  });

  describe('#deleteTodoById(id)', () => {
    it('should remove todo with the corresponding id',
    inject([TodoDataService], (service: TodoDataService) => {
      let t1 = new Todo({title: 'Hello 1', complete: false});
      let t2 = new Todo({title: 'Hello 2', complete: true});

      service.addTodo(t1);
      service.addTodo(t2);

      expect(service.getAllTodos()).toEqual([t1, t2]);
      
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([t2]);
      
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));
  });

  describe('#updateTodoById(id)', () => {
    it('should return todo with the corresponding id and updated data', 
      inject([TodoDataService], (service, TodoDataService) => {
        let t1 = new Todo({title: 'Hello 1', complete: false});
  
        service.addTodo(t1);

        let todoUpdated = service.updateTodoById(1, {
          title: 'New'
        });

        expect(todoUpdated.title).toEqual('New');
      }));

    it('should return null if todo is not found',
      inject([TodoDataService], (service: TodoDataService) => {
        let t1 = new Todo({title: 'Hello 1', complete: false});
        
        service.addTodo(t1);

        let todoUpdated = service.updateTodoById(2, {
          title: 'New'
        });

        expect(todoUpdated).toEqual(null);
      }));
  });

  describe('#toggleTodoComplete(todo)', () => {
    it('should return the updated todo with inverse complete status',
      inject([TodoDataService], (service: TodoDataService) => {
        let t1 = new Todo({title: 'Hello 1', complete: false});
        
        service.addTodo(t1);

        let updatedTodo = service.toggleTodoComplete(t1);

        expect(updatedTodo.complete).toEqual(true);

        updatedTodo = service.toggleTodoComplete(t1);

        expect(updatedTodo.complete).toEqual(false);
      }));
  });
});
