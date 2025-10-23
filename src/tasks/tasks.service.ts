import { Injectable } from '@nestjs/common';
import type { Task } from './task.model';
import type { CreateTaskDto } from './dto/create-task.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(taskDto: CreateTaskDto): Task {
    const task: Task = {
      id: randomUUID(),
      ...taskDto,
    };

    this.tasks.push(task);
    return task;
  }
}
