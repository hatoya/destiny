import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'

declare let gtag: any

interface Mode {
  id: number
  name: string
  color: string
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
  public now: Date = new Date
  public today: Date = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate())
  public start: Date = new Date(2017, 8, 6)
  public end: Date = this.today.getDay() < 3 ? new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 4 - this.today.getDay()) : new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 3 - this.today.getDay())
  public modes: Mode[] = [
    { id: 39, name: 'Trials of the Nine', color: '#00bcd4' },
    { id: 37, name: 'Survival', color: '#000000' },
    { id: 38, name: 'Countdown', color: '#000000' },
    { id: 12, name: 'Clash', color: '#000000' },
    { id: 10, name: 'Control', color: '#000000' },
    { id: 31, name: 'Supremacy', color: '#000000' },
    { id: 19, name: 'Iron Banner', color: '#000000' },
    { id: 15, name: 'Double', color: '#000000' }
  ]

  constructor(private router: Router) {
    this.routerObserver$ = this.router.events.filter(event => event instanceof NavigationEnd).share()
  }

  postGoogle(): void {
    gtag('config', 'UA-53477209-3', { 'page_path': this.url })
  }

}