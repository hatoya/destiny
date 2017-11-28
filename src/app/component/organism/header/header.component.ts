import { Component, OnInit } from '@angular/core';
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public state: StateService) { }

  ngOnInit() {
  }

  switchNavigation() {
    this.state.is_navigation = !this.state.is_navigation
  }

}
