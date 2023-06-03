import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from 'src/app/core/type/type';
import { environment } from 'src/environments/environment';

const imageProfile = environment.imageProfile;
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) {}

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

  async updateImage(file: File, type: UserType, id: string) {
    try {
      const url = `${base_url}/uploads/${type}/${id}`;
      const formData = new FormData();

      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await resp.json();

      if (data.ok) {
        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  uploadDocuments(
    policyId: any,
    idPhoto: File,
    document1: File,
    document2: File
  ) {
    const formData = new FormData();
    formData.append('idPhoto', idPhoto);
    formData.append('document1', document1);
    formData.append('document2', document2);

    return this.httpClient.post(
      `${base_url}/uploads/documents/${policyId}`,
      formData,
      this.headers
    );
  }
}
