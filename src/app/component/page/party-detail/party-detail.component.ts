import { Subscription } from 'rxjs/Subscription'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.scss']
})
export class PartyDetailComponent implements OnInit {

  public postForm: FormGroup
  public fireSubscription: Subscription = new Subscription
  public party: any = {}
  public messages: any[] = []
  public model: any = {
    content: ''
  }

  constructor(private formBuilder: FormBuilder, private state: StateService, private api: ApiService) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({content: [this.model.content, [Validators.required, Validators.maxLength(500)]]})
    this.fireSubscription = this.api.getFireParty(this.state.url.split('/')[2]).subscribe(content => {
      this.state.is_load = false
      this.state.heading = content['title'] + ' - Party'
      this.party = content
    })
    this.api.getFireMessages(this.state.url.split('/')[2]).map(messages => messages.sort((value1, value2) => value1['created_at'].getTime() < value2['created_at'].getTime() ? 1 : -1)).subscribe(content => this.messages = content)
  }

  ngOnDestroy() {
    this.fireSubscription.unsubscribe()
  }

  sortMessages() {
    this.messages.sort((value1, value2) => value1['created_at'].getTime() < value2['created_at'].getTime() ? 1 : -1)
  }

  sendMessage() {
    let now: Date = new Date
    this.api.postFireMessage(this.state.url.split('/')[2], {name: 'player5', content: this.model.content, created_at: now, updated_at: now})
    this.model.content = ''
  }

}