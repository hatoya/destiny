import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { Player } from '../../../model/player.model'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public clan: any = {}
  public members: Player[] = []
  public contents: any
  public target: string = 'elo_gg'
  public order: string = 'desc'
  public fireSubscription: Subscription

  constructor(public state: StateService, private api: ApiService) {
    this.state.heading = 'Dashboard'
  }

  ngOnInit() {
    Observable.merge(this.api.getClanMembers('2027026'), this.api.getPlayer('4611686018434797507')).subscribe({
      next: content => this.members.push(content),
      error: () => {
        this.state.is_load = false
        if (!this.state.errors.includes('GurdianGG API is dead.')) this.state.errors.push('GurdianGG API is dead.')
      },
      complete: () => {
        this.state.is_load = false
        this.sort()
        this.getGgElo()
        this.getTrackerElo()
      }
    })
  }

  ngOnDestroy() {
    this.fireSubscription.unsubscribe()
  }

  sort() {
    this.members = this.members.sort((member1, member2) => (member1[this.target] < member2[this.target] ? 1 : -1) * (this.order === 'desc' ? 1 : -1))
  }

  getGgElo() {
    this.members.filter(member => member.elo_gg >= 1700).map(member => {
      this.api.getPlayer(member.id).subscribe({
        next: content => {
          member.rank_gg = content.rank_gg
        },
        complete: () => member
      })
    })
  }

  getTrackerElo() {
    this.members.map(member => {
      this.api.getTracker(member.id).subscribe({
        next: content => {
          member.elo_tracker = content.length ? (content[0]['currentElo'] ? content[0]['currentElo'] : 0) : 0
          member.rank_tracker = content.length ? (content[0]['playerank']['rank'] ? content[0]['playerank']['rank'] : 0) : 0
        },
        error: () => {
          if (!this.state.errors.includes('Tracker API is dead.')) this.state.errors.push('Tracker API is dead.')
        },
        complete: () => this.getDiff()
      })
    })
  }

  getDiff() {
    this.fireSubscription = this.api.getFireUsers().flatMap(user => user).subscribe({
      next: user => {
        this.members.filter(member => member.name === user['name']).map(member => {
          member.diff_gg = member.elo_gg - user['elo_gg']
          member.diff_tracker = member.elo_tracker - user['elo_tracker']
        })
      },
      complete: () => console.log('complete')
    })
  }

  changeOrder(target: string) {
    this.order = this.target === target && this.order === 'desc' ? 'asc' : 'desc'
    this.target = target
    this.sort()
  }

  save() {
    this.members.forEach(member => this.api.setFireUsers(member))
  }

}