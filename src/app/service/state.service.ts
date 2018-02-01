import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'


declare let gtag: any

@Injectable()
export class StateService {

  public url: string = ''
  public heading: string = ''
  public stats: any = {}
  public mode_id: number = 39
  public is_navigation: boolean = false
  public is_load: boolean = true
  public errors: string[] = []
  public routerObserver$: Observable<any>

  constructor(private router: Router) {
    this.routerObserver$ = this.router.events.filter(event => event instanceof NavigationEnd).share()
  }

  postGoogle() {
    gtag('config', 'UA-53477209-3', { 'page_path': this.url })
  }

}