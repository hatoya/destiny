export class Activity {

  id: string = ''
  date: Date = new Date
  standing: number = 0
  mode: number = 0
  mode_name: string = ''
  location: string = ''
  elo_gg: number = 0
  elo_tracker?: number = 0
  score: number = 0
  kill: number = 0
  assist: number = 0
  death: number = 0

  constructor(activity?: Activity) {
    Object.assign(this, activity)
  }

}