import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../../service/api.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public characters: any[] = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCharacters('4611686018443892267').subscribe(content => {
      let characterObject = content['Response']['characters']['data']
      for(let key of Object.keys(characterObject)) this.characters.push(characterObject[key])
    })
  }

}