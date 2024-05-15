import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //Method to fetch Profiles
  getProfiles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GetProfiles`);
  }

  //Method to add Profiles
  addProfile(profileData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}AddProfile`, profileData);
  }

  //Method to fetch a profile by its Id
  getProfileById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}GetProfileById?Id={id}`);
  }
}
