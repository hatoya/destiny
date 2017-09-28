import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'atom-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  @Input() content: string = ''

  constructor() { }

  ngOnInit() {
  }

}