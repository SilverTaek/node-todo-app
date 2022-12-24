import { Request } from 'express';
import { Todo } from '../entity/Todo';

export class RequestTodoDto {
  title: string;
  priority: number;
  status: string;
  deadline: string;

  toTodoEntity() {
    return Todo.from(this.title, this.status, this.priority, this.deadline);
  }

  static from(todoDto: RequestTodoDto) {
    const new_todoDto = new RequestTodoDto();
    new_todoDto.title = todoDto.title;
    new_todoDto.status = todoDto.status;
    new_todoDto.priority = todoDto.priority;
    new_todoDto.deadline = todoDto.deadline;

    return todoDto;
  }

  static updateEntity(todoDto: RequestTodoDto) {
    const new_todo_dto = new RequestTodoDto();
    new_todo_dto.title = todoDto.title;
    new_todo_dto.status = todoDto.status;
    new_todo_dto.priority = todoDto.priority;
    new_todo_dto.deadline = todoDto.deadline;
    return new_todo_dto;
  }
}
