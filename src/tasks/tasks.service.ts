import { Injectable } from '@nestjs/common';
import type { Task } from './task.model';
import type { CreateTaskDto } from './dto/create-task.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public findAll(): Task[] {
    return this.tasks;
  }

  public findOne(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  public create(taskDto: CreateTaskDto): Task {
    const task: Task = {
      id: randomUUID(),
      ...taskDto,
    };

    this.tasks.push(task);
    return task;
  }

  public deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id != id);
  }
}
