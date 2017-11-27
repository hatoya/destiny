import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'app-party-index',
  templateUrl: './party-index.component.html',
  styleUrls: ['./party-index.component.scss']
})
export class PartyIndexComponent implements OnInit {

  constructor(private state: StateService) {
    this.state.heading = 'Party'
  }

  ngOnInit() {
    this.state.is_load = false
  }

}