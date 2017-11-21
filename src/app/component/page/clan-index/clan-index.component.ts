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
    this.api.getClanMembers('2027026').do(content => console.log(content['Response']['results'])).subscribe({
      next: content => {
        content['Response']['results'].map(member => {
          this.api.getGGElo(member['destinyUserInfo']['membershipId']).subscribe(content => {
            member['nine'] = content['player']['stats'] ? (content['player']['stats'].filter(stat => stat['mode'] === 39).length ? content['player']['stats'].filter(stat => stat['mode'] === 39)[0] : {}) : {}
            this.members.push(member)
          })
        })
      },
      complete: () => this.state.is_load = false
    })
  }

}