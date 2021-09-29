import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.services";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findbyEmail(email: string): Observable<ClienteDTO> {

        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token, 'Access-Control-Allow-Origin':'*' });

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            { 'headers': authHeader });
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }
}