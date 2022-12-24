import { NextFunction, Request, Response } from 'express';
import moment = require('moment');

export function validateCreateFunction(req: Request, res: Response, next: NextFunction) {
  if (req.body.title == undefined) {
    res.status(400).json({ statusCode: '400', errorMessage: '제목은 필수로 입력해주세요!' });
  }
  if (req.body.priority == undefined) {
    res.status(400).json({ statusCode: '400', errorMessage: '우선 순위는 필수로 입력해주세요!' });
  } else {
    if (!Number(req.body.priority)) {
      res.status(400).json({ statusCode: '400', errorMessage: '우선 순위는 숫자여야 합니다!' });
    }
  }
  if (req.body.status !== undefined) {
    const status: string = req.body.status.toUpperCase();
    if (!(status === 'TODO' || status === 'IN_PROGRESS' || status === 'DONE')) {
      res.status(400).json({ statusCode: '400', errorMessage: '상태는 TODO / IN_PROGRESS / DONE 중 하나여야 합니다!' });
    }
  }

  if (req.body.deadline !== undefined && typeof req.body.deadline === 'string') {
    if (!moment(req.body.deadline, 'YYYY-MM-DD', true).isValid()) {
      return res
        .status(400)
        .json({ statusCode: '400', errorMessage: '마감일은 YYY-MM-DD 형식 또는 명확한 날짜를 입력해야 합니다!' });
    }
  }
  next();
}

export function validateGetTodosFunction(req: Request, res: Response, next: NextFunction) {
  const is_query_empty = Object.keys(req.query).length === 0;
  if (!is_query_empty) {
    if (req.query.priority !== undefined) {
      if (!Number(req.query.priority)) {
        res.status(400).json({ statusCode: '400', errorMessage: '우선 순위는 숫자여야 합니다!' });
      }
    }
    if (req.query.status !== undefined && typeof req.query.status === 'string') {
      const status: string = req.query.status.toUpperCase();
      if (!(status === 'TODO' || status === 'IN_PROGRESS' || status === 'DONE')) {
        res
          .status(400)
          .json({ statusCode: '400', errorMessage: '상태는 TODO / IN_PROGRESS / DONE 중 하나여야 합니다!' });
      }
    }

    if (req.query.deadline !== undefined && typeof req.query.deadline === 'string') {
      if (!moment(req.query.deadline, 'YYYY-MM-DD', true).isValid()) {
        return res
          .status(400)
          .json({ statusCode: '400', errorMessage: '마감일은 YYY-MM-DD 형식 또는 명확한 날짜를 입력해야 합니다!' });
      }
    }

    if (req.query.date_completed !== undefined && typeof req.query.date_completed === 'string') {
      if (!moment(req.query.date_completed, 'YYYY-MM-DD', true).isValid()) {
        return res
          .status(400)
          .json({ statusCode: '400', errorMessage: '완료일은 YYY-MM-DD 형식 또는 명확한 날짜를 입력해야 합니다!' });
      }
    }
    if (req.query.page !== undefined) {
      if (!Number(req.query.page)) {
        res.status(400).json({ statusCode: '400', errorMessage: 'page는 숫자여야 합니다!' });
      }
    }
    if (req.query.sort !== undefined && typeof req.query.sort === 'string') {
      const sort = req.query.sort.toUpperCase();
      if (sort !== ('ASC' || 'DESC')) {
        res.status(400).json({ statusCode: '400', errorMessage: '정렬은 ASC / DESC 형식이여야 합니다!' });
      }
    }
    if (req.query.take !== undefined) {
      if (!Number(req.query.take)) {
        res.status(400).json({ statusCode: '400', errorMessage: 'taek 값은 숫자여야 합니다!' });
      }
    }
  }
  next();
}

export function validateGetTodoFunction(req: Request, res: Response, next: NextFunction) {
  if (req.params.id === undefined) {
    res.status(400).json({ statusCode: '400', errorMessage: 'ID를 입력해주세요!' });
  } else {
    if (!Number(req.params.id)) {
      res.status(400).json({ statusCode: '400', errorMessage: 'ID는 숫자여야 합니다!' });
    }
  }
}

export function validateUpdateFunction(req: Request, res: Response, next: NextFunction) {
  if (req.params.id === undefined) {
    res.status(400).json({ statusCode: '400', errorMessage: 'ID를 입력해주세요!' });
  } else {
    if (!Number(req.params.id)) {
      res.status(400).json({ statusCode: '400', errorMessage: 'ID는 숫자여야 합니다!' });
    }
  }

  if (req.body.priority !== undefined) {
    if (!Number(req.body.priority)) {
      res.status(400).json({ statusCode: '400', errorMessage: '우선 순위는 숫자여야 합니다!' });
    }
  }
  if (req.body.status !== undefined) {
    const status: string = req.body.status.toUpperCase();
    if (!(status === 'TODO' || status === 'IN_PROGRESS' || status === 'DONE')) {
      res.status(400).json({ statusCode: '400', errorMessage: '상태는 TODO / IN_PROGRESS / DONE 중 하나여야 합니다!' });
    }
  }

  if (req.body.deadline !== undefined && typeof req.body.deadline === 'string') {
    if (!moment(req.body.deadline, 'YYYY-MM-DD', true).isValid()) {
      return res
        .status(400)
        .json({ statusCode: '400', errorMessage: '마감일은 YYY-MM-DD 형식 또는 명확한 날짜를 입력해야 합니다!' });
    }
  }
  next();
}

export function validateDeleteFunction(req: Request, res: Response, next: NextFunction) {
  if (req.params.id === undefined) {
    res.status(400).json({ statusCode: '400', errorMessage: 'ID를 입력해주세요!' });
  } else {
    if (!Number(req.params.id)) {
      res.status(400).json({ statusCode: '400', errorMessage: 'ID는 숫자여야 합니다!' });
    }
  }
  next();
}
