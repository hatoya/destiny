import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'tableOrder',
  pure: false
})
export class TableOrderPipe implements PipeTransform {

  transform(contents: any[], option: any): any[] {
    return contents.sort((member1, member2) => (member1[option['target']] < member2[option['target']] ? 1 : -1) * (option['order'] === 'desc' ? 1 : -1))
  }

}