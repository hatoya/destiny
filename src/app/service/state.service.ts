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
  public is_navigation: boolean = false
  public is_load: boolean = true
  public errors: string[] = []
  public routerObserver$: Observable<any>
  public today: Date = new Date
  public start: Date
  public end: Date
  public modes: Mode[] = [
    { id: 39, name: 'Trials of the Nine' },
    { id: 37, name: 'Survival' },
    { id: 38, name: 'Countdown' },
    { id: 12, name: 'Clash' },
    { id: 10, name: 'Control' },
    { id: 31, name: 'Supremacy' },
    { id: 19, name: 'Iron Banner' },
    { id: 15, name: 'Double' }
  ]

  constructor(private router: Router) {
    this.routerObserver$ = this.router.events.filter(event => event instanceof NavigationEnd).share()
    this.start = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate())
    this.end = this.today.getDay() < 6 ? new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 3 - this.today.getDay()) : new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 4 - this.today.getDay())
  }

  postGoogle() {
    gtag('config', 'UA-53477209-3', { 'page_path': this.url })
  }

}