import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Model {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ModelService {
  private apiUrl = 'https://getgenerations-66bmuhllna-uc.a.run.app'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.apiUrl);
  }

}
