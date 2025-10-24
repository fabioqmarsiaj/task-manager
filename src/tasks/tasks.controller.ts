import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindOneParams } from './dto/find-one.params';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Get('/:id')
  public findOne(@Param() params: FindOneParams): Task {
    const task = this.tasksService.findOne(params.id);

    if (task) {
      return task;
    }

    throw new NotFoundException();
  }

  @Post()
  public create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }
}
