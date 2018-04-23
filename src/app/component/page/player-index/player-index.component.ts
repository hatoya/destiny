import { Observable } from 'rxjs/Observable'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { MetaService } from '../../../service/meta.service'
import { Player } from '../../../model/player.model'
import { Stat } from '../../../model/stat.model'
import { Bread } from '../../../model/bread.model'
import { Activity } from '../../../model/activity.model'

@Component({
  selector: 'app-player-index',
  templateUrl: './player-index.component.html',
  styleUrls: ['./player-index.component.scss']
})
export class PlayerIndexComponent implements OnInit {

  public breads: Bread[] = []
  public player: Player = new Player
  public clan: string = ''
  public activities: Activity[] = []

  constructor(private router: Router, public state: StateService, private api: ApiService, private meta: MetaService) { }

  ngOnInit() {
    this.player.id = this.state.url.split('/')[2]
    this.state.modes.forEach(mode => {
      this.player.stats[mode.id] = new Stat
    })
    this.getPlayer()
    this.getActivity()
    this.getGgHistory()
    this.getTrackerHistory()
  }

  getPlayer() {
    this.api.getProfile(this.player.id).subscribe({
      next: content => {
        this.player.name = content['userInfo']['displayName']
        this.meta.setTitle(this.player.name + ' | Player')
        this.meta.setDescription('Tracking ' + this.player.name + '\'s Tracker elo and GG elo in Destiny2.')
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

  getActivity() {
    this.api.getTrackerActivities(this.player.id).flatMap(content => content).map(content => content['instanceId']).subscribe(activity_id => {
      this.getGgActivity(activity_id)
      // this.getTrackerActivity(activity_id)
    })
  }

  getGgHistory() {
    Observable.merge(this.state.modes.map(mode => this.api.getGgHistory(this.player.id, mode.id, this.state.start, this.state.today))).flatMap(content => content).subscribe(contents => {
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
      })
    })
  }

  getGgActivity(activity_id: string) {
    this.api.getGgActivity(activity_id).subscribe(content => {
      const player = content['pgcr']['entries'].filter(entry => entry['player']['destinyUserInfo']['membershipId'] === this.player.id)[0]
      this.activities.push(new Activity({ id: content['pgcr']['activityDetails']['instanceId'], date: new Date(content['pgcr']['period']), standing: player['standing'], mode: content['pgcr']['activityDetails']['mode'], mode_name: content['definitions']['activityMode']['displayProperties']['name'], location: content['definitions']['activity']['displayProperties']['name'], elo_gg: content['playerElos'][this.player.id], score: player['score']['basic']['value'], kill: player['values']['kills']['basic']['value'], assist: player['values']['assists']['basic']['value'], death: player['values']['deaths']['basic']['value'] }))
    })
  }

  getTrackerHistory() {
    this.api.getTracker(this.player.id).flatMap(content => content).filter(content => content['playerank']).subscribe(content => this.player.stats[content['mode']].rank_tracker = content['playerank']['rank'])
    this.state.modes.forEach(mode => {
      this.api.getTrackerHistory(this.player.id, mode.id).map(content => content['data']).filter(contents => contents.length).subscribe(contents => {
        const battles = contents.filter(battle => new Date(battle['period']).getTime() >= this.state.start.getTime() && new Date(battle['period']).getTime() <= this.state.end.getTime())
        this.player.stats[mode.id].elo_tracker = contents[contents.length - 1]['currentElo']
        if (battles.length) this.player.stats[mode.id].diff_tracker = this.player.stats[mode.id].elo_tracker - battles[battles.length - 1]['currentElo']
      })
    })
  }

  getTrackerActivity(activity_id: string) {
    this.api.getTrackerActivity(activity_id).subscribe(content => console.log(content))
  }

}