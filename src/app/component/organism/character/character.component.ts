import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'organism-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() characters: any[] = []

  constructor() { }

  ngOnInit() {
  }

}