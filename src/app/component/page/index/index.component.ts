import { Observable } from 'rxjs/Observable'
import { Component, OnInit } from '@angular/core'
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

  constructor(public state: StateService, private api: ApiService) {
    this.state.heading = 'Dashboard'
  }

  ngOnInit() {
    this.api.getClanMembers('2027026').subscribe({
      next: content => this.members = Object.keys(content).map(value => content[value]),
      complete: () => {
        this.state.is_load = false
        this.getElo()
        this.getRatio()
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

  changeOrder(target: string) {
    this.order = this.target === target && this.order === 'desc' ? 'asc' : 'desc'
    this.target = target
  }

}