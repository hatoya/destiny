import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  // '5c22563a790cbf510817db9d93d5ab2d'
  getToken(code: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic MjE2ODY6VE9qTDhJM1BCQk5nYW5aVnBuMmFqQmtxV0l5NDRWbjdEcGhRQVZISnBXYw=='})
    return this.http.post('/app/oauth/token/', 'grant_type=authorization_code&code=' + code, {headers: headers})
  }

  getUser() {
    return this.http.get('/User/GetMembershipsForCurrentUser/')
  }

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
    const params = new HttpParams().set('components', '200')
    return this.http.get('/Destiny2/2/Profile/' + member_id + '/Character/' + character_id + '/', {params: params})
  }

  // 1851423
  getClanReword(clan_id: string) {
    return this.http.get('/Destiny2/Clan/' + clan_id + '/WeeklyRewardState/')
  }

}