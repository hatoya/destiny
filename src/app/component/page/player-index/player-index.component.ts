import { Observable } from 'rxjs/Observable'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { MetaService } from '../../../service/meta.service'
import { Player } from '../../../model/player.model'
import { Graph } from '../../../model/graph.mode'
import { Stat } from '../../../model/stat.model'
import { Bread } from '../../../model/bread.model'

@Component({
  selector: 'app-player-index',
  templateUrl: './player-index.component.html',
  styleUrls: ['./player-index.component.scss']
})
export class PlayerIndexComponent implements OnInit {

  public player: Player = new Player
  public clan: string = ''
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
  public breads: Bread[] = []

  constructor(private router: Router, public state: StateService, private api: ApiService, private meta: MetaService) { }

  ngOnInit() {
    this.size.x.max = this.state.today.getTime() / 5000000
    this.size.x.min = this.state.start.getTime() / 5000000
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
        this.player.name = content['userInfo']['displayName']
        this.meta.setTitle(this.player.name + ' | Player')
        this.state.postGoogle()
      },
      error: () => this.router.navigate(['/']),
      complete: () => this.api.getClanForMember(this.player.id).subscribe({
        next: content => this.breads = [{ title: content['group']['name'] + ' [' + content['group']['clanInfo']['clanCallsign'] + ']', url: ['/', 'clan', content['group']['groupId']] }, { title: this.player.name, url: ['/', 'player', this.player.id] }],
        error: () => this.state.is_load = false,
        complete: () => this.state.is_load = false
      })
    })
  }

  getGg() {
    Observable.merge(this.state.modes.map(mode => this.api.getGgHistory(this.player.id, mode.id, this.state.start, this.state.today))).flatMap(content => content).subscribe({
      next: contents => {
        let pastStat: any
        contents.filter(content => new Date(content['date']).getTime() <= this.state.end.getTime()).map(content => pastStat = content)
        contents.map(content => {
          this.player.stats[content['mode']].date = new Date(content['date'])
          this.player.stats[content['mode']].elo_gg = content['elo']
          this.player.stats[content['mode']].kill += content['kills']
          this.player.stats[content['mode']].death += content['deaths']
          this.player.stats[content['mode']].win += content['wins']
          this.player.stats[content['mode']].match += content['gamesPlayed']
          if (pastStat['mode']) this.player.stats[content['mode']].diff_gg = this.player.stats[content['mode']].elo_gg - pastStat['elo']
          if (!this.graph[content['mode']]) this.graph[content['mode']] = new Graph
          this.graph[content['mode']].stats.push(this.player.stats[content['mode']])
        })
      },
      complete: () => {
        this.graph.map(content => {
          content.stats.map(stat => {
            if (this.size.y.max < stat.elo_gg) this.size.y.max = stat.elo_gg
            if (this.size.y.min > stat.elo_gg || this.size.y.min === 0) this.size.y.min = stat.elo_gg
          })
        })
        this.graph.map(content => content.point = content.stats.map(stat => [(stat.date.getTime() / 5000000) - this.size.x.min, this.size.y.max - stat.elo_gg]).join(' '))
      }
    })
  }

  getTracker() {
    this.api.getTracker(this.player.id).flatMap(content => content).filter(content => content['playerank']).subscribe(content => this.player.stats[content['mode']].rank_tracker = content['playerank']['rank'])
    this.state.modes.forEach(mode => {
      this.api.getTrackerHistory(this.player.id, mode.id).map(content => content['data']).filter(contents => contents.length).subscribe(contents => {
        const battles = contents.filter(battle => new Date(battle['period']).getTime() >= this.state.start.getTime() && new Date(battle['period']).getTime() <= this.state.end.getTime())
        this.player.stats[mode.id].elo_tracker = contents[contents.length - 1]['currentElo']
        if (battles.length) this.player.stats[mode.id].diff_tracker = this.player.stats[mode.id].elo_tracker - battles[battles.length - 1]['currentElo']
      })
    })
  }

  getGraph() {

  }

}