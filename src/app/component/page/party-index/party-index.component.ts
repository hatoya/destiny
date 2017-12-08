import { Subscription } from 'rxjs/Subscription'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { StateService } from '../../../service/state.service'
import { ApiService } from '../../../service/api.service'

@Component({
  selector: 'app-party-index',
  templateUrl: './party-index.component.html',
  styleUrls: ['./party-index.component.scss']
})
export class PartyIndexComponent implements OnInit {

  public parties: any[] = []
  public fireSubscriptin: Subscription

  constructor(private state: StateService, private api: ApiService) {
    this.state.heading = 'Party'
    this.fireSubscriptin = this.api.getFireParties().subscribe(contents => {
      this.parties = contents
      this.state.is_load = false
    })
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.fireSubscriptin.unsubscribe()
  }

}