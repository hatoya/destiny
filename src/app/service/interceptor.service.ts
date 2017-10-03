import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'
import { StorageService } from './storage.service'

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private baseURL: string = 'https://www.bungie.net/Platform'
  private apiKey: string = '26afb960ed334cc09268788c92305fd6'

  constructor(private route: ActivatedRoute, private storage: StorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let oauth = this.storage.get('bungie_oauth')
    // console.log(oauth)
    // console.log(oauth['expires_date'] - new Date().getTime())
    let headers: HttpHeaders = request.headers.has('authorization') ? request.headers.set('X-API-Key', this.apiKey) : request.headers.set('X-API-Key', this.apiKey).set('Authorization', 'Basic ' + this.storage.get('bungie_oauth')['access_token'])
    return next.handle(request.clone({url: this.baseURL + request.url}).clone({headers: headers}))
  }

}