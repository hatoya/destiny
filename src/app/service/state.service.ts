import { Injectable } from '@angular/core'

@Injectable()
export class StateService {

  public url: string = ''
  public heading: string = ''
  public stats: any = {}

  constructor() { }

}