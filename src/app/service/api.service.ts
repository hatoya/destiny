import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { StorageService } from './storage.service'

@Injectable()
export class ApiService {

  private destiny_id: string = ''

  constructor(private http: HttpClient, private storage: StorageService) {
    this.destiny_id = this.storage.get('bungie_oauth')['destiny_id']
  }

  getToken(code: string) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic MjE2ODY6VE9qTDhJM1BCQk5nYW5aVnBuMmFqQmtxV0l5NDRWbjdEcGhRQVZISnBXYw=='})
    return this.http.post('/app/oauth/token/', 'grant_type=authorization_code&code=' + code, {headers: headers})
  }

  getUser() {
    return this.http.get('/User/GetMembershipsById/' + this.destiny_id + '/-1/')
  }

  getProfile(): Observable<any> {
    const params = new HttpParams().set('components', '100')
    return this.http.get('/Destiny2/2/Profile/' + this.destiny_id + '/', {params: params})
  }

  getCharacters(): Observable<any> {
    const params = new HttpParams().set('components', '200,205')
    return this.http.get('/Destiny2/2/Profile/' + this.destiny_id + '/', {params: params})
  }

  getCharacter(character_id: string) {
    const params = new HttpParams().set('components', '200,205')
    return this.http.get('/Destiny2/2/Profile/' + this.storage.get('bungie_oauth')['destiny_id'] + '/Character/' + character_id + '/', {params: params})
  }

  // 1851423
  getClan(clan_id: string) {
    return this.http.get('/GroupV2/' + clan_id + '/')
  }

  // 1851423
  getClanMembers(clan_id: string) {
    return this.http.get('https://api.guardian.gg/v2/clan/' + clan_id + '/members?lc=ja')
  }

  getVendors(character_id: string) {
    const params = new HttpParams().set('components', '400')
    return this.http.get('/Destiny2/2/Profile/' + this.destiny_id + '/Character/' + character_id + '/Vendors/', {params: params})
  }

  getStats() {
    return this.http.get('/Destiny2/Stats/Definition/')
  }

  getMilestones() {
    return this.http.get('/Destiny2/Milestones/')
  }

  getTrackerElo(id: string): Observable<number> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/2/' + id).map(content => {
      const contents: any = Object.keys(content).map(value => content[value]).filter(stat => stat['mode'] === 39)
      return contents.length ? contents[0]['currentElo'] : 0
    })
  }

}