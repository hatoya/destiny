import { Component, OnInit } from '@angular/core'
import { SwUpdate } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { StateService } from './service/state.service'
import { StorageService } from './service/storage.service'
import { ApiService } from './service/api.service'
import { MetaService } from './service/meta.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private swUpdate: SwUpdate, public state: StateService, private api: ApiService, private storage: StorageService, private meta: MetaService) { }

  ngOnInit() {
    if(environment.production) this.swUpdate.checkForUpdate()
    this.meta.init()
    this.state.routerObserver$.subscribe(event => {
      window.scrollTo(0, 0)
      this.state.errors = []
      this.state.url = event['url']
      this.state.is_load = true
      this.state.is_navigation = false
      if (!event['url'].includes('/clan/')) this.state.postGoogle()
    })
  }

}