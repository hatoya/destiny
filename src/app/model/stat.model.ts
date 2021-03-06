export class Stat {

  public date: Date = new Date
  public elo_gg: number = 0
  public elo_tracker: number = 0
  public diff_gg: number = 0
  public diff_tracker: number = 0
  public rank_gg: number = 0
  public rank_tracker: number = 0
  public kd: number = 0
  public kda: number = 0
  public kad: number = 0
  public match: number = 0
  public diff_match: number = 0
  public win: number = 0
  public diff_win: number = 0
  public kill: number = 0
  public assist: number = 0
  public death: number = 0

  constructor(stat?: Stat) {
    Object.assign(this, stat)
  }
}