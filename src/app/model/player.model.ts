import { Stat } from './stat.model'
import { Progress } from './progress.model'

export class Player {

  id: string = ''
  name: string = ''
  valor?: Progress = new Progress
  glory?: Progress = new Progress
  stats?: Stat[] = []

  constructor(player?: Player) {
    Object.assign(this, player)
    if (player) {
      if (player.valor) this.valor = new Progress(player.valor)
      if (player.glory) this.glory = new Progress(player.glory)
    }
  }

}