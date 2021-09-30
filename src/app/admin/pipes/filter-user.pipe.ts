import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/models/user';

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {

  transform(value: User[], filterText:string) :User[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:User)=>c.fullName.toLocaleLowerCase().indexOf(filterText)!==-1):value
  }

}
