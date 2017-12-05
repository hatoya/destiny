export class Player {

  public id: string = ''
  public name: string = ''
  public elo_gg: number = 0
  public elo_tracker: number = 0
  public diff_gg: number = 0
  public diff_tracker: number = 0
  public rank_gg: number = 0
  public rank_tracker: number = 0
  public kd: number = 0
  public kda: number = 0
  public kad: number = 0

  constructor(id?: string, name?: string) {
    this.id = id
    this.name = name
  }

}