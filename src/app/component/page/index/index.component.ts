import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private state: StateService) {
    this.state.heading = 'Dashboard'
  }

  ngOnInit() {
  }

}