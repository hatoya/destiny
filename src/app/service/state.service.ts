import { Injectable } from '@angular/core'

@Injectable()
export class StateService {

  public token: string = ''
  public token_limit: Date = new Date

  constructor() { }

}