import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../../service/api.service'
import { StorageService } from '../../../service/storage.service'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'app-character-index',
  templateUrl: './character-index.component.html',
  styleUrls: ['./character-index.component.scss']
})
export class CharacterIndexComponent implements OnInit {

  public characters: any[] = []

  constructor(private api: ApiService, private storage: StorageService, private state: StateService) { }

  ngOnInit() {
    this.api.getCharacters().subscribe({
      next: content => {
        let characterObject = content['Response']['characters']['data']
        for(let key of Object.keys(characterObject)) {
          characterObject[key]['items'] = content['Response']['characterEquipment']['data'][key]['items']
          this.characters.push(characterObject[key])
        }
      },
      error: error => console.log(error),
      complete: () => this.state.is_load = false
    })
  }

}