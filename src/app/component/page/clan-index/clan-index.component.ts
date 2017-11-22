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
      next: content => {
        const contents: any[] = Object.keys(content).map(value => content[value])
        this.members = contents
      },
      complete: () => {
        this.state.is_load = false
        this.getElo()
      }
    })
  }

  getElo() {
    // this.members.map(member => this.api.getElo(member).subscribe(elo => member['elo'] = elo))
  }

  sortMembers() {
    this.members.sort((member1, member2) => 1)
  }

}