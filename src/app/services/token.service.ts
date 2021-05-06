import { Injectable } from '@angular/core';
import { MainService } from './main.service'
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    public mainApi : MainService,
    public toastService : ToastService,
    public localStorage: StorageService,
  ) { }

  getToken(){
    this.toastService.add('wow','Success');
    if(!this.localStorage.localGet('token')){
      this.needTokenExchange(this.mainApi.device_token);
    }

  }

  needTokenExchange(token = null){
    let url = "/api/token/get";
    this.mainApi.makeRequest(url, '', 'GET').then(data => {
      if (data) {
        let e: any = data;
        console.log(e);
        if (!e.error && e.result) {
          if (e.result.error == 0) {
            let data = e.result.data;
            this.localStorage.localSet('token',data.token);
            this.mainApi.token = data.token;
          } else {
            this.toastService.add(e.result.message,'Warning');
          }
        } else {
          console.log("Error: ", e.message);
        }
        
      }
    });
  }

}
