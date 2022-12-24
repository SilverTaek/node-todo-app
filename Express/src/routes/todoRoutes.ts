import { Router } from 'express';
import TodoController from '../controllers/TodoController';
import {
  validateUpdateFunction,
  validateGetTodosFunction,
  validateCreateFunction,
  validateGetTodoFunction,
  validateDeleteFunction,
} from '../common/validator/validatorFunction';
const router: Router = Router();

router.post('/', validateCreateFunction, TodoController.createTodo);
router.get('/', validateGetTodosFunction, TodoController.selectTodos);
router.get('/:id', validateGetTodoFunction, TodoController.selectTodoOne);
router.put('/:id', validateUpdateFunction, TodoController.updateTodo);
router.delete('/:id', validateDeleteFunction, TodoController.deleteTodo);

export default router;
