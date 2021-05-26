import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap } from 'rxjs/operators'; 
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map()
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if(req.method !== "GET") {
        return next.handle(req)
    }
    if(req.headers.get("reset")) {
        this.cache.delete(req)
    }
    const cachedResponse: HttpResponse<any> | undefined = this.cache.get(req)
    if(cachedResponse) {
        return of(cachedResponse.clone())
    }
    return next.handle(req).pipe(
        tap(event => {
           if (event instanceof HttpResponse) {
             this.cache.set(req, event);
        }
        }
     ))
  }    
}