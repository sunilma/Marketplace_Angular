import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  displayForm = false;
  old_password: String;
  password: String;
  re_password: String;

  constructor(private authService: AuthenticationService,
  private validateService: ValidateService,
  private flashMessage: FlashMessagesService,
  private router: Router) { }

  ngOnInit() {
    this.authService.getProfile()
    .subscribe(profile => { 
      this.user = profile.user;
    });
  }

  changePassword(){
    const userDetail = {
      id: this.user.id,
      old_password: this.old_password,
      password: this.password
    }
    //compare password
    if(!this.validateService.comparePassword(this.password, this.re_password)){
      this.flashMessage.show('Passwords do not match', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.changePassword(userDetail).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000});
        this.displayForm = false;
        this.old_password = "";
        this.password = "";
        this.re_password = "";
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000});
        this.displayForm = true;
      }
      
    });
  }

}
