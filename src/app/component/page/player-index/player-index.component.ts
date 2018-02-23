import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'app-player-index',
  templateUrl: './player-index.component.html',
  styleUrls: ['./player-index.component.scss']
})
export class PlayerIndexComponent implements OnInit {

  constructor(public state: StateService) { }

  ngOnInit() {
    this.state.is_load = false
  }

}