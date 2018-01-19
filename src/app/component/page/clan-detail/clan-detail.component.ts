import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { Player } from '../../../model/player.model'

@Component({
  selector: 'app-clan-detail',
  templateUrl: './clan-detail.component.html',
  styleUrls: ['./clan-detail.component.scss']
})
export class ClanDetailComponent implements OnInit {

  public id: string = ''
  public clan: any = {}
  public members: Player[] = []
  public contents: any
  public target: string = 'elo_gg'
  public order: string = 'desc'
  public fireSubscription: Subscription = new Subscription
  public today: Date = new Date()
  public start: Date
  public end: Date

  constructor(public state: StateService, private api: ApiService) {
    this.id = location.pathname.split('/')[2]
    this.start = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate())
    this.end = this.today.getDay() < 5 ? new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 3 - this.today.getDay()) : new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 4 - this.today.getDay())
  }

  ngOnInit() {
    this.api.getClan(this.id).subscribe(content => this.state.heading = content['Response']['detail']['name'])
    this.api.getClanMembers(this.id).subscribe({
      next: content => this.members.push(content),
      error: () => {
        this.state.is_load = false
        if (!this.state.errors.includes('GurdianGG API is dead.')) this.state.errors.push('GurdianGG API is dead.')
      },
      complete: () => {
        this.state.is_load = false
        this.sort()
        this.getDiff()
        this.getRank()
      }
    })
  }

  ngOnDestroy() {
    this.fireSubscription.unsubscribe()
  }

  sort() {
    this.members = this.members.sort((member1, member2) => (member1[this.target] < member2[this.target] ? 1 : -1) * (this.order === 'desc' ? 1 : -1))
  }

  getDiff() {
    this.members.map(member => {
      const [past_battles, latest_battles] = this.api.getGgHistory(member.id, this.start, this.today).flatMap(content => content).filter(content => content['mode'] === 39).share().partition(content => new Date(content['date']).getTime() <= this.end.getTime())
      past_battles.subscribe(content => member.diff_gg = member.elo_gg - content['elo'])
      latest_battles.subscribe(content => member.diff_match += content['gamesPlayed'])
      this.api.getTrackerHistory(member.id).filter(content => content['data'].length).map(content => content['data']).subscribe(contents => {
        const battles = contents.filter(battle => new Date(battle['period']).getTime() >= this.start.getTime() && new Date(battle['period']).getTime() <= this.end.getTime())
        member.elo_tracker = contents[contents.length - 1]['currentElo']
        if (battles.length) member.diff_tracker = contents[contents.length - 1]['currentElo'] - battles[battles.length - 1]['currentElo']
      })
    })
  }

  getRank() {
    this.members.filter(member => member.elo_gg >= 1700).map(member => {
      this.api.getPlayer(member.id).subscribe({
        next: content => member.rank_gg = content.rank_gg,
        complete: () => member
      })
    })
  }

  changeOrder(target: string) {
    this.order = this.target === target && this.order === 'desc' ? 'asc' : 'desc'
    this.target = target
    this.sort()
  }

  save() {
    this.members.forEach(member => this.api.setFireUser(member))
  }

  season() {
    this.api.getFireUsers().flatMap(content => content).subscribe(user => {
      if (user['elo_tracker']) {
        user['elo_tracker'] = (user['elo_tracker'] + 1200) / 2
        this.api.setFireUser(user)
      }
    })
  }

}