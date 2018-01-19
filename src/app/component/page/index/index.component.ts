import { Component, OnInit, OnDestroy } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(public state: StateService, private api: ApiService) {
    this.state.heading = '084Z'
    this.api.postClanSearch().subscribe(content => console.log(content))
  }

  ngOnInit() {
    this.state.is_load = false
  }

}