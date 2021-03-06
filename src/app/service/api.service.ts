import { Observable, merge } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { DatePipe } from '@angular/common'
import { AngularFirestore } from 'angularfire2/firestore'
import { StorageService } from './storage.service'
import { Player } from '../model/player.model'
import { map, mergeMap, partition } from 'rxjs/operators';

@Injectable()
export class ApiService {

  season: number = 3

  constructor(private http: HttpClient, private datePipe: DatePipe, private fireStore: AngularFirestore, private storage: StorageService) { }

  postClanSearch(target: string): Observable<any> {
    return this.http.post('/GroupV2/Search/', { name: target, groupType: 1, creationDate: 0, sortBy: 0, localeFilter: '', tagText: '', itemsPerPage: 1, currentPage: 1, requestContinuationToken: 0 })
  }

  getPlayerSearch(target: string): Observable<any> {
    return this.http.get('/Destiny2/SearchDestinyPlayer/2/' + target + '/').pipe(map(content => content['Response']))
  }

  getClan(clan_id: string): Observable<any> {
    return this.http.get('/GroupV2/' + clan_id + '/')
  }

  getClanForMember(player_id: string): Observable<any> {
    return this.http.get('/GroupV2/User/2/' + player_id + '/0/1/').pipe(mergeMap(content => content['Response']['results']))
  }

  getProfile(id: string): Observable<any> {
    const [success, failed] = partition(content => content['ErrorCode'] === 1)(this.http.get('/Destiny2/2/Profile/' + id + '/?components=100'))
    return merge(success.pipe(map(content => content['Response']['profile']['data'])), failed.pipe(map(content => { throw content['ErrorStatus'] })))
  }

  getProgress(player_id: string): Observable<any> {
    return this.http.get('/Destiny2/2/Profile/' + player_id + '/?components=202').pipe(map(content => {
      const answers: any[] = []
      const target = content['Response'] ? content['Response']['characterProgressions']['data'] : {}
      for (let key in target) answers.push(target[key])
      return answers.length ? answers[0]['progressions'] : {}
    }))
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

  getGgActivity(activity_id: string) {
    return this.http.get('https://api.guardian.gg/v2/pgcr/' + activity_id)
  }

  getTrackerHistory(player_id: string, mode_id: number): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/history/2/' + player_id + '/' + mode_id + '/')
  }

  getTrackerActivities(player_id: string): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/history/2/' + player_id).pipe(map(content => content['games']), map(contents => contents.slice(0, 25)))
  }

  getTrackerActivity(activity_id: string) {
    return this.http.get('https://destinytracker.com/d2/api/pgcr/' + activity_id)
  }

  getTracker(id: string): Observable<any> {
    return this.http.get('https://api-insights.destinytracker.com/api/d2/elo/2/' + id + '?season=' + this.season)
  }

}