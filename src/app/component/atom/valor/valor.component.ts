import { Component, OnInit, Input } from '@angular/core'
import { Progress } from '../../../model/progress.model'

@Component({
  selector: 'app-valor',
  templateUrl: './valor.component.html',
  styleUrls: ['./valor.component.scss']
})
export class ValorComponent implements OnInit {

  @Input() progress: Progress = new Progress

  constructor() { }

  ngOnInit() {
  }

}