import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  uploadDocument(document: FormData) {
    return this.httpClient.post(`${base_url}/document/upload`, document);
  }

  updateDocument(id: string, document: FormData): Observable<any> {
    return this.httpClient.put(`${base_url}/update/${id}`, document);
  }

  disableDocument(id: string): Observable<any> {
    return this.httpClient.patch(
      `${base_url}/document/documents/${id}/disable`,
      document
    );
  }

  getDocuments(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${base_url}/document/documents`);
  }
}
