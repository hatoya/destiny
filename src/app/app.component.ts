import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import { ApiService } from './service/api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(() => {
      if(this.route.queryParams['_value']['code']) this.api.getToken(this.route.queryParams['_value']['code']).subscribe(content => console.log(content))
    })
  }

  ngOnInit() {
  }

}