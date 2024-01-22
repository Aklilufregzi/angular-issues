import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IssuesDataService {
  constructor(private http: HttpClient) {}

  getIssues(page: number, sort?: string, order?: string) {
    return this.http.get(environment.baseUrl, {
      params: {
        q: 'repo:angular/components',
        per_page: '100',
        page: page.toString(),
        sort: sort || 'created',
        order: order || 'desc',
      },
    });
  }
}
