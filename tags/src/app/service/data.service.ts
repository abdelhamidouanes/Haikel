import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  //Les tags sont des propriété privée au service et toute modification est gérer par la relation Subject/subscription
  private tags : any[];
  tagsSubject : Subject<any[]>;

  constructor() { 

    //Les tags ont des id pour prendre en considération la performance lors de l'ajout ou supprission d'un élément à l'aide de trakedby de la directive ngfor
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

  //methode permettant d'envoyer les nouvelles valeurs, elle appelé aprés chaque modfication
  emitTags(): void{
    this.tagsSubject.next(this.tags.slice());
  }

  //methode permettant la mise à jour de la masterTag
  updateMasterTag(newValue : string): void{
    this.tags[0].value = newValue;
    this.emitTags();
  }

  //methode pour créer une nouvelle tag
  newTag(newTagValue : string): void{
    this.tags.push({id : this.tags.length, value : newTagValue});
    this.emitTags();
  }

  //methode pour supprimer le dernier tag
  deleteLastTag(): void{
    this.tags.pop();
    this.emitTags();
  }

}
