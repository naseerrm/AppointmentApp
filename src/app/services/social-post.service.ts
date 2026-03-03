import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocialPostRequest } from '../model/social-post-request';
import { SocialPostResponse } from '../model/social-post-response';

@Injectable({
  providedIn: 'root'
})
export class SocialPostService {
  private readonly apiUrl = '/api/social-posts/generate';

  constructor(private readonly http: HttpClient) {}

  generatePost(request: SocialPostRequest): Observable<SocialPostResponse> {
    return this.http.post<SocialPostResponse>(this.apiUrl, request);
  }
}
