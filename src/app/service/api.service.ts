import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  getToken(code: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic MjE2ODY6VE9qTDhJM1BCQk5nYW5aVnBuMmFqQmtxV0l5NDRWbjdEcGhRQVZISnBXYw=='})
    return this.http.post('/app/oauth/token/', 'grant_type=authorization_code&code=' + code, {headers: headers})
  }

  getUser(id: string) {
    return this.http.get('/User/GetMembershipsById/' + id + '/-1/')
  }

  getProfile(member_id: string): Observable<any> {
    const params = new HttpParams().set('components', '100')
    return this.http.get('/Destiny2/2/Profile/' + member_id + '/', {params: params})
  }

  getCharacters(member_id: string): Observable<any> {
    const params = new HttpParams().set('components', '200')
    return this.http.get('/Destiny2/2/Profile/' + member_id + '/', {params: params})
  }

  getCharacter(member_id: string, character_id: string) {
    const params = new HttpParams().set('components', '200')
    return this.http.get('/Destiny2/2/Profile/' + member_id + '/Character/' + character_id + '/', {params: params})
  }

  // 1851423
  getClanReword(clan_id: string) {
    return this.http.get('/Destiny2/Clan/' + clan_id + '/WeeklyRewardState/')
  }

}