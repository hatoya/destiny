import { Component, OnInit } from '@angular/core'
import { library } from '@fortawesome/fontawesome'
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid/shakable'
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