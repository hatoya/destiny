import { Observable } from 'rxjs/Observable'
import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { MetaService } from '../../../service/meta.service'
import { Player } from '../../../model/player.model'
import { Graph } from '../../../model/graph.mode'
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
  public stats: any[][] = []
  public size: any = {
    x: {
      max: 0,
      min: 0
    },
    y: {
      max: 0,
      min: 0
    }
  }
  public points: string[] = []
  public graph: Graph[] = []

  constructor(public state: StateService, private api: ApiService, private meta: MetaService) { }

  ngOnInit() {
    this.size.x.max = this.state.today.getTime() / 1000000
    this.size.x.min = this.state.start.getTime() / 1000000
    this.player.id = this.state.url.split('/')[2]
    this.state.modes.forEach(mode => {
      this.player.stats[mode.id] = new Stat
      this.graph[mode.id] = new Graph
    })
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
    Observable.merge(this.state.modes.map(mode => this.api.getGgHistory(this.player.id, mode.id, this.state.start, this.state.today))).flatMap(content => content).subscribe({
      next: contents => {
        let pastStat: any
        contents.filter(content => new Date(content['date']).getTime() <= this.state.end.getTime()).map(content => pastStat = content)
        contents.map(content => {
          let stat: Stat = new Stat
          stat.date = new Date(content['date'])
          stat.elo_gg = content['elo']
          if (pastStat) stat.diff_gg = this.player.stats[content['mode']].elo_gg - pastStat['elo']
          this.player.stats[content['mode']] = stat
          if (!this.graph[content['mode']]) this.graph[content['mode']] = new Graph
          this.graph[content['mode']].stats.push(stat)
        })
      },
      complete: () => {
        this.graph.map(content => {
          content.stats.map(stat => {
            if (this.size.y.max < stat.elo_gg) this.size.y.max = stat.elo_gg
            if (this.size.y.min > stat.elo_gg || this.size.y.min === 0) this.size.y.min = stat.elo_gg
          })
        })
        this.graph.map(content => content.point = content.stats.map(stat => [(stat.date.getTime() / 1000000) - this.size.x.min, this.size.y.max - stat.elo_gg]).join(' '))
      }
    })
  }

  getTracker() {
    this.api.getTracker(this.player.id).flatMap(content => content).subscribe(content => {
      if (content['playerank']) this.player.stats[content['mode']].rank_tracker = content['playerank']['rank']
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