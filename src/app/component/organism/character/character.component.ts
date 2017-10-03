import { Component, OnInit, Input } from '@angular/core'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'organism-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() characters: any[] = []

  constructor(private state: StateService) {
    this.state.heading = 'Character'
  }

  ngOnInit() {
  }

}