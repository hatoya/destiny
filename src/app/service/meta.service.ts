import { Title } from '@angular/platform-browser'
import { Injectable } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'

@Injectable()
export class MetaService {

  constructor(private title: Title, private router: Router) {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.setTitle('')
    })
  }

  setTitle(title: string) {
    const base = 'Destiny Clan Manager'
    title === '' ? this.title.setTitle(base) : this.title.setTitle(title + ' | ' + base)
  }

}