import { Component, OnInit } from '@angular/core'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'organism-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public state: StateService) { }

  ngOnInit() {
  }

}