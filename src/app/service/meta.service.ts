import { filter } from 'rxjs/operators'
import { Title, Meta } from '@angular/platform-browser'
import { Injectable } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'

@Injectable()
export class MetaService {

  public base: string = 'Destiny Clan Manager'

  constructor(private title: Title, private meta: Meta, private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => this.init())
  }

  init() {
    this.setTitle('')
    this.setDescription('Tracking your Tracker elo and GG elo in Destiny2.')
    this.meta.updateTag({ property: 'og:url', content: location.href })
  }

  setTitle(title: string) {
    title = title === '' ? this.base : title + ' | ' + this.base
    this.title.setTitle(title)
    this.meta.updateTag({ property: 'og:title', content: title })
    this.meta.updateTag({ name: 'twitter:title', content: title })
  }

  setDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description })
    this.meta.updateTag({ property: 'og:description', content: description })
    this.meta.updateTag({ name: 'twitter:description', content: description })
  }

}