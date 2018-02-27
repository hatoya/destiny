import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { MetaService } from '../../../service/meta.service'
import { Player } from '../../../model/player.model'
import { Stat } from '../../../model/stat.model'

@Component({
  selector: 'app-player-index',
  templateUrl: './player-index.component.html',
  styleUrls: ['./player-index.component.scss']
})
export class PlayerIndexComponent implements OnInit {

  public player: Player = new Player
  public kill: number = 0
  public death: number = 0
  public assist: number = 0

  constructor(public state: StateService, private api: ApiService, private meta: MetaService) { }

  ngOnInit() {
    this.player.id = this.state.url.split('/')[2]
    this.api.getGg(this.player.id).subscribe(content => {
      this.player.name = content['player']['name']
      this.state.is_load = false
      this.state.heading = this.player.name
      this.meta.setTitle(this.player.name + ' | Player')
      content['player']['stats'].forEach(mode => {
        let stat = new Stat
        stat.elo_gg = mode['elo']
        stat.rank_gg = content['playerRanks'][mode['mode']]
        this.kill += mode['kills']
        this.death += mode['deaths']
        this.assist += mode['assists']
        this.player.stats[mode['mode']] = stat
      })
      this.getGgDiff()
      this.getTracker()
    })
  }

  getGgDiff() {
    this.api.getGgHistory(this.player.id, this.state.start, this.state.end).flatMap(content => content).subscribe(content => {
      this.player.stats[content['mode']].diff_gg = this.player.stats[content['mode']].elo_gg - content['elo']
    })
  }

  getTracker() {
    this.api.getTracker(this.player.id).flatMap(content => content).subscribe(content => this.player.stats[content['mode']].rank_tracker = content['playerank']['rank'])
    this.state.modes.forEach(mode => {
      this.api.getTrackerHistory(this.player.id, mode.id).map(content => content['data']).subscribe(contents => {
        const battles = contents.filter(battle => new Date(battle['period']).getTime() >= this.state.start.getTime() && new Date(battle['period']).getTime() <= this.state.end.getTime())
        this.player.stats[mode.id].elo_tracker = contents[contents.length - 1]['currentElo']
        if (battles.length) this.player.stats[mode.id].diff_tracker = this.player.stats[mode.id].elo_tracker - battles[battles.length - 1]['currentElo']
      })
    })
  }

}