import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public sanitizer: DomSanitizer
  ) { }
  
  /**
   * site loader gif is visible
   */
   loader: boolean = false;

   /**
   * sample entry of toast
   * {'msg': 'test', 'type': 'success'}
   */
  list: any = [];
  
  /**
   * add a new toast
   * @param message str the message to be added
   */
   add(message: any, type: any = 'success', timeout: number = 3000) {
    let m = {
      msg: message,
      type: type
    };
    m.msg = this.sanitizer.bypassSecurityTrustHtml(m.msg);

    this.list.push(m);

    setTimeout(f => {
      this.clear(0)
    }, timeout);
  }

  /**
   * remove specific toast in array
   * @param key number the key of the toast in array
   */
   clear(key) {
    this.list.splice(key, 1);
  }

  /**
   * clear all toast
   */
   clearAll() {
    this.list = [];
  }

  setLoader(show: boolean = true) {
    this.loader = show;
  }
}
