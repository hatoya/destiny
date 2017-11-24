import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-clan-index',
  templateUrl: './clan-index.component.html',
  styleUrls: ['./clan-index.component.scss']
})
export class ClanIndexComponent implements OnInit {

  public clan: any = {}
  public members: any[] = []
  public contents: any

  constructor(public state: StateService, private api: ApiService) {
    this.state.heading = 'Clan'
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
      member['gg'] = member['stats'][39] ? member['stats'][39]['elo'] : 0,
      this.api.getTrackerElo(member['member']['destinyUserInfo']['membershipId']).subscribe(elo => member['tracker'] = elo)
    })
  }

  getRatio() {
    this.members.map(member => {
      member['ratio'] = {
        kd: member['stats'][39] ? member['stats'][39]['kills'] / member['stats'][39]['deaths'] : 0,
        kda: member['stats'][39] ? (member['stats'][39]['kills'] + member['stats'][39]['assists']) / member['stats'][39]['deaths'] : 0
      }
    })
  }

  sortMembers() {
    this.members.sort((member1, member2) => 1)
  }

}