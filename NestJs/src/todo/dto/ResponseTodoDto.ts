import { IsOptional, IsString, Matches } from "class-validator";
import { TodoStatus } from "src/enum/Todo.enum";

export class ResponseTodoDto {
  @IsString()
  @IsOptional()
  readonly title: string;
  @IsOptional()
  status: TodoStatus;
  @IsOptional()
  priority: number;
  @IsOptional()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: "$property must be formatted as yyyy-mm-dd",
  })
  deadline: string;
  @IsOptional()
  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: "$property must be formatted as yyyy-mm-dd",
  })
  date_completed: string;
  @IsOptional()
  page: number;
  @IsOptional()
  take: number;
  @IsOptional()
  sort: string;
}
