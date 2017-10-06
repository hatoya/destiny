import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from '../../../service/api.service'
import { StateService } from '../../../service/state.service'

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {

  public characters: any[] = []

  constructor(private router: Router, private api: ApiService, private state: StateService) {
    this.state.heading = 'Character'
    this.api.getCharacter(this.router.url.split('/')[2]).subscribe({
      next: content => {
        this.characters.push(content['Response']['character']['data'])
        this.characters[0]['items'] = content['Response']['equipment']['data']['items']
        console.log(this.characters)
      },
      error: error => console.log(error),
      complete: () => this.state.is_load = false
    })
  }

  ngOnInit() {
  }

}