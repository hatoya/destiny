import { Observable } from 'rxjs/Observable'
import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
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

  constructor(private fireStore: AngularFirestore, public state: StateService, private api: ApiService) {
    this.state.heading = 'Dashboard'
  }

  ngOnInit() {
    Observable.merge(this.api.getClanMembers('2027026'), this.api.getPlayer('4611686018434797507')).subscribe({
      next: content => this.members.push(content),
      complete: () => {
        this.state.is_load = false
        this.getGgElo()
        this.getTrackerElo()
        this.getDiff()
      }
    })
  }

  getGgElo() {
    this.members.filter(member => member.elo_gg >= 1700).map(member => {
      this.api.getPlayer(member.id).subscribe(content => {
        member.rank_gg = content.rank_gg
      })
      return member
    })
  }

  getTrackerElo() {
    this.members.map(member => {
      this.api.getTracker(member.id).subscribe(content => {
        member.elo_tracker = content.length ? (content[0]['currentElo'] ? content[0]['currentElo'] : 0) : 0
        member.rank_tracker = content.length ? (content[0]['playerank']['rank'] ? content[0]['playerank']['rank'] : 0) : 0
      })
    })
  }

  getDiff() {
    this.members.map(member => {
      this.fireStore.collection('user').valueChanges().subscribe(users => {
        const diff: any = users.filter(user => user['name'] === member.name)[0]
        member.diff_gg = member.elo_gg - diff['nine']['elo']['gg']
        member.diff_tracker = member.elo_tracker - parseInt(diff['nine']['elo']['tracker'])
      })
    })
  }

  changeOrder(target: string) {
    this.order = this.target === target && this.order === 'desc' ? 'asc' : 'desc'
    this.target = target
  }

  save() {
    this.members.forEach(member => {
      this.fireStore.collection('user').doc(member.name).set({name: member.name, nine: {elo: {gg: member.elo_gg, tracker: member.elo_tracker}, ratio: {kd: member.kd, kda: member.kda}}})
    })
  }

}