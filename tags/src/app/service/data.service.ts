import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private tags : string[];
  tagsSubject : Subject<string[]>;

  constructor() { 
    this.tags = ['tag1', 'tag2'];
    this.tagsSubject = new Subject<string[]>();
  }

  emitTags(): void{
    this.tagsSubject.next(this.tags.slice());
  }

  updateMasterTag(value : string): void{
    this.tags[0] = value;
    this.emitTags();
  }

}
