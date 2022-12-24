import { Request, Response } from 'express';
import { tokenToString } from 'typescript';
import { RequestTodoDto } from '../dto/RequestTodoDto';
import { Todo } from '../entity/Todo';
import { TodoService } from '../service/TodoService';
class TodoController {
  // 할 일 생성 API
  static createTodo = async (req: Request, res: Response): Promise<Response<JSON>> => {
    try {
      const todoDto: RequestTodoDto = req.body;
      const todo = TodoService.registerTodo(todoDto);

      return res.status(200).json({
        statusCode: '200',
        todo: await todo,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: '500',
        message: '알 수 없는 에러가 발생했습니다 다시 시도해주세요!',
      });
    }
  };

  // 할 일 목록 조회 API
  static selectTodos = async (req: Request, res: Response): Promise<Response<JSON>> => {
    try {
      const todoQuery = {
        title: req.query.title,
        status: req.query.status,
        priority: req.query.priority,
        deadline: req.query.deadline,
        date_completed: req.query.date_completed,
        page: req.query.page,
        take: req.query.take,
        sort: req.query.sort,
      };

      const is_query_empty = Object.keys(req.query).length === 0;

      const todos: Todo[] = await TodoService.getTodos(todoQuery, is_query_empty);

      return res.status(200).json({
        statusCode: '200',
        item_list: todos,
        total_count: todos.length,
      });
    } catch (error) {
      res.status(500).json({
        statusCode: '500',
        message: '알 수 없는 에러가 발생했습니다 다시 시도해주세요!',
      });
    }
  };
  // 할 일 상세 조회 API
  static selectTodoOne = async (req: Request, res: Response): Promise<Response<JSON>> => {
    try {
      const id: number = parseInt(req.params.id as string);
      if (!TodoService.checkTodo(id)) {
        return res.status(404).json({
          stastusCode: '404',
          message: 'Todo 를 찾을 수 없습니다.',
        });
      }
      const todo = await TodoService.getTodoOne(id);
      return res.status(200).json({ statusCode: '200', todo: todo });
    } catch (error) {
      res.status(500).json({
        statusCode: '500',
        message: '알 수 없는 에러가 발생했습니다 다시 시도해주세요!',
      });
    }
  };

  // 할 일 수정 API
  static updateTodo = async (req: Request, res: Response): Promise<Response<JSON>> => {
    try {
      const id: number = parseInt(req.params.id as string);
      const todoDto: RequestTodoDto = req.body;

      const flag = await TodoService.checkTodo(id);

      if (!flag.checkId) {
        return res.status(404).json({
          stastusCode: '404',
          message: 'Todo 를 찾을 수 없습니다!',
        });
      } else if (!flag.checkStatus) {
        return res.status(400).json({
          stastusCode: '404',
          message: '완료 된 Todo는 수정할 수 없습니다!',
        });
      } else {
        const todo: Todo = await TodoService.modifyTodo(id, todoDto);
        return res.status(200).json({ statusCode: '200', todo: todo });
      }
    } catch (error) {
      res.status(500).json({
        statusCode: '500',
        message: '알 수 없는 에러가 발생했습니다 다시 시도해주세요!',
      });
    }
  };
  // 할 일 삭제 API
  static deleteTodo = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: number = parseInt(req.params.id as string);

      const flag = await TodoService.checkTodo(id);

      if (!flag.checkId) {
        return res.status(404).json({
          stastusCode: '404',
          message: 'Todo 를 찾을 수 없습니다!',
        });
      } else if (!flag.checkStatus) {
        return res.status(400).json({
          stastusCode: '404',
          message: '완료 된 Todo는 삭제할 수 없습니다!',
        });
      } else {
        const delete_result = await TodoService.removeTodo(id);

        return res.status(204).json(delete_result);
      }
    } catch (error) {
      res.status(500).json({
        statusCode: '500',
        message: '알 수 없는 에러가 발생했습니다 다시 시도해주세요!',
      });
    }
  };
}

export default TodoController;
