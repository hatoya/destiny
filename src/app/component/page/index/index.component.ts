import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'

interface SearchModel {
  clan: string,
  player: string
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public clanForm: FormGroup
  public playerForm: FormGroup
  public model: SearchModel = {
    clan: '',
    player: ''
  }

  constructor(private formBuilder: FormBuilder, private router: Router, public state: StateService, private api: ApiService) {
    this.state.heading = ''
  }

  ngOnInit() {
    this.state.is_load = false
    this.clanForm = this.formBuilder.group({ name: [this.model.clan, [Validators.required]] })
    this.playerForm = this.formBuilder.group({ name: [this.model.player, [Validators.required]] })
    this.state.postGoogle()
  }

  searchClan() {
    this.state.is_load = true
    this.api.postClanSearch(this.model.clan).subscribe({
      next: content => content['Response']['results'].length ? this.router.navigate(['/', 'clan', content['Response']['results'][0]['groupId']]) : console.log('failed'),
      complete: () => this.state.is_load = false
    })
  }

  searchPlayer() {
    this.state.is_load = true
    this.api.getPlayerSearch(this.model.player).subscribe({
      next: contents => contents.length ? this.router.navigate(['/', 'player', contents[0]['membershipId']]) : console.log('failed'),
      complete: () => this.state.is_load = false
    })
  }

}