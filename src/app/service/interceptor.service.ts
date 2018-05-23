import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'
import { environment } from '../../environments/environment'
import { StorageService } from './storage.service'

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private baseURL: string = 'https://www.bungie.net/Platform'
  private apiKey: string = ''

  constructor(private route: ActivatedRoute, private storage: StorageService) {
    this.apiKey = environment.destiny.apiKey
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request['url'].includes('http')) {
      return next.handle(request)
    } else {
      let oauth = this.storage.get('bungie_oauth')
      let headers: HttpHeaders = request.headers.has('authorization') ? request.headers.set('X-API-Key', this.apiKey) : request.headers.set('X-API-Key', this.apiKey)
      return next.handle(request.clone({ url: this.baseURL + request.url }).clone({ headers: headers }))
    }
  }

}