import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private tags : any[];
  tagsSubject : Subject<any[]>;

  constructor() { 
    this.tags = [
      {
        id : 0,
        value : 'tag1'
      },
      {
        id : 1,
        value : 'tag2'
      }
    ];
    this.tagsSubject = new Subject<any[]>();
  }

  emitTags(): void{
    this.tagsSubject.next(this.tags.slice());
  }

  updateMasterTag(newValue : string): void{
    this.tags[0].value = newValue;
    this.emitTags();
  }

  newTag(newTagValue : string): void{
    this.tags.push({id : this.tags.length, value : newTagValue});
    this.emitTags();
  }

  deleteLastTag(): void{
    this.tags.pop();
    this.emitTags();
  }

}
