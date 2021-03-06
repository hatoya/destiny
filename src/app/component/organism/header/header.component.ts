import { Component, OnInit } from '@angular/core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public state: StateService) {
    library.add(faPaperPlane)
  }

  ngOnInit() {
  }

  switchNavigation() {
    this.state.is_navigation = !this.state.is_navigation
  }

}