import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  rememberme: boolean = false;

  constructor(
    public localSt: LocalStorageService,
    public sessionSt: SessionStorageService
  ) { }

  storageSet(key, value) {
    if (this.rememberme) {
      this.localSt.store(key, value);
    } else {
      this.sessionSt.store(key, value);
    }
  }
  
  sessionStorageGet(key){
    var data;
    data = this.sessionSt.retrieve(key);
    return data;
  }
  localSet(key, value) {
    this.localSt.store(key, value);
  }
  localGet(key) {
    var data;
    data = this.localSt.retrieve(key);
    return data;
  }
  storageLocalClearKey(key) {
    this.localSt.clear(key)
  }
  storageGet(key) {
    var data;
    if (this.rememberme) {
      data = this.localSt.retrieve(key);
    } else {
      data = this.sessionSt.retrieve(key);
    }
    return data;
  }

  storageGetTokens(key) {
    var data;
    data = this.localSt.retrieve(key);
    return data;
  }
  
  logoutClear(key) {
    if (this.rememberme) {
      this.localSt.clear(key)
    } else {
      this.sessionSt.clear(key)
    }
  }
  storageClear() {
    if (this.rememberme) {
      this.localSt.clear()
    } else {
      this.sessionSt.clear()
    }
  }
  removeItem(key){
    this.localSt.clear(key);
  }

  /**
   * get data from storage using the given name
   * @param name  
   */
  get(name) {
    return new Promise(resolve => {
      let data: any = this.localSt.retrieve(name);
      if (!data) {
        data = this.sessionSt.retrieve(name);
      }

      if (data) {
        // let r = JSON.parse(data);

        // if(typeof r.data != 'undefined' && typeof r.exp != 'undefined'){
        // 	if(r.exp){
        // 		let d = new Date();
        // 		let t = d.getTime();
        // 		if(t < r.exp){
        // 			r = r.data;
        // 		} else {
        // 			this.removeItem(name);
        // 			r = null;
        // 		}
        // 	} else {
        // 		r = r.data;
        // 	}
        // }
        resolve(data);
      } else {
        resolve(null);
      }
    });
  }
}
