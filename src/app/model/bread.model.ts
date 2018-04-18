export class Bread {

  title: string = ''
  url: any[] = []

  constructor(bread?: Bread) {
    Object.assign(this, bread)
  }

}