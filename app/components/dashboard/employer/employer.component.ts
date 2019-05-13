import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JobsService } from '../../../services/jobs.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css'],
  inputs: ['employer_id']
})
export class EmployerComponent implements OnInit {
  jobs: any[];
  employer_id: String;
  selectedIndex: number;
  showDescription = false;

  constructor(private router: Router,
  private jobsService: JobsService) { }

  ngOnInit() {
    this.jobsService.getJobByEmployerId(this.employer_id)
      .subscribe(jobs => {
        this.jobs = jobs;
      });
  }

  onDeleteClick(id){
    this.jobsService.deleteJob(id).subscribe(data => {
      if(data.success){
        this.jobs = this.jobs.filter(job =>  job._id != id );
        console.log(this.jobs);
      }
    });
  }

  clickIndex(i){
    this.selectedIndex = i;
    this.showDescription = !this.showDescription;
  }

}
