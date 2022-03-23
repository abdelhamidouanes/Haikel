import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './service/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tags';

  mainTitle : string;

  tags : string[];
  tagsSubscription : Subscription;

  dataForm !: FormGroup;

  constructor(private dataService: DataService, private formBuilder : FormBuilder){
    this.mainTitle = '';
    this.tags = [];
    this.tagsSubscription = new Subscription();
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
        masterTag : this.tags[0],
        newTag : ''
      }
    )
  }

  updateMasterTag(){
    this.dataService.updateMasterTag(this.dataForm.value["masterTag"]);
  }

  addTag(){
    this.dataService.newTag(this.dataForm.value["newTag"]);
  }

  deleteLastTag(){
    this.dataService.deleteLastTag();
  }

}
