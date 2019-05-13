import { Component, OnInit } from '@angular/core';

import { JobsService } from '../../../services/jobs.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
    jobs: any[];

  constructor(private jobsService: JobsService) { }

  ngOnInit() {
    this.jobsService.getAll()
    .subscribe(jobs => {
      this.jobs = jobs;
    });
  }

}
