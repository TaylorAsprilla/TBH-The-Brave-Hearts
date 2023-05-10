import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const imageProfile = environment.imageProfile;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updateImage(
    file: File,
    type: 'agents' | 'customers',
    id: string
  ): Promise<boolean> {
    try {
      const url = `${imageProfile}/${type}/${id}`;
      const formData = new FormData();

      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      console.log(resp);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
