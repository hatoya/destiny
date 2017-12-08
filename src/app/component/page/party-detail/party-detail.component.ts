import { Subscription } from 'rxjs/Subscription'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.scss']
})
export class PartyDetailComponent implements OnInit {

  public party: any = {}
  public fireSubscription: Subscription = new Subscription

  constructor(private state: StateService, private api: ApiService) { }

  ngOnInit() {
    this.fireSubscription = this.api.getFireParty(this.state.url.split('/')[2]).subscribe(content => {
      this.state.is_load = false
      this.state.heading = content['title'] + ' - Party'
      this.party = content
    })
  }

  ngOnDestroy() {
    this.fireSubscription.unsubscribe()
  }

}