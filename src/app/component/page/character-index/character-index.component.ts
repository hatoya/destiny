import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../../service/api.service'
import { StorageService } from '../../../service/storage.service'

@Component({
  selector: 'app-character-index',
  templateUrl: './character-index.component.html',
  styleUrls: ['./character-index.component.scss']
})
export class CharacterIndexComponent implements OnInit {

  public characters: any[] = []

  constructor(private api: ApiService, private storage: StorageService) { }

  ngOnInit() {
    this.api.getCharacters(this.storage.get('bungie_oauth')['destiny_id']).subscribe({
      next: content => {
        let characterObject = content['Response']['characters']['data']
        for(let key of Object.keys(characterObject)) this.characters.push(characterObject[key])
      },
      error: error => console.log(error)
    })
  }

}