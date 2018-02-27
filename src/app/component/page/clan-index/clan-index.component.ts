import { Subscription } from 'rxjs/Subscription'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { library } from '@fortawesome/fontawesome'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { faSortUp, faSortDown } from '@fortawesome/fontawesome-free-solid/shakable.es'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { MetaService } from '../../../service/meta.service'
import { Player } from '../../../model/player.model'
import { Stat } from '../../../model/stat.model'

@Component({
  selector: 'app-clan-index',
  templateUrl: './clan-index.component.html',
  styleUrls: ['./clan-index.component.scss']
})
export class ClanIndexComponent implements OnInit {

  public routerSubscription: Subscription
  public formGroup: FormGroup
  public id: string = ''
  public clan: any = {}
  public members: Player[] = []
  public mode_id: number = 39
  public target: string = 'elo_gg'
  public order: string = 'desc'

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
    this.state.heading = ''
    this.members = []
    this.id = location.pathname.split('/')[2]
    this.api.getClan(this.id).map(content => content['Response']['detail']).subscribe({
      next: content => {
        this.meta.setTitle(content['name'] + ' | Clan')
        this.state.heading = content['name'] + ' [' + content['clanInfo']['clanCallsign'] + ']'
      },
      error: error => console.log(error),
      complete: () => this.state.postGoogle()
    })
    this.api.getClanMembers(this.id).map(content => Object.keys(content).map(value => content[value])).flatMap(member => member).subscribe({
      next: content => {
        let player: Player = new Player(content['member']['destinyUserInfo']['membershipId'], content['member']['destinyUserInfo']['displayName'])
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
        this.changeMode()
      }
    })
  }

  sort() {
    this.members = this.members.sort((member1, member2) => (member1.stats[this.mode_id][this.target] < member2.stats[this.mode_id][this.target] ? 1 : -1) * (this.order === 'desc' ? 1 : -1))
  }

  getDiff() {
    this.members.map(member => {
      const [past_battles, latest_battles] = this.api.getGgHistory(member.id, this.state.start, this.state.today).flatMap(content => content).filter(content => content['mode'] === Number(this.mode_id)).share().partition(content => new Date(content['date']).getTime() <= this.state.end.getTime())
      past_battles.subscribe(content => member.stats[this.mode_id].diff_gg = member.stats[this.mode_id].elo_gg - content['elo'])
      latest_battles.subscribe(content => {
        member.stats[this.mode_id].diff_match += content['gamesPlayed']
        member.stats[this.mode_id].diff_win += content['wins']
      })
      this.api.getTrackerHistory(member.id, this.mode_id).filter(content => content['data'].length).map(content => content['data']).subscribe(contents => {
        const battles = contents.filter(battle => new Date(battle['period']).getTime() >= this.state.start.getTime() && new Date(battle['period']).getTime() <= this.state.end.getTime())
        member.stats[this.mode_id].elo_tracker = contents[contents.length - 1]['currentElo']
        if (battles.length) member.stats[this.mode_id].diff_tracker = contents[contents.length - 1]['currentElo'] - battles[battles.length - 1]['currentElo']
        if (member.stats[this.mode_id].elo_tracker >= 1700) this.api.getTracker(member.id).map(content => Object.keys(content).map(value => content[value]).filter(stat => stat['mode'] === 39)).flatMap(content => content).filter(content => content['playerank']).subscribe(content => member.stats[this.mode_id].rank_tracker = content['playerank']['rank'])
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