import { Stat } from './stat.model'

export class Player {

  public id: string = ''
  public name: string = ''
  public stat: any = {}

  constructor(id?: string, name?: string) {
    this.id = id
    this.name = name
  }

}