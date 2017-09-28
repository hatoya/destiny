import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http'

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request.clone({headers: request.headers.set('X-API-Key', '26afb960ed334cc09268788c92305fd6')}))
  }

}