import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'organism-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

  constructor(public state: StateService) { }

  ngOnInit() {
  }

}