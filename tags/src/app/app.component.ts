import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tags';

  mainTitle : string;

  constructor(){
    this.mainTitle = '';
  }
  
  ngOnInit(): void {
    this.mainTitle = 'Some Tags : '
  }


}
