import { Photo } from "./photo";

export class Picture implements Photo{
  albumId: number;
  id: number;
  title:string;
  url:string;
  thumbnailUrl : string;

  constructor(_albumId: number, _id:number, _title:string, _url:string, _thumbnailUrl:string){
    this.albumId = _albumId;
    this.id = _id;
    this.title = _title;
    this.url = _url;
    this.thumbnailUrl = _thumbnailUrl;

  }
}
