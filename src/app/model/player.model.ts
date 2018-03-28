import { Stat } from './stat.model'

export class Player {

  public id: string = ''
  public name: string = ''
  public stats: Stat[] = []

  constructor(player?: Player) {
    Object.assign(this, player)
  }

}