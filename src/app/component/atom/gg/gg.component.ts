import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-gg',
  templateUrl: './gg.component.html',
  styleUrls: ['./gg.component.scss']
})
export class GgComponent implements OnInit {

  @Input() type: string = 'normal'
  @Input() elo: number = 0

  constructor() { }

  ngOnInit() {
  }

}