import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { SwUpdate } from '@angular/service-worker'
import { environment } from '../environments/environment'
import { StateService } from './service/state.service'
import { StorageService } from './service/storage.service'
import { ApiService } from './service/api.service'

declare let gtag: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private route: ActivatedRoute, private swUpdate: SwUpdate, public state: StateService, private api: ApiService, private storage: StorageService) { }

  ngOnInit() {
    // this.api.getStats().subscribe(content => this.state.stats = content['Response'])
    if(environment.production) this.swUpdate.checkForUpdate()
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scrollTo(0, 0)
      this.state.errors = []
      this.state.url = event['url']
      this.state.is_load = true
      this.state.is_navigation = false
      gtag('config', 'UA-53477209-3', {'page_path': this.state.url})
      // if(this.route.queryParams['_value']['code']) this.getToken()
    })
  }

  getToken() {
    // this.api.getToken(this.route.queryParams['_value']['code']).subscribe({
    //   next: content => {
    //     content['expires_date'] = new Date().getTime() + (content['expires_in'] * 1000)
    //     content['refresh_expires_date'] = new Date().getTime() + (content['refresh_expires_in'] * 1000)
    //     this.storage.set('bungie_oauth', content)
    //   },
    //   error: error => console.log(error),
    //   complete: () => {
    //     this.router.navigate(['/'])
    //     this.api.getUser().subscribe(content => {
    //       let oauth = this.storage.get('bungie_oauth')
    //       oauth['destiny_id'] = content['Response']['destinyMemberships'][0]['membershipId']
    //       this.storage.set('bungie_oauth', oauth)
    //     })
    //   }
    // })
  }

}