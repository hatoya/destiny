import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  @Input() elo: number = 0

  constructor() { }

  ngOnInit() {
  }

}