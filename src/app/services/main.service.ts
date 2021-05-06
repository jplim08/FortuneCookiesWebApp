import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  public secure = environment.secure;
  public url = environment.url;
  public secureUrl = environment.secureUrl;
  device_token = 'no-device';
  token = null;

  constructor(
    public storageService: StorageService,
    public http: HttpClient,
    public location: Location,
    public toastService: ToastService
  ) { }

  /**
   * return the full url to be used on API request
   * @param path the API path URI
   * @param params param to be added on the url must be an Object ex: {key: value}
   */
   getUrl(path: string, params: any = null): any {
    let url = '';
    if (this.secure === true) {
      url += this.secureUrl;
    } else {
      url += this.url;
    }
    url += path;
    if (params) {
      url += this.createUrlParam(params)
    }
    return url;
  }

  /**
   * create the url param that will be added in the URI
   * @param p param to be added on the url must be an Object ex: {key: value} 
   */
   createUrlParam(p) {
    let uriStr = '?';
    for (let key of Object.keys(p)) {
      if (p[key]) {
        uriStr += key + '=' + p[key] + '&';
      }
    }
    return uriStr;
  }

   /**
   * return http options 
   * @param h optional, should be an object of kay value pair ex: {key: value}
   */
    getHttpOptions(h: any = null) {
      if(!this.token){
        // this.device_token = this.storageService.storageLocalGet('device_token');
        this.token = this.storageService.localGet('token');
      }
      let heads = {
        'Devicetoken': this.device_token,
        'Deviceid': environment.device_id,
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
      // console.log("main service headers",heads);
      if (h) {
        for (let key of Object.keys(h)) {
          if (h[key] && h[key] != 'Content-Type remove') {
            heads[key] = h[key];
          } else if (h[key] == 'Content-Type remove') {
            delete heads['Content-Type']
          }
        }
      }
      let httpOptions = {
        headers: new HttpHeaders(heads)
      };
      return httpOptions;
    }

    /**
   * return HTTP POST request to updated something on the API end point
   * @param url
   * @param jsonData 
   * @param header 
   */
  put(url, jsonData, header: any = null): Observable<any> {
    return this.http.put<any>(this.getUrl(url), jsonData, this.getHttpOptions(header));
  }

  /**
   * return HTTP POST request to updated something on the API end point
   * @param url 
   * @param postData 
   * @param header 
   */
   post(url, postData, header: any = null): Observable<any> {
    /* To check the image data in console */
    return this.http.post<any>(this.getUrl(url), postData, this.getHttpOptions(header));
  }

  /**
   * return HTTP DELETE request
   * @param url 
   * @param header 
   */
   del(url, header: any = null): Observable<any> {
    return this.http.delete<any>(this.getUrl(url), this.getHttpOptions(header));
  }


  /**
   * return HTTP GET request
   * @param url 
   * @param header 
   */
   get(url, header: any = null): Observable<any> {
    return this.http.get<any>(this.getUrl(url), this.getHttpOptions(header));
  }

  /**
   * This will make an API request depends on the method set
   * @param urlPath required URL path excluding the protocol://domain.com
   * @param jsonData for POST, PATCH and PUT method request this must be a Object ex: {key: value}
   * for GET and DELETE request this must be an empty string ex: ""
   * @param method POST PUT PATCH GET DELETE
   * @param isToastMsg either to toast the error response message or not default is true
   * @param additionalHeader by default all request has the header of api-key and Content-Type this will add new header if has value
   */
   makeRequest(urlPath: string, jsonData: any, method: string = 'POST', isToastMsg: boolean = true, additionalHeader: object = {}, isFormData: boolean = false) {
    return new Promise(res => {

      let request = null;
      if (method == 'POST') {
        request = this.post(urlPath, isFormData ? jsonData : JSON.stringify(jsonData), additionalHeader)
      }
      else if (method == 'PUT') {
        request = this.put(urlPath, JSON.stringify(jsonData), additionalHeader)
      }
      else if (method == 'PATCH') {
        request = this.http.patch<any>(this.getUrl(urlPath), JSON.stringify(jsonData), this.getHttpOptions(additionalHeader));
      }
      else if (method == 'GET') {
        request = this.get(urlPath, additionalHeader);
      }
      else if (method == 'DELETE') {
        request = this.del(urlPath, additionalHeader);
      }
      if (request) {
        let data = {};
        request.subscribe(result => {
          data['result'] = result;
          data['error'] = null;
          res(data);
        }, error => {
          data['result'] = null;
          data['error'] = error;
          res(data);
          if (isToastMsg) {
            this.errorHandler(error);
          }
        });
      }
    });
  }

  /**
   * make the toast message for any thing happens on the API request
   * @param error 
   */
   errorHandler(error) {
    if (error.error) {
      if (error.error.validationErrors) {
        if (typeof error.error.validationErrors == 'string') {
          this.toastService.add(error.error.validationErrors, 'danger');
        }
        else if (typeof error.error.validationErrors == 'object') {
          this.errorHandlerObject(error.error.validationErrors);
        }
        else {
          this.errorHandlerArray(error.error.validationErrors);
        }
      }
      else if (error.error.error_message) {
        this.toastService.add(error.error.error_message, 'danger');
      }
    } else {
      this.toastService.add(error.message, 'danger');
    }
  }

  errorHandlerObject(ve: any) {
    const keys = Object.keys(ve);
    if (keys.length) {
      keys.forEach(key => {
        this.toastService.add(ve[key], 'danger');
      });
    }
  }

  errorHandlerArray(ve: any) {
    ve.forEach(e => {
      this.toastService.add(e, 'danger');
    });
  }

  onBack() {
    this.location.back();
  }
  
}
