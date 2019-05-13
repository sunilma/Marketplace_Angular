import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { AuthenticationService } from '../../../services/authentication.service';
import { ValidateService } from '../../../services/validate.service';
import { JobsService } from '../../../services/jobs.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {
  title: String;
  description: String;
  application_link: String;
  deadline: DateModel; //for date input field
  options: DatePickerOptions; //for date input field
  contact: Boolean;

  user: any;
  
  quillEditorOptions = {                      //options for the editor
    placeholder: "insert content here....",
    size: "large"
  };

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private jobsService: JobsService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  onAddSubmit(){
    var job = {
      title: this.title,
      description: this.description,
      application_link: this.application_link,
      deadline: this.deadline.formatted,
      employer_id: this.user.id,
      employer_name: this.user.name,
      employer_email: this.user.email
    }
    if(this.contact){
      job['employer_contact'] = this.user.contact;
    }

    //validation
    if(!this.validateService.validateJob(job)){
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //add job after validation successful
    this.jobsService.addJob(job).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Job added successfully.', { cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Error occured. Please try again.', { cssClass: 'alert-danger', timeout: 3000});
      }
      this.router.navigate(['/dashboard']);
    })    
  }


}
