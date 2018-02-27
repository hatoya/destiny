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

  getClan(clan_id: string): Observable<any> {
    return this.http.get('/GroupV2/' + clan_id + '/')
  }

  getClanMembers(clan_id: string): Observable<any> {
    return this.http.get('https://api.guardian.gg/v2/clan/' + clan_id + '/members?lc=ja')
  }

  getGg(id: string): Observable<any> {
    return this.http.get('https://api.guardian.gg/v2/players/' + id + '?lc=ja')
  }

  getGgHistory(id: string, start: Date, end: Date): Observable<any> {
    return this.http.get('https://api.guardian.gg/v2/players/' + id + '/performance/0/' + this.datePipe.transform(start, 'yyyy-MM-dd') + '/' + this.datePipe.transform(end, 'yyyy-MM-dd') + '?lc=ja')
  }

  getTrackerHistory(player_id: string, mode_id: number): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/history/2/' + player_id + '/' + mode_id + '/')
  }

  getTracker(id: string): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/2/' + id + '?season=2')
  }

}