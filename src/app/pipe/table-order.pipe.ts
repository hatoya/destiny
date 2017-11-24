import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'tableOrder',
  pure: false
})
export class TableOrderPipe implements PipeTransform {

  transform(contents: any[], target: string): any[] {
    return contents.sort((member1, member2) => member1[target] < member2[target] ? 1 : -1)
  }

}