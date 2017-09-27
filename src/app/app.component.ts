import { Component, OnInit } from '@angular/core'
import { Http, Headers } from '@angular/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private headers: Headers = new Headers
  private baseURL: string = 'https://www.bungie.net/Platform'
  public characters: any[] = []

  constructor(private http: Http) {
    this.headers.append('X-API-Key', '26afb960ed334cc09268788c92305fd6')
  }

  ngOnInit() {
    this.http.get(this.baseURL + '/Destiny2/2/Profile/4611686018443892267/', {headers: this.headers, params: {components: '200'}}).subscribe(content => {
      let characterObject = JSON.parse(content['_body'])['Response']['characters']['data']
      for(let key of Object.keys(characterObject)) this.characters.push(characterObject[key])
      console.log(this.characters[0])
    })
  }

}