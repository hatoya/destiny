import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'
import { MetaService } from '../../../service/meta.service'
import { Player } from '../../../model/player.model'

@Component({
  selector: 'app-player-index',
  templateUrl: './player-index.component.html',
  styleUrls: ['./player-index.component.scss']
})
export class PlayerIndexComponent implements OnInit {

  public player: Player = new Player

  constructor(public state: StateService, private api: ApiService, private meta: MetaService) { }

  ngOnInit() {
    this.player.id = this.state.url.split('/')[2]
    this.api.getGg(this.player.id).subscribe(content => {
      this.player.name = content['player']['name']
      this.state.is_load = false
      this.state.heading = this.player.name
      this.meta.setTitle(this.player.name)
    })
  }

}