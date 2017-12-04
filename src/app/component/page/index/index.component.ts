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
      }
    })
  }

  getGgElo() {
    this.members.map(member => member)
  }

  getTrackerElo() {
    this.members.map(member => {
      this.api.getTrackerElo(member.id).subscribe(elo => member.elo_tracker = elo)
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