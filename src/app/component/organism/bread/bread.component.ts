import { Component, OnInit, Input } from '@angular/core'
import { Bread } from '../../../model/bread.model'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {

  @Input() breads: Bread[] = []

  constructor() {
    library.add(faCaretRight)
  }

  ngOnInit() {
  }

}