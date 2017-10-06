import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'

@Component({
  selector: 'app-clan-index',
  templateUrl: './clan-index.component.html',
  styleUrls: ['./clan-index.component.scss']
})
export class ClanIndexComponent implements OnInit {

  public clan: any = {}
  public members: any[] = []

  constructor(public state: StateService, private api: ApiService) {
    this.state.heading = 'Clan'
  }

  ngOnInit() {
    this.api.getClan('1851423').subscribe({
      next: content => this.clan = content['Response']['detail'],
      complete: () => this.state.is_load = false
    })
    this.api.getClanMembers('1851423').do(content => console.log(content['Response']['results'])).subscribe(content => this.members = content['Response']['results'])
  }

}