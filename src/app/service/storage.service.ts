import { Injectable } from '@angular/core'

@Injectable()
export class StorageService {

  constructor() { }

  get(target: string): any {
    return JSON.parse(localStorage.getItem(target))
  }

  set(target: string, item: object): void {
    localStorage.setItem(target, JSON.stringify(item))
  }

  delete() {

  }

}