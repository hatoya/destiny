import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../../service/api.service'

@Component({
  selector: 'app-character-index',
  templateUrl: './character-index.component.html',
  styleUrls: ['./character-index.component.scss']
})
export class CharacterIndexComponent implements OnInit {

  public characters: any[] = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCharacters('4611686018443892267').subscribe(content => {
      let characterObject = content['Response']['characters']['data']
      for(let key of Object.keys(characterObject)) this.characters.push(characterObject[key])
    })
  }

}