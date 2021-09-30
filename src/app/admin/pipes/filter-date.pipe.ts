import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { ToDoDto } from 'src/app/models/toDoDto';

@Pipe({
  name: 'filterDate',
})
export class FilterDatePipe implements PipeTransform {
  transform(value: Date | undefined, ...args: unknown[]): unknown {
    if (value != undefined) {
      let myMoment: moment.Moment = moment(value).locale('tr');
      return myMoment.format('DD MMM YYYY');
    } else {
      return '';
    }
  }
}
