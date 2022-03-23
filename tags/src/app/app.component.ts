import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './service/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  //Réference locale utiliser pour récupérer le largeur de la division
  @ViewChild('result') resultHtmlElement:any;

  title = 'tags';

  //titrePripale gérer et mis à jour à l'aide ngModel
  mainTitle : string;

  //liste des tags
  tags : any[];
  tagsSubscription : Subscription;

  //FormGroup pour gérer le masterTag input value et le newTag input value
  dataForm !: FormGroup;

  //varible pour calculer et afficher le nombre de tag non afficher
  nbrRemindElementsToDisplay : number;

  constructor(private dataService: DataService, private formBuilder : FormBuilder){
    this.mainTitle = '';
    this.tags = [];
    this.tagsSubscription = new Subscription();
    this.nbrRemindElementsToDisplay = 0;
  }

  
  ngOnInit(): void {
    this.mainTitle = 'Some Tags : ';
    
    this.tagsSubscription = this.dataService.tagsSubject.subscribe(data => {
      this.tags = data;
    });
    this.dataService.emitTags();

    this.initDataForm();
  }

  ngOnDestroy(): void {
    this.tagsSubscription.unsubscribe();
  }

  initDataForm(): void{
    this.dataForm = this.formBuilder.group(
      {
        masterTag : this.tags[0].value,
        newTag : ''
      }
    )
  }

  updateMasterTag(){
    this.dataService.updateMasterTag(this.dataForm.value["masterTag"]);
  }

  addTag(){
    if(this.dataForm.value["newTag"] != ''){
      this.dataService.newTag(this.dataForm.value["newTag"]);
      this.checkNbrRemindElementsTodisplay();
    }
  }

  deleteLastTag(){
    this.dataService.deleteLastTag();
  }

  trackByMethod(index:number, tag:any): number {
    return tag.id;
  }


  //Méthode pour détecter le overflow et calculer le nombre de tag non afficher
  checkNbrRemindElementsTodisplay(): void{
    console.log(this.resultHtmlElement.nativeElement.scrollWidth)
    if(this.resultHtmlElement.nativeElement.offsetWidth<this.resultHtmlElement.nativeElement.scrollWidth){
      this.nbrRemindElementsToDisplay++;
    }
  }
  
}
