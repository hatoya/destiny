import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { StateService } from './service/state.service'
import { StorageService } from './service/storage.service'
import { ApiService } from './service/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private route: ActivatedRoute, private state: StateService, private api: ApiService, private storage: StorageService) { }

  ngOnInit() {
    // this.api.getStats().subscribe(content => this.state.stats = content['Response'])
    // this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
    //   this.state.url = event['url']
    //   this.state.is_load = true
    //   if(this.route.queryParams['_value']['code']) this.getToken()
    // })
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