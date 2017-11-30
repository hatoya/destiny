import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.scss']
})
export class DiffComponent implements OnInit {

  @Input() elo: number = 0

  constructor() { }

  ngOnInit() {
  }

}