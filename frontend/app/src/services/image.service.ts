import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RecipeImage} from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images = new EventEmitter<RecipeImage[]>();

  constructor(private http: HttpClient) { }

  uploadImageToRecipe(id: number, image: File): Observable<any> {
    const title = `upload_recipe_id_${id}`;
    const imageData = new FormData();
    imageData.append('document', image);
    imageData.append('title', title);
    imageData.append('recipe', String(id));
    return this.http.post(`/backend/api/recipe/upload/`, imageData);
  }

  getImagesForRecipe(id: number): Observable<any> {
    return this.http.get(`backend/api/recipe/images/?recipe=${id}`);
  }

  deleteImageById(id: number): Observable<any> {
    return this.http.delete(`backend/api/recipe/upload/${id}/`);
  }
}
