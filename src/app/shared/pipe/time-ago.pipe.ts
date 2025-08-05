import { Pipe, PipeTransform } from '@angular/core';
import  moment from 'moment';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date): string {
    return moment(value).fromNow();
  }
}
