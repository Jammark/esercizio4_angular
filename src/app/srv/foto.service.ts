import { Injectable } from '@angular/core';
import { Photo } from '../model/photo';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { Picture } from '../model/picture';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  static URL : string = 'https://jsonplaceholder.typicode.com/photos';

  private http: HttpClient;

  constructor(http: HttpClient) {
      this.http = http;
  }

  get():Observable<Photo[]>{
    let data = this.http.get<Photo[]>(FotoService.URL).pipe(map(result => result.map(el =>
      new Picture(el.albumId, el.id, el.title, el.url, el.thumbnailUrl))));


    return data;
  }

  delete(item:Photo):void{
    this.http.delete<void>(FotoService.URL+`/${item.id}`).pipe();
  }
}
