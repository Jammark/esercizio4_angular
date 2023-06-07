import { Component } from '@angular/core';
import { FotoService } from 'src/app/srv/foto.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/model/photo';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{

  srv : FotoService;
  lista : Photo[];
  count : number;
  likes : number[];
  private sub : Subject<number> = new Subject<number>();

  constructor( srv : FotoService){
    this.srv = srv;
    this.lista = [];
    this.count = 0;
    this.likes = [];
  }

  ngOnInit(): void {
    this.srv.get().subscribe((lista : Photo[]) => {
      console.table(lista);
      this.lista = lista;
    });
    this.sub.subscribe(num =>{
        this.count = num;
    });
  }

  like(item:Photo):void{
    let index = this.likes.indexOf(item.id);
      if(index == -1){
        this.likes.push(item.id);
        this.sub.next(this.count + 1);
      }else{
        this.likes.splice(index, 1);
        this.sub.next(this.count - 1);
      }
  }

  isLike(item:Photo):boolean{
    return this.likes.indexOf(item.id) != -1;
  }

  removePhoto(item:Photo, i:number):void{
    this.srv.delete(item);
    this.lista.splice(i, 1);
    if(this.isLike(item)){
      this.likes.splice(this.likes.indexOf(item.id), 1);
      this.sub.next(this.count - 1);
    }
  }
}
