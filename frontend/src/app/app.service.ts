import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
const endpoint = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public currentUser: any;

  constructor(private http: HttpClient) { }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  getUsers(): Observable<any> {//get users
    return this.http.get(endpoint + 'users').pipe(
      map(this.extractData));
  }
  getUser(id): Observable<any> { //get users by id
    return this.http.get(endpoint + 'users/' + id).pipe(
      map(this.extractData));
  }
  
  addUser (user): Observable<any> { //add users
    console.log(user);
    return this.http.post<any>(endpoint + 'users', JSON.stringify(user), httpOptions).pipe(
      tap((user) => console.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<any>('addUser'))
    );
  }
  updateUser (id, user): Observable<any> { //update users by id
    return this.http.put(endpoint + 'users/' + id, JSON.stringify(user), httpOptions).pipe(
      tap(_ => console.log(`updated user id=${id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }
  deleteUser(id): Observable<any> { //delete users
    return this.http.delete<any>(endpoint + 'users/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  deleteFavorite(id): Observable<any> { //delete favorities
    return this.http.delete<any>(endpoint + 'favorites/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted favorite id=${id}`)),
      catchError(this.handleError<any>('deleteFavorite'))
    );
  }
  login(userEmailID, password): Observable<any>{ //login
    let options = httpOptions;
    options['params'] = {
      userEmailID,password }
    return this.http.get(endpoint + 'login', options).pipe(
      tap(_ => console.log(`logging in user w/ User Name=${userEmailID}`)),
      catchError(this.handleError<any>('login'))      
    );
  }

  getHouses(): Observable<any> { //get house
    return this.http.get(endpoint + 'houses').pipe(
      map(this.extractData));
  }
  getHouse(id): Observable<any> { //get house by id
    return this.http.get(endpoint + 'houses/' + id).pipe(
      map(this.extractData));
  }
  addHouse (house): Observable<any> { //add house
    console.log(house);
    return this.http.post<any>(endpoint + 'houses', JSON.stringify(house), httpOptions).pipe(
      tap((house) => console.log(`added house w/ id=${house.id}`)),
      catchError(this.handleError<any>('addHouse'))
    );
  }
  updateHouse (id, house): Observable<any> { //update house
    return this.http.put(endpoint + 'houses/' + id, JSON.stringify(house), httpOptions).pipe(
      tap(_ => console.log(`updated house id=${id}`)),
      catchError(this.handleError<any>('updateHouse'))
    );
  }
  deleteHouse(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'houses/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted house id=${id}`)),
      catchError(this.handleError<any>('deleteHouse'))
    );
  }
  addFavorite (favorite): Observable<any> {
    //console.log(favoriteid);
    return this.http.post<any>(endpoint + 'favorites', JSON.stringify(favorite), httpOptions).pipe(
      tap((favorite) => console.log(`added favorite w/ id=${favorite.id}`)),
      catchError(this.handleError<any>('addFavorite'))
    );
  }
  updateFavorite (id,favorite): Observable<any> {
    //console.log(favoriteid);
    return this.http.put(endpoint + 'favorites/' + id, JSON.stringify(favorite), httpOptions).pipe(
      tap(_ => console.log(`updated favorite id=${id}`)),
      catchError(this.handleError<any>('updateFavorite'))
    );
  }
  getFavorites(): Observable<any> {
    return this.http.get(endpoint + 'favorites').pipe(
      map(this.extractData));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   console.error(error); 
   console.log(`${operation} failed: ${error.message}`);
     return of(result as T);
    };
  }
}
