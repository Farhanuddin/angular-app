import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitSearch } from './git-search'  ;
import { GitUsers } from './git-users'  ;
import 'rxjs/add/operator/toPromise';
//import { resolve } from 'path';
//import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})

export class GitSearchService {

  cachedValues: Array<{
    [query: string]: GitSearch
  }> = [];

  cachedValuesUsers: Array<{
    [query: string]: GitUsers
  }> = [];

  constructor(private http: HttpClient) {

   }

  gitSearch = (query: string ): Promise<GitSearch> => {
    let promise = new Promise<GitSearch>((resolve, reject) => {
        if(this.cachedValues[query]){
          resolve(this.cachedValues[query]);
        }else{
          //Make webapi http call using httpClient, converting returned httpClient object to Promise as we are using that in
          //our application, because httpClient by default returns an Observable object
          this.http.get('https://api.github.com/search/repositories?q=' + query)
            .toPromise()
              .then( (response) => {
                 resolve(response as GitSearch)
              }, (error) => {
                reject(error);
              });
        }
    })
    return promise;
  }

 gitUser = (query : string) => {
  let userPromise = new Promise<GitUsers>((resolve, reject) => {

    if(this.cachedValuesUsers[query]){
      resolve(this.cachedValues[query]);
    }else{
      this.http.get('https://api.github.com/search/users?q=' + query)
        .toPromise()
          .then( (response) => {
            resolve(response as GitUsers);
          }, (error) => {
            reject(error);
          } );
    }



  })
  return userPromise;
 }
}
