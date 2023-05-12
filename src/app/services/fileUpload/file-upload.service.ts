import { Injectable } from '@angular/core';
import { UserType } from 'src/app/core/type/type';
import { environment } from 'src/environments/environment';

const imageProfile = environment.imageProfile;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updateImage(file: File, type: UserType, id: string) {
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
}
