import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

@Injectable()
export class ApiService {

  private headers: Headers = new Headers
  private baseURL: string = 'https://www.bungie.net/Platform'

  constructor(private http: Http) {
    this.headers.append('X-API-Key', '26afb960ed334cc09268788c92305fd6')
  }

  // '4611686018443892267'
  getProfile(member_id: string): Observable<any> {
    return this.http.get(this.baseURL + '/Destiny2/2/Profile/' + member_id + '/', {headers: this.headers, params: {components: '100'}})
  }

  // '4611686018443892267'
  getCharacters(member_id: string): Observable<any> {
    return this.http.get(this.baseURL + '/Destiny2/2/Profile/' + member_id + '/', {headers: this.headers, params: {components: '200'}})
  }

  // '4611686018443892267', '2305843009261054278'
  getCharacter(member_id: string, character_id: string) {
    return this.http.get(this.baseURL + '/Destiny2/2/Profile/' + member_id + '/Character/' + character_id + '/', {headers: this.headers})
  }

  // 1851423
  getClanReword(clan_id: string) {
    return this.http.get(this.baseURL + '/Destiny2/Clan/' + clan_id + '/WeeklyRewardState/', {headers: this.headers})
  }

}