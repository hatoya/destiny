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
  public today: Date = new Date()
  public start: Date = new Date()
  public end: Date = new Date()

  constructor(public state: StateService, private api: ApiService) {
    this.state.heading = 'Dashboard'
    if (this.today.getDay() < 5) {
      this.start = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 7 - 3 - this.today.getDay())
      this.end = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 3 - this.today.getDay())
    } else {
      this.start = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 3 - this.today.getDay())
      this.end = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 4 - this.today.getDay())
    }
  }

  ngOnInit() {
    Observable.merge(this.api.getClanMembers('2027026'), this.api.getPlayer('4611686018455158849')).subscribe({
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
        this.getDiff()
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
      this.api.getTrackerHistory(member.id).subscribe(content => {
        if (content['data'].length) member.elo_tracker = content['data'][content['data'].length - 1]['currentElo']
        if (content['data'].length > 1) {
          const contents = content['data'].filter(data => new Date(data['period']).getTime() >= this.start.getTime() && new Date(data['period']).getTime() <= this.end.getTime())
          if (contents.length) member.diff_tracker = content['data'][content['data'].length - 1]['currentElo'] - contents[contents.length - 1]['currentElo']
        }
      })
    })
  }

  getDiff() {
    this.members.map(member => {
      this.api.getGgHistory(member.id, this.start, this.end).subscribe(contents => {
        contents.filter(content => content['mode'] === 39).map(content => member.diff_gg = member.elo_gg - content['elo'])
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