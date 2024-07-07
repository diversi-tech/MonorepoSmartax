import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../_models/task.module';

@Pipe({
    name: 'taskFilter',
    standalone: true
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: Task[], filter: any): Task[] {
    if (!tasks || !filter) {
      return tasks;
    }

    return tasks.filter(task => {
      const withinDeadline = !filter.deadlineRange || 
        (filter.deadlineRange[0] && filter.deadlineRange[1] &&
        new Date(task.dueDate).getTime() >= new Date(filter.deadlineRange[0]).getTime() && 
        new Date(task.dueDate).getTime() <= new Date(filter.deadlineRange[1]).getTime());
    
      const matchesClient = !filter.client || (task.client && task.client.name === filter.client.name);
    
      const matchesUser = !filter.user || (task.assignedTo && task.assignedTo.userName === filter.user.userName);
    
      const matchesTaskName = !filter.taskName || task.taskName.toLowerCase().includes(filter.taskName.toLowerCase());
    
      const matchesTag = !filter.tag || (task.tags && task.tags.some(tag => tag.text === filter.tag.name));
    
      return withinDeadline && matchesClient && matchesUser && matchesTaskName && matchesTag;
    });
  }
}
