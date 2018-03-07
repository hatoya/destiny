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
  public clan: string = ''
  public kill: number = 0
  public death: number = 0
  public assist: number = 0

  constructor(public state: StateService, private api: ApiService, private meta: MetaService) { }

  ngOnInit() {
    this.player.id = this.state.url.split('/')[2]
    this.state.modes.forEach(mode => this.player.stats[mode.id] = new Stat)
    this.getPlayer()
    this.getGg()
    this.getTracker()
  }

  getPlayer() {
    this.api.getProfile(this.player.id).subscribe({
      next: content => {
        this.state.is_load = false
        this.player.name = content['userInfo']['displayName']
        this.meta.setTitle(this.player.name + ' | Player')
      },
      complete: () => this.api.getClanForMember(this.player.id).subscribe(content => this.state.heading = this.player.name + ' [' + content['group']['clanInfo']['clanCallsign'] + ']')
    })
  }

  getGg() {
    this.state.modes.forEach(mode => {
      let past: any
      this.api.getGgHistory(this.player.id, mode.id, this.state.start, this.state.today).flatMap(content => content).subscribe(content => {
        if (new Date(content['date']).getTime() <= this.state.end.getTime()) past = content
        this.player.stats[mode.id].elo_gg = content['elo']
        this.player.stats[mode.id].diff_gg = this.player.stats[mode.id].elo_gg - past['elo']
      })
    })
  }

  getTracker() {
    this.api.getTracker(this.player.id).flatMap(content => content).filter(content => content['playerank']).subscribe(content => {
      this.player.stats[content['mode']].rank_tracker = content['playerank']['rank']
      this.kill += content['kills']
      this.death += content['deaths']
      this.assist += content['assists']
    })
    this.state.modes.forEach(mode => {
      this.api.getTrackerHistory(this.player.id, mode.id).map(content => content['data']).filter(contents => contents.length).subscribe(contents => {
        const battles = contents.filter(battle => new Date(battle['period']).getTime() >= this.state.start.getTime() && new Date(battle['period']).getTime() <= this.state.end.getTime())
        this.player.stats[mode.id].elo_tracker = contents[contents.length - 1]['currentElo']
        if (battles.length) this.player.stats[mode.id].diff_tracker = this.player.stats[mode.id].elo_tracker - battles[battles.length - 1]['currentElo']
      })
    })
  }

}