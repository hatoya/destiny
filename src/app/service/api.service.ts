import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { DatePipe } from '@angular/common'
import { AngularFirestore } from 'angularfire2/firestore'
import { StorageService } from './storage.service'
import { Player } from '../model/player.model'

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private datePipe: DatePipe, private fireStore: AngularFirestore, private storage: StorageService) { }

  postClanSearch(target: string): Observable<any> {
    return this.http.post('/GroupV2/Search/', { name: target, groupType: 1, creationDate: 0, sortBy: 0, localeFilter: '', tagText: '', itemsPerPage: 1, currentPage: 1, requestContinuationToken: 0 })
  }

  getPlayerSearch(target: string): Observable<any> {
    return this.http.get('/Destiny2/SearchDestinyPlayer/2/' + target + '/').map(content => content['Response'])
  }

  getClan(clan_id: string): Observable<any> {
    return this.http.get('/GroupV2/' + clan_id + '/')
  }

  getClanForMember(player_id: string): Observable<any> {
    return this.http.get('/GroupV2/User/2/' + player_id + '/0/1/').flatMap(content => content['Response']['results'])
  }

  getProfile(id: string): Observable<any> {
    const [success, failed] = this.http.get('/Destiny2/2/Profile/' + id + '/?components=100').partition(content => content['ErrorCode'] === 1)
    return Observable.merge(success.map(content => content['Response']['profile']['data']), failed.map(content => { throw content['ErrorStatus'] }))
  }

  getClanMembers(clan_id: string): Observable<any> {
    return this.http.get('https://api.guardian.gg/v2/clan/' + clan_id + '/members?lc=ja')
  }

  getGg(id: string): Observable<any> {
    return this.http.get('https://api.guardian.gg/v2/players/' + id + '?lc=ja')
  }

  getGgHistory(player_id: string, mode_id: number, start: Date, end: Date): Observable<any> {
    return this.http.get('https://api.guardian.gg/v2/players/' + player_id + '/performance/' + mode_id + '/' + this.datePipe.transform(start, 'yyyy-MM-dd') + '/' + this.datePipe.transform(end, 'yyyy-MM-dd') + '?lc=ja')
  }

  getTrackerHistory(player_id: string, mode_id: number): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/history/2/' + player_id + '/' + mode_id + '/')
  }

  getTracker(id: string): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/2/' + id + '?season=2')
  }

}