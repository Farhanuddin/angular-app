import { Component, OnInit } from '@angular/core';
import { GitSearchService } from './git-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private GitSearchService: GitSearchService) {

  }

  ngOnInit() {

  }
  
  title = 'Farhan is going to be Rich';
}
