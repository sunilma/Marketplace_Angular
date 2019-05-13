import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: any;
  password: String;
  re_password: String;

  constructor( private authService: AuthenticationService, 
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.authService.reset(this.route.snapshot.params['token'])
      .subscribe(token => { 
        this.token = token
        if(!token.success){
          this.flashMessage.show(token.msg, { cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['reset']);
        }
       });
  }

  onResetSubmit(){

    //comparing passwords
    if(!this.validateService.comparePassword(this.password, this.re_password)){
      this.flashMessage.show('Passwords do not match', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    const user = {
      id: this.token.user_id,
      password: this.password,
    }

    // changing password
    this.authService.resetPassword(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, { cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000});
      }
    })
  }

}
