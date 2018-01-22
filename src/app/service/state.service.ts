import { Injectable } from '@angular/core'

declare let gtag: any

@Injectable()
export class StateService {

  public url: string = ''
  public heading: string = ''
  public stats: any = {}
  public is_navigation: boolean = false
  public is_load: boolean = true
  public errors: string[] = []

  constructor() { }

  postGoogle() {
    gtag('config', 'UA-53477209-3', { 'page_path': this.url })
  }

}