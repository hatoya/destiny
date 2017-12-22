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
  public fireSubscription: Subscription = new Subscription

  constructor(public state: StateService, private api: ApiService) {
    this.state.heading = 'Dashboard'
  }

  ngOnInit() {
    Observable.merge(this.api.getClanMembers('2027026'), this.api.getPlayer('4611686018434797507'), this.api.getPlayer('4611686018455158849')).subscribe({
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
    Observable.merge(...this.members.map(member => this.api.getTracker(member.id))).filter(contents => contents.length).map(contents => contents[0]).subscribe({
      next: content => {
        this.members.filter(member => member.name === content['displayName']).map(member => {
          member.elo_tracker = content['currentElo'] ? content['currentElo'] : 0
          member.rank_tracker = content['playerank']['rank'] ? content['playerank']['rank'] : 0
        })
      },
      complete: () => this.getDiff()
    })
  }

  getDiff() {
    this.fireSubscription = this.api.getFireUsers().flatMap(user => user).subscribe(user => {
      this.members.filter(member => member.name === user['name']).map(member => {
        member.diff_gg = member.elo_gg - user['elo_gg']
        member.diff_tracker = member.elo_tracker - user['elo_tracker']
        member.diff_match = member.match - user['match']
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