import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyDate',
  standalone: true,
})
export class EmptyDatePipe implements PipeTransform {
  transform(value: Date | null): Date | null {
    return value || null;
  }
}
