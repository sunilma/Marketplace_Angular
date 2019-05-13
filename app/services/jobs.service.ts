import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JobsService {
  server = "";

  constructor(private http: Http) { }

  getAll(){
    return this.http.get(this.server + '/api/jobs').map(res => res.json());
  }

  getJobById(id){
      return this.http.get(this.server + '/api/job/'+id).map(res => res.json());
  }

  addJob(newJob){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.server + '/api/job', JSON.stringify(newJob), {headers: headers})
            .map(res => res.json());
    }

    deleteJob(id){
        return this.http.delete(this.server + '/api/job/'+id)
            .map(res => res.json());
    }

    getJobByEmployerId(id){
        return this.http.get(this.server + '/api/jobs/' + id)
            .map(res => res.json());
    }

}
