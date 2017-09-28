import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // '4611686018443892267'
  getProfile(member_id: string): Observable<any> {
    const params = new HttpParams().set('components', '100')
    return this.http.get('/Destiny2/2/Profile/' + member_id + '/', {params: params})
  }

  // '4611686018443892267'
  getCharacters(member_id: string): Observable<any> {
    const params = new HttpParams().set('components', '200')
    return this.http.get('/Destiny2/2/Profile/' + member_id + '/', {params: params})
  }

  // '4611686018443892267', '2305843009261054278'
  getCharacter(member_id: string, character_id: string) {
    return this.http.get('/Destiny2/2/Profile/' + member_id + '/Character/' + character_id + '/')
  }

  // 1851423
  getClanReword(clan_id: string) {
    return this.http.get('/Destiny2/Clan/' + clan_id + '/WeeklyRewardState/')
  }

}