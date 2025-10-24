import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindOneParams } from './dto/find-one.params';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get('/:id')
  public findOne(@Param() params: FindOneParams): Task {
    return this.findOneOrFail(params.id);
  }

  @Post()
  public create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param() params: FindOneParams,
    @Body() body: UpdateTaskStatusDto,
  ): Task {
    const task = this.findOneOrFail(params.id);
    task.status = body.status;
    return task;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteTask(@Param() params: FindOneParams): void {
    const task = this.findOneOrFail(params.id);
    this.tasksService.deleteTask(task.id);
  }

  private findOneOrFail(id: string): Task {
    const task = this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }
}
