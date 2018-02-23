import { Component, OnInit, Input } from '@angular/core'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'atom-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  constructor(public state: StateService) { }

  ngOnInit() {
  }

}