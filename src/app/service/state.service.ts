import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'

declare let gtag: any

interface Mode {
  id: number
  name: string
}

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
  public modes: Mode[] = [
    {
      id: 39,
      name: 'Trials of the Nine'
    },
    {
      id: 12,
      name: 'Clash'
    },
    {
      id: 10,
      name: 'Control'
    },
    {
      id: 31,
      name: 'Supremacy'
    },
    {
      id: 37,
      name: 'Survival'
    },
    {
      id: 38,
      name: 'Countdown'
    },
    {
      id: 19,
      name: 'Iron Banner'
    }
  ]

  constructor(private router: Router) {
    this.routerObserver$ = this.router.events.filter(event => event instanceof NavigationEnd).share()
  }

  postGoogle() {
    gtag('config', 'UA-53477209-3', { 'page_path': this.url })
  }

}