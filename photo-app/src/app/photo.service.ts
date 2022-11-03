import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiBaseUrl: string = 'http://localhost:3300';

  constructor(private http: HttpClient) { }

  getPhotos(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/photos`);
  }

  addImage(post: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/upload`, post);
  }

  deletePhoto(id: any): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/photo/${id}`);
  }
}
