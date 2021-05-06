import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-fortunes',
  templateUrl: './fortunes.component.html',
  styleUrls: ['./fortunes.component.scss']
})
export class FortunesComponent implements OnInit {

  copyFortune = {
    message : null,
    id : null,
    created_at : null,
    updated_at : null
  };
  fortune = {
    message : null,
    id : null,
    created_at : null,
    updated_at : null
  };
  israndfortune = false;
  canUpdateFortune = false;

  constructor(
    public mainApi : MainService,
    public formBuilder: FormBuilder,
  ) { }

  public addFortune: FormGroup
  ngOnInit(): void {
    this.formBuilders();
  }
  formBuilders() {
    this.addFortune = this.formBuilder.group({
      fortune_text: ['',Validators.compose([Validators.required])
      ],
    })
  }

  openFortuneCookie(){
    let url = "/api/fortune/random";
    this.mainApi.makeRequest(url, '', 'GET').then(data => {
      if (data) {
        let e: any = data;
        console.log(e);
        if (!e.error && e.result) {
          if (e.result.error == 0) {
            let data = e.result.data;
            this.fortune = data;
            this.copyFortune = data;
            this.israndfortune = true;
          } else {
            // this.toastService.add(e.result.message,'Warning');
          }
        } else {
          console.log("Error: ", e.message);
        }
        
      }
    });
  }
  turnIntoUpdate(){
    this.israndfortune = false;
    this.addFortune.controls.fortune_text.setValue(this.fortune.message);
    this.fortune = {
      message : null,
      id : null,
      created_at : null,
      updated_at : null
    };
    this.canUpdateFortune = true;
  }
  skipUpdate(){
    this.israndfortune = false;
    this.canUpdateFortune = false;
  }
  cancelUpdate(){
    this.canUpdateFortune = false;
    this.fortune = {
      message : this.copyFortune.message,
      id : this.copyFortune.id,
      created_at : this.copyFortune.created_at,
      updated_at : this.copyFortune.updated_at
    };
  }
  updateFortuneCookie(){
    if(!this.addFortune.valid){
      return;
    }
    
    let url = "/api/fortune/update";
    let jsonData ={
      id : this.copyFortune.id,
      oldMessage : this.copyFortune.message,
      newMessage: this.addFortune.controls.fortune_text.value
    };
    this.mainApi.makeRequest(url, jsonData, 'POST').then(data => {
      if (data) {
        let e: any = data;
        console.log(e);
        if (!e.error && e.result) {
          if (e.result.error == 0) {
            
            this.canUpdateFortune = false;
            this.fortune.message = this.addFortune.controls.fortune_text.value;

            console.log( this.fortune );
          } else {
            
          }
        } else {
          console.log("Error: ", e.message);
        }
        
      }
    });
  }

}
