import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "../services/storage.services";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = request.url.substring(0, N) == API_CONFIG.baseUrl;

        if (localUser && requestToAPI) {
            const authRequest = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localUser.token) });
            return next.handle(authRequest);
        }
        else {
            return next.handle(request);
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};