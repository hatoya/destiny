import { Observable } from 'rxjs/Observable'
import { Component, OnInit } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public clan: any = {}
  public members: any[] = []
  public contents: any
  public target: string = 'gg'
  public order: string = 'desc'

  constructor(private fireStore: AngularFirestore, public state: StateService, private api: ApiService) {
    this.state.heading = 'Dashboard'
  }

  ngOnInit() {
    Observable.merge(this.api.getClanMembers('2027026'), this.api.getPlayer('4611686018434797507')).subscribe({
      next: content => Object.keys(content).map(value => this.members.push(content[value])),
      complete: () => {
        this.state.is_load = false
        this.getElo()
        this.getRatio()
        this.getDiff()
      }
    })
  }

  getElo() {
    this.members.map(member => {
      member['gg'] = member['stats'][39] ? member['stats'][39]['elo'] : 0
      this.api.getTrackerElo(member['member']['destinyUserInfo']['membershipId']).subscribe(elo => member['tracker'] = elo)
    })
  }

  getRatio() {
    this.members.map(member => {
      member['kd'] = member['stats'][39] ? member['stats'][39]['kills'] / member['stats'][39]['deaths'] : 0
      member['kda'] = member['stats'][39] ? (member['stats'][39]['kills'] + member['stats'][39]['assists']) / member['stats'][39]['deaths'] : 0
    })
  }

  getDiff() {
    this.members.map(member => {
      this.fireStore.collection('user').valueChanges().subscribe(users => {
        const diff: any = users.filter(user => user['name'] === member.member.destinyUserInfo.displayName)[0]
        member['diff'] = {
          gg: parseInt(member.gg) - parseInt(diff['nine']['elo']['gg']),
          tracker: parseInt(member.tracker) - parseInt(diff['nine']['elo']['tracker'])
        }
      })
    })
    console.log(this.members)
  }

  changeOrder(target: string) {
    this.order = this.target === target && this.order === 'desc' ? 'asc' : 'desc'
    this.target = target
  }

  save() {
    this.members.forEach(member => {
      this.fireStore.collection('user').doc(member.member.destinyUserInfo.displayName).set({name: member.member.destinyUserInfo.displayName, nine: {elo: {gg: member.gg, tracker: member.tracker}, ratio: {kd: member.kd, kda: member.kda}}})
    })
  }

}