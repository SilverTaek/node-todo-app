import { RequestTodoDto } from '../dto/RequestTodoDto';
import { Between, Like } from 'typeorm';
import { Todo } from '../entity/Todo';
import { AppDataSource } from '../common/config/environment';
import * as moment from 'moment';

export class TodoService {
  static registerTodo = async (todoDto: RequestTodoDto): Promise<Todo> => {
    const new_todo: RequestTodoDto = RequestTodoDto.from(todoDto);
    const result: Todo = await AppDataSource.getRepository(Todo).save(new_todo);

    return result;
  };

  static getTodos = async (todoQuery, is_query_empty: boolean): Promise<Todo[]> => {
    if (is_query_empty) {
      const todos: Todo[] = await AppDataSource.getRepository(Todo).find({
        order: {
          priority: 'ASC',
        },
      });

      return todos;
    } else {
      const req_page = todoQuery.page as string;
      const req_take = todoQuery.take as string;

      const page: number = parseInt(req_page) || 1;
      const take: number = parseInt(req_take) || 10;
      const options = TodoService.createWhere(todoQuery);

      const sort: string = todoQuery.sort as string;

      const todos: Todo[] = await AppDataSource.getRepository(Todo).find({
        where: options,
        take: take,
        skip: (page - 1) * take,
        order: {
          priority: sort === 'ASC' ? 'ASC' : 'DESC',
        },
      });

      return todos;
    }
  };
  static checkTodo = async (id: number) => {
    const result = {
      checkId: true,
      checkStatus: true,
    };
    const todo = await AppDataSource.getRepository(Todo).findOne({
      where: { id },
    });
    if (!todo) {
      result.checkId = false;
      return result;
    }

    if (todo.status === 'DONE') {
      result.checkStatus = false;
      return result;
    }
    return result;
  };
  static getTodoOne = async (id: number): Promise<Todo> => {
    const todo = await AppDataSource.getRepository(Todo).findOne({
      where: { id },
    });

    return todo;
  };

  static modifyTodo = async (id: number, todoDto: RequestTodoDto): Promise<Todo> => {
    const get_todo = await AppDataSource.getRepository(Todo).findOne({
      where: { id },
    });

    const new_todo_dto: RequestTodoDto = RequestTodoDto.updateEntity(todoDto);
    const update_todo: Todo = Todo.update(get_todo, new_todo_dto);
    const result: Todo = await AppDataSource.getRepository(Todo).save(update_todo);
    return result;
  };

  static removeTodo = async (id: number) => {
    return await AppDataSource.getRepository(Todo).delete(id);
  };

  // 조회를 위한 Where 절 생성 함수
  static createWhere(todoQuery) {
    try {
      const status = todoQuery.status as string;
      const title = todoQuery.title as string;
      const priority = todoQuery.priority as string;
      const req_deadline = todoQuery.deadline as string;
      const req_date_completed = todoQuery.date_completed as string;

      let options = {};
      if (status !== undefined) {
        options = {
          ...options,

          status,
        };
      }

      if (title !== undefined) {
        options = {
          ...options,

          title: Like(`%${title}%`),
        };
      }

      if (priority !== undefined) {
        options = {
          ...options,

          priority,
        };
      }

      if (req_deadline !== undefined) {
        const start_date_moment = moment(req_deadline, 'YYYY-MM-DD', true);
        const start_date = start_date_moment.toDate();
        const end_date = start_date_moment.add(1, 'day').toDate();
        options = {
          ...options,

          deadline: Between(start_date, end_date),
        };
      }

      if (req_date_completed !== undefined) {
        const start_date_moment = moment(req_deadline, 'YYYY-MM-DD', true);
        const start_date = start_date_moment.toDate();
        const end_date = start_date_moment.add(1, 'day').toDate();

        options = {
          ...options,

          date_completed: Between(start_date, end_date),
        };
      }

      return options;
    } catch (error) {
      console.log(error);
    }
  }
}
