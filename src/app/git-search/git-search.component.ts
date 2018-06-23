import { Component, OnInit } from '@angular/core';
import { GitSearch } from '../git-search'; //interface
import { GitSearchService } from '../git-search.service'; //GitSearchService
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {
  
  searchResults : GitSearch;
  searchQuery : string;
  title: string;
  displayQuery: string;
  //Injecting out Service to this Components Constructor Function
  constructor(private GitSearchService : GitSearchService, private route: ActivatedRoute, private router: Router  ) { 
    
  }

  ngOnInit() {

    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      return this.gitSearch();        
    })

      //Activated for Route Service observable for Gaining Current Route information..
      this.route.data.subscribe( (result) => {
        this.title = result.title
      });      
  }

  //Method to search with our Query string
  gitSearch = () => {
      this.GitSearchService.gitSearch(this.searchQuery).then((response) => {
        this.searchResults = response;
      }, (error) => {
        alert("Error: " + error.statusText)
      })
  }

  sendQuery = () => {
    this.searchResults = null;
    this.router.navigate(['/search/' + this.searchQuery]);
  }  

}
