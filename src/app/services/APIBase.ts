import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export abstract class APIBase {
    private baseUrl = environment.endpoint;
    private _http : HttpClient;
    
    constructor (_http: HttpClient) { 
        this._http = _http;
    }

    protected get(url: String, params? : {[key: string] : any;}) : Observable<any> {
        if (params) {
            var _httpParams = new HttpParams({
                fromObject: params
            });
            return this._http.get(this.baseUrl + url, { params: _httpParams });
        }

        return this._http.get(this.baseUrl + url );
    }

    protected post(url : String, data : {[key: string] : any;}, headers? : any) : Observable<any> {
        if (headers) {
            var _headers = new HttpHeaders({
                fromObject: headers
            });
            return this._http.post(this.baseUrl + url, data, {headers: _headers});
        }
        return this._http.post(this.baseUrl + url, data);
    }

    protected patch(url : String, data : {[key: string] : any;}, headers? : any) : Observable<any> {
        if(headers) {
            var _headers = new HttpHeaders({
                fromObject: headers
            });
            return this._http.patch(this.baseUrl + url, data, {headers: _headers});
        }
        return this._http.patch(this.baseUrl + url, data);
    }

    protected delete(url : String, data? : {[key: string] : any;}) : Observable<any> {
        if (data) {
            return this._http.request('delete', this.baseUrl + url, {body: data});
        }
        return this._http.delete(this.baseUrl + url);
    }

    protected getFile(url: String, params? : {[key: string] : any;}){
        if (params) {
            var _httpParams = new HttpParams({
                fromObject : params
            });
            
            return this._http.get(this.baseUrl + url, { headers: new HttpHeaders({
                'Content-Type': 'application/octet-stream'
            }), params: _httpParams, responseType: 'blob' });
        }

        return this._http.get(this.baseUrl + url, { headers: new HttpHeaders({
            'Content-Type': 'application/octet-stream'
        }), responseType: 'blob' });
    }
}
