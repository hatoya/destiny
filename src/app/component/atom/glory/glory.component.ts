import { Component, OnInit, Input } from '@angular/core'
import { Progress } from '../../../model/progress.model';

@Component({
  selector: 'app-glory',
  templateUrl: './glory.component.html',
  styleUrls: ['./glory.component.scss']
})
export class GloryComponent implements OnInit {

  @Input() progress: Progress = new Progress

  constructor() { }

  ngOnInit() {
  }

}