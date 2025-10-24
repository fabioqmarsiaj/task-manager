import { Injectable } from '@nestjs/common';
import type { Task } from './task.model';
import type { CreateTaskDto } from './dto/create-task.dto';
import { randomUUID } from 'crypto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

  public updateTask(task: Task, updateTaskDto: UpdateTaskDto): Task {
    Object.assign(task, updateTaskDto);
    return task;
  }

  public deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(
      (filteredTask) => filteredTask.id != task.id,
    );
  }
}
