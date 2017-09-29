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
    this.storage.set('eeeee', {aaaaa: 11111, bbbbb: 'ccccc'})
    console.log(this.storage.get('eeeee'))
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      if(this.route.queryParams['_value']['code']) {
        this.api.getToken(this.route.queryParams['_value']['code']).subscribe({
          next: content => this.state.token = content['access_token'],
          error: error => console.log(error),
          complete: () => this.router.navigate(['/'])
        })
      }
    })
  }

}