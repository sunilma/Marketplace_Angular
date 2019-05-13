import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../../services/validate.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  email: String;

  constructor(private validateService: ValidateService,
  private authService: AuthenticationService,
    private flashMessage: FlashMessagesService ) { }

  ngOnInit() {
  }

  onResetSubmit(){
    //validation email
    if(!this.validateService.validateEmail(this.email)){
      this.flashMessage.show('Please enter a valid email', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.resetEmail(this.email).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 10000});
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }
}
