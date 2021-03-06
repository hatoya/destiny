import { Subscription, merge } from 'rxjs'
import { map, mergeMap, filter, share, partition, tap } from 'rxjs/operators'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { MetaService } from '../../../service/meta.service'
import { Player } from '../../../model/player.model'
import { Stat } from '../../../model/stat.model'
import { Bread } from '../../../model/bread.model'
import { Progress } from '../../../model/progress.model';

@Component({
  selector: 'app-clan-index',
  templateUrl: './clan-index.component.html',
  styleUrls: ['./clan-index.component.scss']
})
export class ClanIndexComponent implements OnInit {

  routerSubscription: Subscription = new Subscription
  formGroup: FormGroup
  id: string = ''
  clan: any = {}
  members: Player[] = []
  mode_id: number = 39
  target: string = 'elo_gg'
  order: string = 'desc'
  breads: Bread[] = []

  constructor(private formBuilder: FormBuilder, private router: Router, public state: StateService, private api: ApiService, private meta: MetaService) {
    library.add(faSortUp, faSortDown)
    this.formGroup = this.formBuilder.group({mode: [this.mode_id, []]})
  }

  ngOnInit() {
    this.init()
    this.routerSubscription = this.state.routerObserver$.subscribe(event => this.init())
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe()
  }

  init() {
    this.id = location.pathname.split('/')[2]
    this.target = 'elo_gg'
    this.api.getClan(this.id).pipe(tap(() => this.state.heading = ''), map(content => content['Response']['detail'])).subscribe({
      next: content => {
        this.meta.setTitle(content['name'] + ' | Clan')
        this.meta.setDescription('Tracking ' + content['name'] + ' Clan\'s Tracker elo and GG elo in Destiny2.')
        this.breads = [{ title: content['name'] + ' [' + content['clanInfo']['clanCallsign'] + ']', url: ['/', 'clan', this.id] }]
      },
      error: error => console.log(error),
      complete: () => this.state.postGoogle()
    })
    this.api.getClanMembers(this.id).pipe(tap(() => this.members = []), map(content => Object.keys(content).map(value => content[value])), mergeMap(member => member)).subscribe({
      next: content => {
        let player: Player = new Player({ id: content['member']['destinyUserInfo']['membershipId'], name: content['member']['destinyUserInfo']['displayName'] })
        this.state.modes.map(mode => {
          const target = content['stats'][mode.id]
          let stat: Stat = new Stat
          if (target) {
            stat.elo_gg = target['elo']
            stat.kd = target['kills'] / target['deaths']
            stat.kda = (target['kills'] + (target['assists'] / 2)) / target['deaths']
            stat.kad = (target['kills'] + target['assists']) / target['deaths']
            stat.match = target['gamesPlayed']
            stat.win = target['wins']
          }
          player.stats[mode.id] = stat
        })
        this.members.push(player)
      },
      error: () => this.state.is_load = false,
      complete: () => {
        this.state.is_load = false
        this.getStep()
        this.changeMode()
      }
    })
  }

  sort() {
    this.members = this.members.sort((member1, member2) => {
      if (this.target === 'glory' || this.target === 'valor') {
        return (member1[this.target].currentProgress < member2[this.target].currentProgress ? 1 : -1) * (this.order === 'desc' ? 1 : -1)
      } else {
        return (member1.stats[this.mode_id][this.target] < member2.stats[this.mode_id][this.target] ? 1 : -1) * (this.order === 'desc' ? 1 : -1)
      }
    })
  }

  getDiff() {
    this.members.map(member => {
      const [past_battles, latest_battles] = partition(content => new Date(content['date']).getTime() <= this.state.end.getTime())(this.api.getGgHistory(member.id, 0, this.state.start, this.state.today).pipe(mergeMap(content => content), filter(content => content['mode'] === Number(this.mode_id)), share()))
      past_battles.subscribe(content => member.stats[this.mode_id].diff_gg = member.stats[this.mode_id].elo_gg - content['elo'])
      latest_battles.subscribe(content => {
        member.stats[this.mode_id].diff_match += content['gamesPlayed']
        member.stats[this.mode_id].diff_win += content['wins']
      })
      this.api.getTrackerHistory(member.id, this.mode_id).pipe(filter(content => content['data'].length), map(content => content['data'])).subscribe(contents => {
        const battles = contents.filter(battle => new Date(battle['period']).getTime() >= this.state.start.getTime() && new Date(battle['period']).getTime() <= this.state.end.getTime())
        member.stats[this.mode_id].elo_tracker = contents[contents.length - 1]['currentElo']
        if (battles.length) member.stats[this.mode_id].diff_tracker = contents[contents.length - 1]['currentElo'] - battles[battles.length - 1]['currentElo']
        if (member.stats[this.mode_id].elo_tracker >= 1700) this.api.getTracker(member.id).pipe(map(content => Object.keys(content).map(value => content[value]).filter(stat => stat['mode'] === 39)), mergeMap(content => content), filter(content => content['playerank'])).subscribe(content => member.stats[this.mode_id].rank_tracker = content['playerank']['rank'])
      })
    })
  }

  getGgRank() {
    this.members.filter(member => member.stats[this.mode_id].elo_gg >= 1700).map(member => {
      this.api.getGg(member.id).subscribe({
        next: content => member.stats[this.mode_id].rank_gg = content['playerRanks'][this.mode_id],
        complete: () => member
      })
    })
  }

  getStep() {
    this.members.map(member => {
      this.api.getProgress(member.id).subscribe(content => {
        member.glory = new Progress(content['2679551909'])
        member.valor = new Progress(content['3882308435'])
      })
    })
  }

  changeOrder(target: string) {
    this.order = this.target === target && this.order === 'desc' ? 'asc' : 'desc'
    this.target = target
    this.sort()
  }

  changeMode() {
    this.sort()
    this.getDiff()
    this.getGgRank()
  }

}