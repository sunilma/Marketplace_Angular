import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { JobsService } from '../../../services/jobs.service';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent implements OnInit {
  job: any;

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.jobsService.getJobById(this.route.snapshot.params['id'])
      .subscribe(job => {
        this.job = job;
      })
  }

}
