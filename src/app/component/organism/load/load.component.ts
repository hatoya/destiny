import { Component, OnInit } from '@angular/core'
import { library } from '@fortawesome/fontawesome'
import { faCircleNotch } from '@fortawesome/fontawesome-free-solid/shakable'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'organism-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

  constructor(public state: StateService) {
    library.add(faCircleNotch)
  }

  ngOnInit() {
  }

}